import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  inverse = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
  inverse?: boolean;
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow ? <p className={cn('eyebrow', inverse && 'text-brand-green')}>{eyebrow}</p> : null}
      <h2 className={cn('mt-5 text-balance text-[clamp(2.75rem,5vw,5.25rem)] font-semibold leading-[0.94] tracking-[-0.055em]', inverse ? 'text-white' : 'text-brand-ink')}>{title}</h2>
      {description ? <p className={cn('mt-6 max-w-2xl text-lg leading-8', inverse ? 'text-white/60' : 'text-brand-ink/58')}>{description}</p> : null}
    </div>
  );
}
