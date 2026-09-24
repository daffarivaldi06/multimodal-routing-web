import { cn } from "@/lib/utils";

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

export function Sidebar({ children, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "w-[400px] flex-none flex flex-col",
        "bg-zinc-950 border-r border-zinc-800/60",
        "overflow-y-auto",
        className
      )}
    >
      <div className="flex-1 p-4 space-y-5">{children}</div>
    </aside>
  );
}
