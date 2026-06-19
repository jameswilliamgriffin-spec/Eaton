import Link from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

const styles = {
  primary: 'bg-brand-pink text-white shadow-[0_12px_30px_rgba(150,46,139,0.2)] hover:-translate-y-0.5 hover:bg-[#84257a] hover:shadow-lift',
  secondary: 'bg-brand-green text-brand-ink shadow-soft hover:-translate-y-0.5 hover:bg-[#bddb66] hover:shadow-lift',
  ghost: 'bg-white/75 text-brand-ink ring-1 ring-black/10 hover:-translate-y-0.5 hover:bg-white',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm md:text-base',
  lg: 'px-6 py-4 text-base md:text-lg',
};

export const Button = forwardRef<HTMLAnchorElement, ButtonProps>(function Button(
  { className, href, variant = 'primary', size = 'md', children, ...props },
  ref,
) {
  const classes = cn(
    'magnetic-button inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink focus-visible:ring-offset-2',
    styles[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link ref={ref} href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a ref={ref} className={classes} {...props}>
      {children}
    </a>
  );
});
