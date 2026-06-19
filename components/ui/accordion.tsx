"use client";

import {
  createContext,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

type AccordionItemContextValue = {
  contentId: string;
  open: boolean;
  toggle: () => void;
};

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItem() {
  const context = useContext(AccordionItemContext);
  if (!context) throw new Error("Accordion parts must be used inside AccordionItem.");
  return context;
}

export function Accordion({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("w-full", className)}>{children}</div>;
}

export function AccordionItem({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <AccordionItemContext.Provider value={{ contentId, open, toggle: () => setOpen((current) => !current) }}>
      <div className={cn("accordion-item border-b border-brand-ink/12", open && "is-open", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { contentId, open, toggle } = useAccordionItem();

  return (
    <button
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      onClick={toggle}
      className={cn(
        "accordion-trigger flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-xl font-semibold tracking-tight transition-colors hover:text-brand-pink md:py-7 md:text-2xl",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <span className="accordion-toggle grid h-8 w-8 shrink-0 place-items-center rounded-full border border-brand-ink/14 text-lg font-normal" aria-hidden="true">
        +
      </span>
    </button>
  );
}

export function AccordionContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { contentId, open } = useAccordionItem();

  return (
    <div
      id={contentId}
      role="region"
      aria-hidden={!open}
      className="accordion-content-grid"
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className={cn("accordion-content-inner max-w-2xl pb-7 pr-10 text-base leading-8 text-brand-ink/58", className)}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
