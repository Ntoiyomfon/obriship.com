import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-28 w-full rounded-xl border border-input bg-white px-4 py-3 text-sm text-ink outline-none transition duration-150 placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/25",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";

export { Textarea };

