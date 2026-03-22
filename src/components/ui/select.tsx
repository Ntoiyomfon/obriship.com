import * as React from "react";

import { cn } from "@/lib/utils";

const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-xl border border-input bg-white px-4 py-3 text-sm text-ink outline-none transition duration-150 focus:border-accent focus:ring-2 focus:ring-accent/25",
        className
      )}
      {...props}
    />
  )
);

Select.displayName = "Select";

export { Select };

