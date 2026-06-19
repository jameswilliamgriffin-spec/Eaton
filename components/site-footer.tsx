import Image from "next/image";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-brand-ink text-white">
      <div className="page-shell py-14 md:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Image
              src="/BRAND/COLOUR_LOGO.svg"
              alt="Eaton Mortgages"
              width={668}
              height={168}
              className="h-auto w-[190px] brightness-0 invert"
            />
            <p className="mt-7 max-w-lg text-lg leading-8 text-white/58">
              Friendly, independent mortgage advice from Kings Heath. Clear conversations, thoughtful guidance and support right through to the keys.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Find your way</p>
            <nav className="mt-5 grid gap-3 text-sm text-white/62">
              <a className="transition hover:text-white" href="#services">What we help with</a>
              <a className="transition hover:text-white" href="#how">How it works</a>
              <a className="transition hover:text-white" href="#stories">Local stories</a>
              <a className="transition hover:text-white" href="#window">Our window displays</a>
              <a className="transition hover:text-white" href="#faq">Common questions</a>
            </nav>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">Say hello</p>
            <div className="mt-5 space-y-4 text-sm text-white/62">
              <a className="flex items-center gap-3 transition hover:text-white" href="mailto:hello@eatonmortgages.co.uk">
                <Mail className="h-4 w-4 text-brand-green" />
                hello@eatonmortgages.co.uk
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-brand-green" />
                Kings Heath, Birmingham
              </p>
              <a className="inline-flex items-center gap-2 font-semibold text-white" href="#book">
                Book a friendly chat <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="grid gap-4 pt-7 text-xs leading-6 text-white/36 md:grid-cols-[1fr_auto]">
          <p>© {new Date().getFullYear()} Eaton Mortgages. All rights reserved.</p>
          <p className="max-w-2xl md:text-right">
            Your home may be repossessed if you do not keep up repayments on your mortgage.
          </p>
        </div>
      </div>
    </footer>
  );
}
