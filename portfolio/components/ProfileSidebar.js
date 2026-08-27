import Image from 'next/image';

export default function ProfileSidebar() {
  return (
    <aside className="lg:sticky lg:top-0 lg:h-screen w-full lg:w-[460px] xl:w-[520px] 2xl:w-[580px] shrink-0 flex flex-col items-center lg:items-start justify-start px-6 lg:pl-10 lg:pr-4 pt-10 lg:pt-16 gap-6">
      <div className="relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[400px] xl:max-w-[460px] 2xl:max-w-[500px]">
        <Image
          src="/profile-card.png"
          alt="Renz Anthony Buhay — Video Editor / Graphic Designer. Working online since the pandemic, over 5 years now, in graphics, video editing, and AI-assisted workflows. Skills: Photoshop, Illustrator, After Effects, Premiere Pro, CapCut."
          width={800}
          height={1398}
          className="w-full h-auto"
          priority
        />
      </div>

      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-paper text-ink px-6 py-3 text-sm font-medium rounded-sm hover:bg-accent hover:text-paper transition-colors"
      >
        View my CV
        <span aria-hidden="true">→</span>
      </a>
    </aside>
  );
}
