export function MidCTA() {
  return (
    <section className="w-full bg-[linear-gradient(90deg,#0F4F4A_0%,#1A6F69_50%,#2C8A82_100%)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 py-[38px] lg:py-[42px] flex flex-col lg:flex-row items-center justify-between gap-5">
        <p className="italic text-background text-[25px] lg:text-[29px] leading-snug text-center lg:text-left" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
          “You burn budget, lose momentum, and{" "}
          <span className="italic" style={{ fontWeight: 700, fontFamily: '"Times New Roman", Times, serif' }}>
            never find predictive winners.
          </span>
          ”
        </p>
        <a
          href="#apply"
          className="flex-none inline-flex items-center justify-center px-7 py-3 rounded-full border border-background/70 text-background text-[14px] font-medium transition-colors hover:bg-background hover:text-brand-deep"
        >
          Fix This Now
        </a>
      </div>
    </section>
  );
}