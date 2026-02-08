"use client";

import { Menu, Bell, User } from "lucide-react";
import { Breadcrumbs } from "./breadcrumbs";

interface HeaderProps {
  onMenuClick: () => void;
}

function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-surface-dark px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted hover:text-foreground hover:bg-surface-light lg:hidden transition-colors"
        >
          <Menu size={20} />
        </button>
        <Breadcrumbs />
      </div>
      <div className="flex items-center gap-3">
        <button className="relative rounded-lg p-2 text-muted hover:text-foreground hover:bg-surface-light transition-colors">
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
        </button>
        <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted hover:bg-surface-light transition-colors cursor-pointer">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/20 text-xs font-semibold text-brand-light">
            SV
          </div>
          <span className="hidden sm:inline">Operator</span>
        </div>
      </div>
    </header>
  );
}

export { Header };
