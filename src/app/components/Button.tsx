import { ArrowUpRight } from "lucide-react";

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="group inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 text-white font-medium transition-all duration-200 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
      style={{
        background: "linear-gradient(135deg, #006999 0%, #4dbef3 100%)",
      }}
    >
      {children}
      <ArrowUpRight size={16} />
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full px-6 py-3 font-medium transition-all duration-200"
      style={{
        background: "rgba(77, 190, 243, 0.07)",
        border: "1px solid rgba(77, 190, 243, 0.2)",
        color: "rgba(200, 235, 255, 0.85)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(77, 190, 243, 0.13)";
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "rgba(77, 190, 243, 0.35)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "rgba(77, 190, 243, 0.07)";
        (e.currentTarget as HTMLButtonElement).style.borderColor =
          "rgba(77, 190, 243, 0.2)";
      }}
    >
      {children}
    </button>
  );
}