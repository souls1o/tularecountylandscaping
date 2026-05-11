/** Digits only for US phone validation. */
export function digitsOnlyPhone(input: string): string {
  return input.replace(/\D/g, "");
}

export function validateFullName(name: string): string | null {
  const t = name.trim();
  if (!t) return "Enter your full name.";
  if (!/\s/.test(t)) return "Use your full name with a space between first and last.";
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length < 2) return "Include both first and last name.";
  if (parts.some((p) => p.length < 2)) return "Each part of your name should be at least 2 characters.";
  return null;
}

export function validatePhone10Digits(input: string): string | null {
  const d = digitsOnlyPhone(input);
  if (d.length !== 10) return "Enter exactly 10 digits for your phone number.";
  return null;
}

/** Requires @, a dot in the domain, and a TLD suffix of at least 2 chars. */
export function validateEmailShape(raw: string): string | null {
  const email = raw.trim();
  if (!email) return "Enter your email.";
  const at = email.indexOf("@");
  if (at <= 0) return "Email must include @.";
  if (email.indexOf("@", at + 1) !== -1) return "Enter a valid email with a single @.";
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (!local || !domain) return "Enter a valid email.";
  const dot = domain.lastIndexOf(".");
  if (dot <= 0 || dot >= domain.length - 1) return "Email needs a domain with a suffix like .com.";
  const suffix = domain.slice(dot + 1).replace(/\s/g, "");
  if (suffix.length < 2 || !/^[a-zA-Z]+$/.test(suffix)) {
    return "Email suffix must be letters only (at least 2), e.g. .com or .net.";
  }
  return null;
}
