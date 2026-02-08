import Link from "next/link";
import { ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-light">
        <ScanLine className="h-10 w-10 text-muted" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-muted mb-6 max-w-md">
        The scan target you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <Button variant="primary">Return to Dashboard</Button>
      </Link>
    </div>
  );
}
