import * as React from "react";
import * as ModalPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Modal({
  ...props
}: React.ComponentProps<typeof ModalPrimitive.Root> & {
  showCloseButton?: boolean;
}) {
  return (
    <ModalPrimitive.Root data-slot="modal" {...props}>
      <ModalContent showCloseButton={props.showCloseButton}>
        <VisuallyHidden>
          <ModalPrimitive.Title />
          <ModalPrimitive.Description />
        </VisuallyHidden>
        {props.children}
      </ModalContent>
    </ModalPrimitive.Root>
  );
}

function ModalPortal({
  ...props
}: React.ComponentProps<typeof ModalPrimitive.Portal>) {
  return <ModalPrimitive.Portal data-slot="modal-portal" {...props} />;
}

function ModalOverlay({
  className,
  ...props
}: React.ComponentProps<typeof ModalPrimitive.Overlay>) {
  return (
    <ModalPrimitive.Overlay
      data-slot="modal-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  );
}

function ModalContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof ModalPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <ModalPortal data-slot="modal-portal">
      <ModalOverlay />
      <ModalPrimitive.Content
        data-slot="modal-content"
        className={cn(
          "bg-background-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <ModalPrimitive.Close
            data-slot="modal-close"
            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </ModalPrimitive.Close>
        )}
      </ModalPrimitive.Content>
    </ModalPortal>
  );
}

export default Modal;
