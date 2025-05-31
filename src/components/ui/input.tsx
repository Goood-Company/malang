import * as React from "react";

import { cn } from "@/lib/utils";

export default function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-text-primary placeholder:text-text-placeholder selection:bg-primary-light selection:text-text-primary bg-background-2 border border-text-placeholder flex h-9 w-full min-w-0 rounded-md px-3 py-1 text-text-primary shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-text-secondary	focus-visible:ring-text-secondary/50 focus-visible:ring-[1px]",
        "aria-invalid:ring-error/20  aria-invalid:border-error",
        className
      )}
      {...props}
    />
  );
}
