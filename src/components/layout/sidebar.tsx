"use client";

import { cn } from "@/lib/utils";
import { Home, ScanLine, ClipboardList, Settings, X, Eye } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/scanner", label: "Scanner", icon: ScanLine },
  { href: "/results", label: "Results", icon: ClipboardList },
  { href: "/settings", label: "Settings", icon: Settings },
];

function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface-dark transition-transform duration-200 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyber/20">
            <Eye className="h-5 w-5 text-cyber" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground">SportsVision</h1>
            <p className="text-xs text-muted">AR Detection System</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto rounded-lg p-1 text-muted hover:text-foreground lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-cyber/10 text-cyber"
                    : "text-muted hover:text-foreground hover:bg-surface-light"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <div className="rounded-lg bg-surface p-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-muted">LiDAR Calibrated</span>
            </div>
            <p className="mt-1 text-xs text-muted/60">iPhone 15 Pro Max</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export { Sidebar };
