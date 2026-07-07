const lines = [
  { p: "fd@first-data:~$", c: "render --module all --mode mono" },
  { o: "  parsing glyph streams ........ 8/8" },
  { o: "  box-drawing alignment ........ [OK]" },
  { o: "  contrast ratio ............... 21:1" },
  { p: "fd@first-data:~$", c: "stat" },
  { o: "  modules: 8   glyphs: 12,480   palette: 2" },
  { p: "fd@first-data:~$", c: "" },
];

export default function TerminalBlock() {
  return (
    <section className="border-b border-white/20 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="border border-white/20">
          <div className="flex items-center gap-2 border-b border-white/20 bg-white/[0.03] px-3 py-2">
            <span className="h-2 w-2 rounded-full border border-white/40" />
            <span className="h-2 w-2 rounded-full border border-white/40" />
            <span className="h-2 w-2 rounded-full border border-white/40" />
            <span className="ml-2 text-[10px] uppercase tracking-wider text-white/40">
              /bin/first_data.runtime
            </span>
          </div>
          <div className="ascii p-4 text-xs leading-relaxed">
            {lines.map((l, i) =>
              "p" in l ? (
                <div key={i}>
                  <span className="text-white/40">{l.p}</span>{" "}
                  <span className="text-paper">{l.c}</span>
                  {i === lines.length - 1 && (
                    <span className="ml-1 inline-block w-[0.6ch] animate-blink">
                      ▮
                    </span>
                  )}
                </div>
              ) : (
                <div key={i} className="text-white/55">
                  {l.o}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
