'use client'

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        "group relative w-32 cursor-pointer overflow-hidden rounded-full border bg-background p-2 text-center font-semibold",
        disabled && "cursor-not-allowed opacity-50 hover:scale-100",
        className,
      )}
      {...props}
    >
      <span className={cn(
        "inline-block translate-x-0 transition-all duration-300",
        !disabled && "group-hover:translate-x-8 group-hover:opacity-0"
      )}>
        {text}
      </span>
      {!disabled && (
        <>
          <div className="absolute top-0 z-10 flex h-full w-full md:translate-x-8 items-center justify-center gap-2 text-black opacity-0 transition-all duration-500 group-hover:-translate-x-5 group-hover:md:-translate-x-8 group-hover:opacity-100">
            <span>{text}</span>
            <ArrowRight className="h-3 w-3 md:h-5 md:w-5" />
          </div>
          <div className="absolute left-[10%] top-[40%] h-2 w-2 scale-[1] rounded-lg bg-transparent transition-all duration-[800ms] ease-in-out group-hover:left-[0%] group-hover:top-[0%] group-hover:h-full group-hover:w-full group-hover:scale-[1.5] group-hover:bg-white"></div>
        </>
      )}
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
