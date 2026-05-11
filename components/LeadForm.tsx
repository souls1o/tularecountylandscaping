"use client";

import type { ReactNode } from "react";
import { FormEvent, useMemo, useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import {
  ArrowRightIcon,
  CheckIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SparkleIcon
} from "@/components/Icons";
import { cities, services } from "@/data/site";
import {
  digitsOnlyPhone,
  validateEmailShape,
  validateFullName,
  validatePhone10Digits
} from "@/lib/leadValidation";

function FieldShell({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex w-full min-h-[2.875rem] items-stretch gap-0.5 rounded-2xl border border-line bg-panel/60 px-3 transition duration-200 focus-within:border-primary focus-within:bg-panel/90 focus-within:ring-2 focus-within:ring-primary/30">
      <span className="pointer-events-none flex shrink-0 items-center text-leaf [&>svg]:block">{icon}</span>
      <div className="flex min-w-0 flex-1 items-center">{children}</div>
    </div>
  );
}

/** Pretty mask for up to 10 US digits: (555) 123-4567 */
function maskPhone10(rawDigits: string): string {
  const d = rawDigits.slice(0, 10);
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");

  const cityOptions = useMemo(
    () => cities.map((c) => ({ value: c.slug, label: `${c.name}, ${c.state}` })),
    []
  );

  const serviceOptions = useMemo(
    () => [
      ...services.map((s) => ({ value: s.slug, label: s.name })),
      { value: "multiple", label: "Multiple services / not sure" }
    ],
    []
  );

  const disabledFields = submitting || sent;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const nameErr = validateFullName(name);
    if (nameErr) {
      setError(nameErr);
      return;
    }

    const phoneErr = validatePhone10Digits(phone);
    if (phoneErr) {
      setError(phoneErr);
      return;
    }

    const emailErr = validateEmailShape(email);
    if (emailErr) {
      setError(emailErr);
      return;
    }

    if (!city) {
      setError("Select your city or area.");
      return;
    }

    if (!service) {
      setError("Select a service.");
      return;
    }

    const msg = message.trim();
    if (!msg) {
      setError("Tell us a bit about your project.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: digitsOnlyPhone(phone),
          email: email.trim(),
          service,
          city,
          message: msg,
          company
        })
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(typeof data.error === "string" ? data.error : "Something went wrong. Please call or email us.");
        return;
      }
      setSent(true);
    } catch {
      setError("Network error. Check your connection or try calling us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      id="estimate"
      onSubmit={onSubmit}
      className="surface-elevated relative overflow-hidden p-6 md:p-7"
      noValidate
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

      <input
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="sr-only"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <div className="relative mt-5 grid gap-3">
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name (first & last)"
          autoComplete="name"
          disabled={disabledFields}
          className="field-input disabled:opacity-60"
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <FieldShell icon={<PhoneIcon size={16} />}>
            <input
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="(555) 555-5555"
              value={phone}
              disabled={disabledFields}
              onChange={(e) => setPhone(maskPhone10(digitsOnlyPhone(e.target.value)))}
              className="w-full border-0 bg-transparent py-3 text-sm text-bright outline-none placeholder:text-muted/70 disabled:opacity-60"
            />
          </FieldShell>
          <FieldShell icon={<MailIcon size={16} />}>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              disabled={disabledFields}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-0 bg-transparent py-3 text-sm text-bright outline-none placeholder:text-muted/70 disabled:opacity-60"
            />
          </FieldShell>
        </div>

        <FieldShell icon={<MapPinIcon size={16} />}>
          <CustomSelect
            value={city}
            onChange={setCity}
            options={cityOptions}
            placeholder="Select your city / area"
            disabled={disabledFields}
          />
        </FieldShell>

        <FieldShell icon={<SparkleIcon size={16} />}>
          <CustomSelect
            value={service}
            onChange={setService}
            options={serviceOptions}
            placeholder="Select a service"
            disabled={disabledFields}
          />
        </FieldShell>

        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Tell us about your yard..."
          disabled={disabledFields}
          className="field-input resize-none disabled:opacity-60"
        />
      </div>

      {error ? (
        <p className="relative mt-3 rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={disabledFields}
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
