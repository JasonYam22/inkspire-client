import { Loader2 } from "lucide-react";

function Loading({ label }: { label: string }) {
  return (
    <p role="status" className="muted flex items-center gap-2 py-4 text-sm">
      <Loader2 aria-hidden="true" className="size-4 motion-safe:animate-spin" />
      {label}
    </p>
  );
}

export default Loading;
