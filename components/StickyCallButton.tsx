import { PhoneIcon } from "@/components/Icons";
import { phoneNumber, telHref } from "@/data/site";

export default function StickyCallButton() {
  return (
    <a
      href={telHref}
      className="fixed bottom-4 left-4 right-4 z-30 inline-flex items-center justify-center gap-3 rounded-full bg-leaf-gradient px-6 py-4 text-base font-bold text-ink shadow-glowStrong animate-glow md:hidden"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/30 backdrop-blur">
        <PhoneIcon size={18} />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] opacity-80">
          Call now - free estimate
        </span>
        <span className="text-base">{phoneNumber}</span>
      </span>
    </a>
  );
}
