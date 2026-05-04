import { twMerge } from "tailwind-merge";

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge("rounded-2xl p-6 xl:p-8 2xl:p-10 transition-all duration-300", className)}
      style={{
        background:
          "linear-gradient(135deg, rgba(16,24,27,0.95) 0%, rgba(10,17,22,0.98) 100%)",
        border: "1px solid rgba(77, 190, 243, 0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(77, 190, 243, 0.18)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(77, 190, 243, 0.08)";
      }}
    >
      {children}
    </div>
  );
}
