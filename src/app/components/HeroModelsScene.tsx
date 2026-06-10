import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  type MutableRefObject,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type InputTarget = MutableRefObject<{ x: number; y: number }>;

const MODELS = {
  berkant: "/models/berkant3d.glb",
  jonas: "/models/jonas3d.glb",
} as const;

/**
 * Liefert ein normalisiertes Ziel (x/y im Bereich ~[-1, 1]) für die Kopf-Neigung.
 * Desktop -> Maus-Cursor. Mobile/Tablet (pointer: coarse) -> Gyroskop.
 */
function useInputTarget(): InputTarget {
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const clamp = (v: number, min = -1, max = 1) =>
      Math.min(max, Math.max(min, v));

    const coarse =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;

    // --- Desktop: Cursor-Tracking ---
    const onPointer = (e: PointerEvent) => {
      target.current.x = clamp((e.clientX / window.innerWidth) * 2 - 1);
      target.current.y = clamp((e.clientY / window.innerHeight) * 2 - 1);
    };

    if (coarse && typeof window.DeviceOrientationEvent !== "undefined") {
      // Erste Messung = Neutralstellung merken, danach nur die relative
      // Abweichung verwenden – funktioniert unabhängig davon, in welchem
      // Winkel das Gerät gehalten wird.
      let base: { gamma: number; beta: number } | null = null;

      const onOrient: EventListener = (event) => {
        const e = event as DeviceOrientationEvent;
        const gamma = e.gamma; // links/rechts
        const beta = e.beta; //  vor/zurück
        if (gamma === null || beta === null) return;

        if (!base) {
          base = { gamma, beta };
          return;
        }

        target.current.x = clamp((gamma - base.gamma) / 26);
        target.current.y = clamp((beta - base.beta) / 26);
      };

      const bind = () => {
        window.addEventListener("deviceorientation", onOrient, true);
        // Manche Android-Browser feuern nur das "absolute" Event.
        window.addEventListener("deviceorientationabsolute", onOrient, true);
      };
      const unbind = () => {
        window.removeEventListener("deviceorientation", onOrient, true);
        window.removeEventListener("deviceorientationabsolute", onOrient, true);
      };

      const DOE = window.DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<"granted" | "denied">;
      };

      // iOS verlangt eine Permission-Abfrage aus einer User-Geste heraus.
      const requestPermission = DOE.requestPermission;
      if (typeof requestPermission === "function") {
        let requested = false;
        const request = () => {
          if (requested) return;
          requested = true;
          requestPermission()
            .then((res) => {
              if (res === "granted") bind();
              else requested = false;
            })
            .catch(() => {
              requested = false;
            });
        };
        const events: (keyof WindowEventMap)[] = [
          "pointerdown",
          "touchend",
          "click",
        ];
        events.forEach((ev) =>
          window.addEventListener(ev, request, { once: true })
        );
        return () => {
          events.forEach((ev) => window.removeEventListener(ev, request));
          unbind();
        };
      }

      bind();
      return unbind;
    }

    window.addEventListener("pointermove", onPointer);
    return () => window.removeEventListener("pointermove", onPointer);
  }, []);

  return target;
}

interface HeadParams {
  pivot: THREE.Vector3;
  neckStart: number;
  neckEnd: number;
}

interface HeadUniforms {
  uHeadYaw: { value: number };
  uHeadPitch: { value: number };
  uNeckStart: { value: number };
  uNeckEnd: { value: number };
  uPivot: { value: THREE.Vector3 };
}

/**
 * Findet den Hals: die horizontal schmalste Schicht im oberen Bereich der
 * Figur (zwischen Schultern und Kopf). Läuft einmal beim Laden.
 */
function detectHead(geo: THREE.BufferGeometry): HeadParams {
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const n = pos.count;

  let minY = Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < n; i++) {
    const y = pos.getY(i);
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const h = maxY - minY || 1;

  const BANDS = 64;
  const minX = new Array(BANDS).fill(Infinity);
  const maxX = new Array(BANDS).fill(-Infinity);
  const minZ = new Array(BANDS).fill(Infinity);
  const maxZ = new Array(BANDS).fill(-Infinity);
  const cnt = new Array(BANDS).fill(0);

  for (let i = 0; i < n; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    let b = Math.floor(((y - minY) / h) * BANDS);
    if (b < 0) b = 0;
    if (b >= BANDS) b = BANDS - 1;
    cnt[b]++;
    if (x < minX[b]) minX[b] = x;
    if (x > maxX[b]) maxX[b] = x;
    if (z < minZ[b]) minZ[b] = z;
    if (z > maxZ[b]) maxZ[b] = z;
  }

  // Schmalste Schicht im oberen Bereich = Hals.
  const lo = Math.floor(BANDS * 0.55);
  const hi = Math.floor(BANDS * 0.92);
  let neckB = -1;
  let neckW = Infinity;
  for (let b = lo; b < hi; b++) {
    if (cnt[b] < 20) continue;
    const w = Math.max(maxX[b] - minX[b], maxZ[b] - minZ[b]);
    if (w < neckW) {
      neckW = w;
      neckB = b;
    }
  }
  if (neckB < 0) neckB = Math.floor(BANDS * 0.8);
  const neckY = minY + (h * (neckB + 0.5)) / BANDS;

  // Kopf-Mittelachse (x/z) als Drehpunkt.
  let hx = 0;
  let hz = 0;
  let hc = 0;
  for (let i = 0; i < n; i++) {
    if (pos.getY(i) >= neckY) {
      hx += pos.getX(i);
      hz += pos.getZ(i);
      hc++;
    }
  }
  if (hc > 0) {
    hx /= hc;
    hz /= hc;
  }

  const band = h * 0.05;
  return {
    pivot: new THREE.Vector3(hx, neckY - band * 0.4, hz),
    neckStart: neckY - band * 1.4,
    neckEnd: neckY + band * 0.4,
  };
}

/**
 * Hängt eine Kopf-Rotation in den Vertex-Shader des Materials ein: Vertices
 * oberhalb des Halses werden um den Drehpunkt rotiert (weicher Übergang),
 * inkl. Normalen für korrekte Beleuchtung.
 */
function patchHeadBend(material: THREE.Material, head: HeadParams): HeadUniforms {
  const uniforms: HeadUniforms = {
    uHeadYaw: { value: 0 },
    uHeadPitch: { value: 0 },
    uNeckStart: { value: head.neckStart },
    uNeckEnd: { value: head.neckEnd },
    uPivot: { value: head.pivot },
  };

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader =
      `
      uniform float uHeadYaw;
      uniform float uHeadPitch;
      uniform float uNeckStart;
      uniform float uNeckEnd;
      uniform vec3  uPivot;
      mat3 _rotY(float a){ float c=cos(a), s=sin(a); return mat3(c,0.0,-s, 0.0,1.0,0.0, s,0.0,c); }
      mat3 _rotX(float a){ float c=cos(a), s=sin(a); return mat3(1.0,0.0,0.0, 0.0,c,s, 0.0,-s,c); }
      ` + shader.vertexShader;

    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `
      vec3 transformed = vec3( position );
      float _w = smoothstep(uNeckStart, uNeckEnd, transformed.y);
      if (_w > 0.0001) {
        mat3 _rot = _rotY(uHeadYaw * _w) * _rotX(uHeadPitch * _w);
        transformed = _rot * (transformed - uPivot) + uPivot;
      }
      `
    );

    shader.vertexShader = shader.vertexShader.replace(
      "#include <beginnormal_vertex>",
      `
      vec3 objectNormal = vec3( normal );
      float _wn = smoothstep(uNeckStart, uNeckEnd, position.y);
      if (_wn > 0.0001) {
        mat3 _rotn = _rotY(uHeadYaw * _wn) * _rotX(uHeadPitch * _wn);
        objectNormal = _rotn * objectNormal;
      }
      #ifdef USE_TANGENT
        vec3 objectTangent = vec3( tangent.xyz );
      #endif
      `
    );
  };
  material.needsUpdate = true;
  return uniforms;
}

/** Weicher Boden-Schatten/-Glow, damit die Figur auf einer Fläche steht. */
function useGroundTexture(): THREE.CanvasTexture {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(120,175,210,0.30)");
    g.addColorStop(0.4, "rgba(80,130,170,0.12)");
    g.addColorStop(1, "rgba(8,16,22,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(64, 64, 64, 0, Math.PI * 2);
    ctx.fill();
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

interface ModelProps {
  url: string;
  target: InputTarget;
  baseYaw: number;
  onReady?: () => void;
}

function Model({ url, target, baseYaw, onReady }: ModelProps) {
  const { scene } = useGLTF(url);
  const ground = useGroundTexture();

  // Klonen, auf einheitliche Größe normalisieren, Hals erkennen und die
  // Kopf-Rotation in alle Materialien einhängen.
  const { object, uniforms, feetY } = useMemo(() => {
    const clone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = 2.2 / maxDim;
    clone.scale.setScalar(s);
    clone.position.set(-center.x * s, -center.y * s, -center.z * s);

    const collected: HeadUniforms[] = [];
    let head: HeadParams | null = null;

    clone.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      if (!head) head = detectHead(mesh.geometry);

      const mats = Array.isArray(mesh.material)
        ? mesh.material.map((m) => m.clone())
        : mesh.material.clone();
      mesh.material = mats;
      (Array.isArray(mats) ? mats : [mats]).forEach((m) =>
        collected.push(patchHeadBend(m, head!))
      );
    });

    return {
      object: clone,
      uniforms: collected,
      feetY: (box.min.y - center.y) * s,
    };
  }, [scene]);

  const readyFired = useRef(false);

  useFrame((_, delta) => {
    if (!readyFired.current) {
      readyFired.current = true;
      onReady?.();
    }

    const yaw = baseYaw + target.current.x * 0.55;
    const pitch = target.current.y * 0.3;
    for (const u of uniforms) {
      u.uHeadYaw.value = THREE.MathUtils.damp(u.uHeadYaw.value, yaw, 6, delta);
      u.uHeadPitch.value = THREE.MathUtils.damp(
        u.uHeadPitch.value,
        pitch,
        6,
        delta
      );
    }
  });

  return (
    <group>
      <primitive object={object} />
      {/* Boden-Disc unter den Füßen */}
      <mesh rotation-x={-Math.PI / 2} position={[0, feetY + 0.01, 0]}>
        <planeGeometry args={[1.7, 1.7]} />
        <meshBasicMaterial
          map={ground}
          transparent
          depthWrite={false}
          opacity={1}
        />
      </mesh>
    </group>
  );
}

function ModelCanvas({ url, target, baseYaw, onReady }: ModelProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.35, 4.6], fov: 32 }}
      onCreated={({ camera }) => camera.lookAt(0, -0.15, 0)}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />

      <Suspense fallback={null}>
        <Model url={url} target={target} baseYaw={baseYaw} onReady={onReady} />

        {/* In-Memory Environment (kein externer HDR-Download) – markenblaue Reflexe */}
        <Environment resolution={64} frames={1}>
          <Lightformer
            intensity={2}
            position={[0, 2, 4]}
            scale={[6, 6, 1]}
            color="#bfe6ff"
          />
          <Lightformer
            intensity={1.3}
            position={[-4, 0, 2]}
            scale={[4, 6, 1]}
            color="#4dbef3"
          />
          <Lightformer
            intensity={1}
            position={[4, 1, -2]}
            scale={[4, 6, 1]}
            color="#ffffff"
          />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

export default function HeroModelsScene({
  onReady,
}: {
  onReady?: () => void;
}) {
  const target = useInputTarget();

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full">
      <div className="relative aspect-[3/4]">
        <ModelCanvas
          url={MODELS.jonas}
          target={target}
          baseYaw={0.12}
          onReady={onReady}
        />
      </div>
      <div className="relative aspect-[3/4]">
        <ModelCanvas
          url={MODELS.berkant}
          target={target}
          baseYaw={-0.12}
          onReady={onReady}
        />
      </div>
    </div>
  );
}

useGLTF.preload(MODELS.berkant);
useGLTF.preload(MODELS.jonas);
