import jonasImg from "../../imports/Jonas_Gissler.png";
import berkantImg from "../../imports/Berkant_agyar.jpeg";

export function TeamBadge() {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      {/* Avatar group */}
      <div className="flex">
        <div
          className="h-[38px] w-[38px] rounded-full overflow-hidden shrink-0"
          style={{ position: "relative", zIndex: 2 }}
        >
          <img
            src={jonasImg}
            alt="Jonas Gissler"
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div
          className="h-[38px] w-[38px] rounded-full overflow-hidden shrink-0"
          style={{ marginLeft: -12, position: "relative", zIndex: 1 }}
        >
          <img
            src={berkantImg}
            alt="Berkant Agyar"
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>

      {/* Names */}
      <span
        className="text-[14px] font-medium tracking-wide leading-none"
        style={{ color: "rgba(255,255,255,0.9)" }}
      >
        Jonas &amp; Berkant
      </span>
    </div>
  );
}
