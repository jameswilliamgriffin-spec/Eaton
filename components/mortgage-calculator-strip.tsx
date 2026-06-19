"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";
import { BrandIconMotif } from "@/components/brand-motif";

function monthlyRepayment(loan: number, annualRate: number, years: number) {
  const months = Math.max(years * 12, 1);
  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) return loan / months;

  return loan * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

function formatCurrencyInput(value: number) {
  return Number.isFinite(value) ? value.toLocaleString("en-GB") : "";
}

function parseCurrencyInput(value: string) {
  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

export function MortgageCalculatorStrip() {
  const [propertyPrice, setPropertyPrice] = useState(300000);
  const [deposit, setDeposit] = useState(45000);
  const [term, setTerm] = useState(30);
  const [showEstimate, setShowEstimate] = useState(false);

  const loan = Math.max(propertyPrice - deposit, 0);
  const estimate = useMemo(() => monthlyRepayment(loan, 4.75, term), [loan, term]);

  return (
    <section
      id="calculator"
      className="relative isolate z-10 overflow-hidden border-y border-white/15 bg-[linear-gradient(135deg,#8f2a85_0%,#a23a96_55%,#8d2a84_100%)] py-9 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-1px_0_rgba(70,18,65,0.22),0_20px_45px_rgba(75,24,69,0.18)] md:py-11"
    >
      <BrandIconMotif className="-left-8 -top-16 h-44 w-44 bg-white opacity-[0.09]" />
      <BrandIconMotif className="-bottom-20 right-[7%] h-48 w-48 bg-brand-green opacity-[0.13]" />
      <div className="page-shell relative grid gap-7 xl:grid-cols-[0.72fr_1.65fr_auto] xl:items-end">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/65">
            <Calculator className="h-4 w-4 text-brand-green" />
            Quick mortgage calculator
          </div>
          <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.035em] md:text-3xl">
            A useful starting point, in under a minute.
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="calculator-field">
            <span>Property price</span>
            <span className="calculator-input-wrap">
              <b>£</b>
              <input
                type="text"
                inputMode="numeric"
                aria-label="Property price"
                value={formatCurrencyInput(propertyPrice)}
                onChange={(event) => setPropertyPrice(parseCurrencyInput(event.target.value))}
              />
            </span>
          </label>
          <label className="calculator-field">
            <span>Your deposit</span>
            <span className="calculator-input-wrap">
              <b>£</b>
              <input
                type="text"
                inputMode="numeric"
                aria-label="Your deposit"
                value={formatCurrencyInput(deposit)}
                onChange={(event) => setDeposit(parseCurrencyInput(event.target.value))}
              />
            </span>
          </label>
          <label className="calculator-field">
            <span>Mortgage term</span>
            <span className="calculator-input-wrap">
              <input
                type="number"
                min="1"
                max="40"
                value={term}
                onChange={(event) => setTerm(Number(event.target.value))}
              />
              <b>years</b>
            </span>
          </label>
        </div>

        <div className="calculator-field relative xl:min-w-[205px]">
          <span className="invisible hidden xl:block" aria-hidden="true">Calculate</span>
          <button
            type="button"
            onClick={() => setShowEstimate(true)}
            className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-green px-6 text-xl font-bold normal-case tracking-normal text-brand-ink shadow-[0_14px_30px_rgba(56,25,53,0.24)] transition hover:-translate-y-0.5 hover:bg-[#bedc67]"
          >
            Calculate <ArrowRight className="h-5 w-5" />
          </button>
          <p className="mt-2 text-center text-[10px] font-normal normal-case leading-4 tracking-normal text-white/55 xl:absolute xl:left-0 xl:right-0 xl:top-full">
            Illustration based on a 4.75% repayment mortgage.
          </p>
        </div>
      </div>

      {showEstimate ? (
        <div className="page-shell relative mt-5">
          <div className="flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/72">
              Borrowing approximately <strong className="text-white">£{loan.toLocaleString("en-GB")}</strong>
            </p>
            <p className="text-lg font-semibold">
              Estimated monthly payment: <span className="text-brand-green">£{Math.round(estimate).toLocaleString("en-GB")}</span>
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
