export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6 xl:mb-8 2xl:mb-10 min-w-0">
      <span
        className="shrink-0 block h-[2px] w-6 sm:w-8 2xl:w-12 rounded-full"
        style={{
          background: "linear-gradient(to right, #006999, #4dbef3)",
        }}
      />
      <span
        className="min-w-0 text-[11px] sm:text-[12px] 2xl:text-[14px] tracking-[0.16em] sm:tracking-[0.22em] uppercase font-medium leading-snug"
        style={{ color: "#4dbef3" }}
      >
        {children}
      </span>
    </div>
  );
}
