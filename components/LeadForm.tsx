"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRightIcon,
  CheckIcon,
  MailIcon,
  PhoneIcon,
  SparkleIcon
} from "@/components/Icons";
import { services } from "@/data/site";

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 600);
  };

  return (
    <form
      id="estimate"
      onSubmit={onSubmit}
      className="surface-elevated relative overflow-hidden p-6 md:p-7"
    >
      <div
        aria-hidden
        className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
      />
      <div className="relative flex items-center justify-between gap-3">
        <p className="eyebrow eyebrow-dot">
          <span>Free Estimate</span>
        </p>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-leaf">
          <SparkleIcon size={12} /> Avg. response 24 hrs
        </span>
      </div>
      <h3 className="relative mt-3 text-2xl font-bold text-bright">
        Get a fast landscaping <span className="text-gradient">quote</span>
      </h3>
      <p className="relative mt-1 text-xs text-muted">
        No spam. Local pricing, scope options, and next steps within one business day.
      </p>

      <div className="relative mt-5 grid gap-3">
        <input required placeholder="Full name" className="field-input" />

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="relative">
            <PhoneIcon
              size={14}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-leaf"
            />
            <input
              required
              type="tel"
              placeholder="Phone"
              className="field-input pl-9"
            />
          </label>
          <label className="relative">
            <MailIcon
              size={14}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-leaf"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="field-input pl-9"
            />
          </label>
        </div>

        <select required defaultValue="" className="field-input appearance-none">
          <option value="" disabled className="bg-canvas">
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug} className="bg-canvas">
              {service.name}
            </option>
          ))}
          <option value="multiple" className="bg-canvas">
            Multiple services / not sure
          </option>
        </select>

        <textarea
          required
          rows={4}
          placeholder="Tell us about your yard..."
          className="field-input resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting || sent}
        className="btn-primary mt-5 w-full justify-center text-base disabled:opacity-70"
      >
        {sent ? (
          <>
            <CheckIcon size={16} /> Estimate request sent
          </>
        ) : submitting ? (
          <>Sending&hellip;</>
        ) : (
          <>
            Request Free Estimate <ArrowRightIcon size={16} />
          </>
        )}
      </button>

      <p className="mt-3 text-[11px] text-muted">
        By submitting you agree to be contacted about your project. We respect your privacy.
      </p>
    </form>
  );
}
