import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

/*
 * Enquiry API
 * -----------
 * Saves contact-form submissions to the studio database.
 * The frontend then opens WhatsApp with the same details pre-filled as the
 * delivery channel until an email service (e.g. Resend, SendGrid, Nodemailer)
 * is connected later. To add email delivery, extend the try block below.
 */

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  business: z.string().trim().max(160).optional().or(z.literal("")),
  service: z.string().trim().min(1, "Please choose a service").max(120),
  message: z
    .string()
    .trim()
    .min(10, "Please describe your project in at least 10 characters")
    .max(4000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid enquiry details." },
        { status: 400 },
      );
    }

    const { name, email, business, service, message } = parsed.data;

    // Persistence is best-effort: the SQLite file exists in the studio
    // sandbox, but on serverless hosting (e.g. Vercel) there is no
    // persistent disk. A failed save must never block the enquiry —
    // the frontend opens WhatsApp with the details pre-filled either way.
    let persisted = false;
    try {
      await db.enquiry.create({
        data: {
          name,
          email,
          business: business ? business : null,
          service,
          message,
        },
      });
      persisted = true;
    } catch (dbError) {
      console.warn(
        "Enquiry could not be persisted (no usable database) — continuing via WhatsApp:",
        dbError instanceof Error ? dbError.message : dbError,
      );
    }

    // Future: send a notification email here once an email service is connected.

    return NextResponse.json({ ok: true, persisted });
  } catch (error) {
    console.error("Enquiry submission failed:", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your enquiry right now." },
      { status: 500 },
    );
  }
}
