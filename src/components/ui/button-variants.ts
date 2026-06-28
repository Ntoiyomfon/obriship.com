import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-display text-sm font-semibold tracking-tight transition duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-[--freight] px-6 py-3 text-white hover:bg-[#B04508]",
        secondary:
          "border border-[--ink] bg-transparent px-6 py-3 text-[--ink] hover:bg-[--ink] hover:text-white",
        ghost: "px-4 py-2 text-ink hover:bg-ink/5",
        destructive:
          "border border-red-200 bg-transparent px-6 py-3 text-red-700 hover:bg-red-50",
        nav: "px-3 py-2 text-sm font-semibold hover:text-[--freight]",
        link: "rounded-none px-0 py-0 text-[--freight]"
      },
      size: {
        default: "",
        icon: "h-11 w-11 px-0 py-0"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);
