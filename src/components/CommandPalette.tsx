import { Command } from "cmdk";
import { BriefcaseBusiness, Boxes, GraduationCap, LayoutGrid, MessageCircle, Rocket, Sparkles, User } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SOCIAL_LINKS } from "@/data/portfolio";

const NAV_ITEMS = [
  { label: "Home", icon: Rocket, hash: "#hero" },
  { label: "Projects", icon: LayoutGrid, hash: "#projects" },
  { label: "About", icon: User, hash: "#about" },
  { label: "Skills", icon: Sparkles, hash: "#skills" },
  { label: "Experience", icon: BriefcaseBusiness, hash: "#experience" },
  { label: "Certifications", icon: GraduationCap, hash: "#certifications" },
  { label: "Services", icon: Boxes, hash: "#services" },
  { label: "Testimonials", icon: Sparkles, hash: "#testimonials" },
  { label: "Contact", icon: MessageCircle, hash: "#contact" },
];

export function CommandPalette({
  open,
  onOpenChange,
  onNavigate,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onNavigate: (hash: string) => void;
}) {
  const run = (hash: string) => {
    onNavigate(hash);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-white/15 bg-[#0b0c12]/92 p-0">
        <Command className="rounded-surface-xl text-white">
          <div className="flex items-center border-b border-white/10 px-3">
            <Command.Input
              placeholder="Search sections, shortcuts, social..."
              className="flex h-12 w-full bg-transparent px-3 text-sm outline-none placeholder:text-white/35"
              aria-label="Command palette filter"
            />
          </div>
          <Command.List className="max-h-[min(60vh,420px)] overflow-y-auto p-2 pb-4">
            <Command.Empty className="px-3 py-10 text-center text-xs text-white/45">
              No results found. Try a different search term.
            </Command.Empty>

            <Command.Group
              heading="Navigate"
              className="[&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-white/35"
            >
              {NAV_ITEMS.map((item) => (
                <Command.Item
                  key={item.hash}
                  value={item.label}
                  onSelect={() => run(item.hash)}
                  className="flex cursor-pointer items-center gap-3 rounded-surface-md px-3 py-3 text-sm text-white/85 aria-selected:bg-white/[0.07] aria-selected:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-35"
                >
                  <item.icon className="h-4 w-4 text-teal-200/85" aria-hidden /> {item.label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="Social links"
              className="[&_[cmdk-group-heading]]:mt-5 [&_[cmdk-group-heading]]:mb-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.3em] [&_[cmdk-group-heading]]:text-white/35"
            >
              {SOCIAL_LINKS.map((link) => (
                <Command.Item
                  key={link.key}
                  value={link.label}
                  onSelect={() => window.open(link.href, "_blank")}
                  className="rounded-surface-md px-3 py-2 text-xs text-white/75 aria-selected:bg-white/[0.07]"
                >
                  {link.label} — new tab
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
          <div className="border-t border-white/10 px-4 py-2 text-[10px] text-white/40">
            Type to search • Press Esc to close
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
