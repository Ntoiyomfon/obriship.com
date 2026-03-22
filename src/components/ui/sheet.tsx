"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = Dialog.Root;
const SheetTrigger = Dialog.Trigger;
const SheetClose = Dialog.Close;
const SheetTitle = Dialog.Title;
const SheetDescription = Dialog.Description;

const sheetContentVariants = cva(
  "fixed top-0 z-50 flex h-full w-full max-w-sm flex-col gap-6 bg-ink p-6 text-white shadow-2xl outline-none",
  {
    variants: {
      side: {
        right: "right-0 border-l border-white/10",
        left: "left-0 border-r border-white/10"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);

function SheetContent({
  side,
  className,
  children,
  ...props
}: Dialog.DialogContentProps & VariantProps<typeof sheetContentVariants>) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
      <Dialog.Content
        className={cn(sheetContentVariants({ side }), className)}
        {...props}
      >
        <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white">
          <X className="h-5 w-5" />
          <span className="sr-only">Close menu</span>
        </Dialog.Close>
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
};
