import type { JSX, PropsWithChildren } from "react";

import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Tooltip({
  children,
  content,
}: PropsWithChildren<{
  content: string | JSX.Element | (() => JSX.Element);
}>) {
  return (
    <TooltipProvider>
      <TooltipComponent delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>
          {typeof content === "string" ? (
            <p>{content}</p>
          ) : typeof content === "function" ? (
            content()
          ) : (
            content
          )}
        </TooltipContent>
      </TooltipComponent>
    </TooltipProvider>
  );
}
