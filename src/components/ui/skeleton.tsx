import { cn } from "@/lib/utils";

export default function Skeleton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-background-3 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}
