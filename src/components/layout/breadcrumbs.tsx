"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/[-_]/g, " ");
    return { href, label };
  });

  return (
    <nav className="flex items-center gap-1.5 text-sm">
      <Link href="/" className="text-muted hover:text-foreground transition-colors">
        <Home size={14} />
      </Link>
      {crumbs.map((crumb) => (
        <div key={crumb.href} className="flex items-center gap-1.5">
          <ChevronRight size={12} className="text-muted/50" />
          <Link
            href={crumb.href}
            className="text-muted hover:text-foreground transition-colors"
          >
            {crumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}

export { Breadcrumbs };
