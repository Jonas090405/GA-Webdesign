import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "motion/react";
import { useFrameTrack } from "./use-frame-track";

export const ContainerScroll = ({
  titleComponent,
  children,
  aside,
  slides,
  slideIndex = 0,
  slideDirection = 0,
}: {
  titleComponent: string | React.ReactNode;
  /** Inhalt eines einzelnen Rahmens (ohne Slider). */
  children?: React.ReactNode;
  /** Elemente neben dem Screen (z. B. Slider-Pfeile), vertikal an der Karte ausgerichtet. */
  aside?: React.ReactNode;
  /** Slider: Inhalt je Rahmen. Alle bleiben gerendert, die Schiene fährt sie ein und aus. */
  slides?: React.ReactNode[];
  slideIndex?: number;
  /** 1 = nächster (kommt von rechts), -1 = vorheriger. */
  slideDirection?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Startet minimal später (Karte ein Stück im Viewport), endet wenn sie mittig sitzt
    offset: ["start 80%", "center center"],
  });

  // Rahmen ist bei Progress 1 (Karte mittig) flach
  const rotate = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1.0]);
  const translate = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const track = useFrameTrack(slides?.length ?? 1, slideIndex, slideDirection);

  return (
    <div
      className="h-[40rem] sm:h-[50rem] md:h-[56rem] lg:h-[62rem] flex items-center justify-center relative p-2 md:p-10"
      ref={containerRef}
    >
      <div
        className="py-0 w-full relative"
        style={{ perspective: "1200px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <div className="relative max-w-5xl mx-auto">
          {slides ? (
            <div className="grid">
              {slides.map((slide, i) => (
                <div
                  key={i}
                  ref={track.setRef(i)}
                  className="[grid-area:1/1] w-full will-change-transform"
                  // Eigene Perspektive je Rahmen: Die Schiene verschiebt diese Hülle per Transform,
                  // ohne sie würde das Aufklappen (rotateX der Karte) flach gedrückt
                  style={{ ...track.initialStyle(i), perspective: "1200px" }}
                  aria-hidden={i !== slideIndex}
                >
                  <Card rotate={rotate} translate={translate} scale={scale}>
                    {slide}
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <Card rotate={rotate} translate={translate} scale={scale}>
              {children}
            </Card>
          )}
          {aside}
        </div>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) => {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl mt-4 md:mt-6 mx-auto w-full border-4 border-[#6C6C6C] p-2 md:p-3 bg-[#222222] rounded-[20px] md:rounded-[28px] shadow-2xl"
    >
      <div className="w-full overflow-hidden rounded-[14px] md:rounded-2xl bg-zinc-900">
        {children}
      </div>
    </motion.div>
  );
};
