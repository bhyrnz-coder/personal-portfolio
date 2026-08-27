const SKILLS = [
  { label: 'Ps', name: 'Photoshop', color: 'bg-[#001E36] text-[#31A8FF]' },
  { label: 'Ai', name: 'Illustrator', color: 'bg-[#33000D] text-[#FF9A00]' },
  { label: 'Ae', name: 'After Effects', color: 'bg-[#00005B] text-[#9999FF]' },
  { label: 'Pr', name: 'Premiere Pro', color: 'bg-[#00005B] text-[#9999FF]' },
];

export default function ProfileSidebar() {
  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen w-full lg:w-[340px] shrink-0 flex items-center justify-center px-6 py-12 lg:py-0">
      <div className="relative w-full max-w-xs">
        {/* Paperclip */}
        <svg
          className="absolute -top-3 -right-4 w-12 h-16 text-muted/70 z-20 rotate-[18deg]"
          viewBox="0 0 40 60"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 8 C12 3, 20 3, 20 8 L20 42 C20 48, 12 48, 12 42 L12 16 C12 13, 16 13, 16 16 L16 36"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Notebook page card */}
        <div className="torn-edge bg-paper text-ink shadow-[6px_10px_0_0_rgba(0,0,0,0.5)] -rotate-1">
          <div className="ring-holes" aria-hidden="true" />
          <div className="px-7 pb-8 pt-4">
            {/* Polaroid photo */}
            <div className="bg-white p-2.5 pb-6 shadow-md rotate-2 w-fit mx-auto mb-6">
              <div className="w-40 h-44 bg-gradient-to-br from-neutral-300 to-neutral-400 flex items-center justify-center text-xs text-neutral-600 font-sans text-center px-2">
                Replace with
                <br />
                your photo
              </div>
            </div>

            <h1 className="font-hand text-4xl font-bold leading-none">
              Renz Anthony Buhay
            </h1>
            <p className="font-hand text-lg text-accent mt-1">
              Graphic Designer / Video Editor / Web Designer
            </p>

            <p className="mt-4 text-sm leading-relaxed text-ink/80">
              I have 4 years of experience now in the virtual work world,
              mainly doing graphics, video editing, and on web design/dev as
              well.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/80">
              A truly passionate individual who loves coffee, and crazy
              about improvement as well. I&apos;ll assure you I won&apos;t
              only be offering my skills and experience but my character as
              well :D
            </p>

            <h2 className="font-hand text-2xl font-bold mt-6 mb-3">
              Proficiency
            </h2>
            <div className="flex gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill.name}
                  title={skill.name}
                  className={`w-9 h-9 rounded-md flex items-center justify-center text-[11px] font-bold ${skill.color}`}
                >
                  {skill.label}
                </span>
              ))}
            </div>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 text-sm font-medium rounded-sm hover:bg-accent transition-colors"
            >
              View my CV
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
