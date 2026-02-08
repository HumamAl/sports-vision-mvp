"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScanLine, ArrowRight } from "lucide-react";
import Link from "next/link";

export function QuickStartCard() {
  return (
    <Card className="relative overflow-hidden border-cyber/20 bg-gradient-to-br from-surface via-surface to-cyber/5">
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-cyber/10 animate-glow-pulse">
          <ScanLine className="h-10 w-10 text-cyber" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-foreground">Start New Scan</h3>
        <p className="mb-6 max-w-[240px] text-sm text-muted">
          Launch the AR scanner to detect and analyze sports objects in real-time
        </p>
        <Link href="/scanner" className="w-full">
          <Button variant="accent" size="lg" className="w-full gap-2">
            Open Scanner
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-cyber/5 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-accent/5 blur-xl" />
    </Card>
  );
}
