import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-surface-md border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white shadow-inner shadow-black/15 transition-[border,box-shadow] placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))/0.4] focus-visible:border-teal-400/30",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
