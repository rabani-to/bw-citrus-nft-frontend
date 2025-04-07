"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import Image from "next/image"

import asset_pergamino from "@/assets/pergamino.png"
import { TapeContainer } from "@/components/SectionCartel/internals"
import { MdOutlineClose } from "react-icons/md"

import { cn } from "@/lib/utils"

const DialogPortal = DialogPrimitive.Portal

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed min-h-[28rem] left-[50%] top-[55%] md:top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className
      )}
      {...props}
    >
      <DialogClose asChild>
        <button className="absolute z-3 hover:scale-105 border-2 border-black md:border-transparent text-black bg-lemon-green md:bg-black/20 rounded-full p-1 text-xl top-5 sm:top-1.5 right-2.5 sm:right-4">
          <MdOutlineClose />
        </button>
      </DialogClose>

      <figure className="absolute inset-0 pointer-events-none">
        <Image
          loading="eager"
          placeholder="blur"
          fill
          alt=""
          src={asset_pergamino}
        />
      </figure>

      <div className="relative [&_p]:leading-[1.1] [&_p]:pt-8 z-1 pb-10 pt-16 px-10 text-black font-wbb text-center text-3xl">
        {children}
      </div>
    </DialogPrimitive.Content>
  </DialogPortal>
))

export const DialogHeader = ({ children }: React.PropsWithChildren) => (
  <nav className="flex z-2 justify-center absolute top-0 left-0 w-full">
    <TapeContainer className="font-wbb px-32 text-[2.5rem] sm:text-5xl text-center -mt-12">
      {children}
    </TapeContainer>
  </nav>
)

export const DialogOverflow = ({ children }: React.PropsWithChildren) => (
  <section className="overflow-auto max-h-[60vh] -mx-11 sm:-mx-6 px-6">
    {children}
  </section>
)