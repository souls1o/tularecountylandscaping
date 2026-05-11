import { NextResponse } from "next/server";
import { getCityBySlug, getServiceBySlug } from "@/data/site";
import {
  digitsOnlyPhone,
  validateEmailShape,
  validateFullName,
  validatePhone10Digits
} from "@/lib/leadValidation";

type Body = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  city?: string;
  message?: string;
  company?: string;
};

/** Telegram HTML: escape text nodes and <code> contents. */
function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatUsPhone(digits10: string): string {
  return `(${digits10.slice(0, 3)}) ${digits10.slice(3, 6)}-${digits10.slice(6)}`;
}

function buildTelegramLeadHtml(opts: {
  name: string;
  phoneDigits: string;
  email: string;
  serviceLabel: string;
  locationLabel: string;
  message: string;
}): string {
  const { name, phoneDigits, email, serviceLabel, locationLabel, message } = opts;
  const phoneFmt = formatUsPhone(phoneDigits);
  const safe = escapeTelegramHtml;

  return [
    "🌿 <b>Tulare County Landscaping</b>",
    "<i>New estimate · website form</i>",
    "",
    "👤 <b>Name</b>",
    `<code>${safe(name)}</code>`,
    "",
    "📞 <b>Phone</b>",
    `<code>${safe(phoneFmt)}</code>`,
    "",
    "✉️ <b>Email</b>",
    `<code>${safe(email)}</code>`,
    "",
    "📍 <b>City / area</b>",
    `<code>${safe(locationLabel)}</code>`,
    "",
    "🛠 <b>Service</b>",
    `<code>${safe(serviceLabel)}</code>`,
    "",
    "💬 <b>Project notes</b>",
    `<pre>${safe(message)}</pre>`
  ].join("\n");
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return NextResponse.json({ ok: false, error: "Server not configured for leads." }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phoneRaw = typeof body.phone === "string" ? body.phone.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const serviceSlug = typeof body.service === "string" ? body.service.trim() : "";
  const citySlug = typeof body.city === "string" ? body.city.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const nameErr = validateFullName(name);
  if (nameErr) return NextResponse.json({ ok: false, error: nameErr }, { status: 400 });

  const phoneDigits = digitsOnlyPhone(phoneRaw);
  const phoneErr = validatePhone10Digits(phoneRaw);
  if (phoneErr) return NextResponse.json({ ok: false, error: phoneErr }, { status: 400 });

  const emailErr = validateEmailShape(email);
  if (emailErr) return NextResponse.json({ ok: false, error: emailErr }, { status: 400 });

  if (!serviceSlug || !citySlug || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  const service =
    serviceSlug === "multiple"
      ? { name: "Multiple / not sure" as const }
      : getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);

  if (!city) {
    return NextResponse.json({ ok: false, error: "Invalid location." }, { status: 400 });
  }

  if (serviceSlug !== "multiple" && !service) {
    return NextResponse.json({ ok: false, error: "Invalid service." }, { status: 400 });
  }

  const serviceLabel = serviceSlug === "multiple" ? "Multiple services / not sure" : service!.name;
  const locationLabel = `${city.name}, ${city.state}`;

  const text = buildTelegramLeadHtml({
    name,
    phoneDigits,
    email,
    serviceLabel,
    locationLabel,
    message
  });

  const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  const tgRes = await fetch(tgUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true
    })
  });

  if (!tgRes.ok) {
    const errText = await tgRes.text();
    console.error("Telegram sendMessage failed:", tgRes.status, errText);
    return NextResponse.json({ ok: false, error: "Could not deliver message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
