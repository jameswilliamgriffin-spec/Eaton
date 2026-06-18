import { cn } from '@/lib/utils';

export function Accordion({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('w-full', className)}>{children}</div>;
}

export function AccordionItem({ className, ...props }: React.HTMLAttributes<HTMLDetailsElement>) {
  return <details className={cn('group border-b border-brand-ink/12', className)} {...props} />;
}

export function AccordionTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <summary className={cn('cursor-pointer list-none py-6 text-left text-xl font-semibold tracking-tight transition-colors hover:text-brand-pink md:py-7 md:text-2xl', className)} {...props}>
      {children}
    </summary>
  );
}

export function AccordionContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('max-w-2xl pb-7 pr-10 text-base leading-8 text-brand-ink/58', className)} {...props}>
      {children}
    </div>
  );
}
