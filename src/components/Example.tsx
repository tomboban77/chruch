import type { ReactNode } from "react";
import { Info } from "lucide-react";

/**
 * Marks content the church team still needs to confirm. Search the codebase
 * for <Example to find every placeholder before launch.
 */
export function Example({ label = "Example" }: { label?: string }) {
  return (
    <span className="example-chip" title="Placeholder for the church team to confirm">
      {label}
    </span>
  );
}

/** A banner for sections or forms that are mock-ups in this demo. */
export function DemoNotice({ children }: { children: ReactNode }) {
  return (
    <p className="demo-notice">
      <Info aria-hidden /> <span>{children}</span>
    </p>
  );
}
