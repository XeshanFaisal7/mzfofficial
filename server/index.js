import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import { buildConsultationEmail } from "./emailTemplate.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(cors({ origin: true }));
app.use(express.json({ limit: "32kb" }));

function requireMailConfig() {
  const required = ["MAIL_HOST", "MAIL_PORT", "MAIL_USERNAME", "MAIL_PASSWORD", "MAIL_FROM_ADDRESS"];
  const missing = required.filter((key) => !process.env[key]?.trim());
  if (missing.length) {
    throw new Error(`Missing mail configuration: ${missing.join(", ")}`);
  }
}

function createTransporter() {
  requireMailConfig();

  const encryption = (process.env.MAIL_ENCRYPTION || "tls").toLowerCase();
  const mailPort = Number(process.env.MAIL_PORT);

  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: mailPort,
    secure: encryption === "ssl",
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    ...(encryption === "tls" ? { requireTLS: true } : {}),
  });
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, company, budget, dream } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !dream?.trim()) {
    return res.status(400).json({ ok: false, error: "Name, email, and project details are required." });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(String(email).trim())) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  try {
    const transporter = createTransporter();
    const fromName = process.env.MAIL_FROM_NAME || process.env.APP_NAME || "Portfolio Contact";
    const fromAddress = process.env.MAIL_FROM_ADDRESS;
    const toAddress = process.env.CONTACT_TO_EMAIL || "zeeshanfaisal69@gmail.com";

    const safeName = String(name).trim();
    const safeEmail = String(email).trim();
    const safeCompany = String(company ?? "").trim() || "Not provided";
    const safeBudget = String(budget ?? "").trim() || "Not provided";
    const safeDream = String(dream).trim();
    const brandName = process.env.APP_NAME || "M.Zeeshan Faisal";
    const { text, html } = buildConsultationEmail({
      name: safeName,
      email: safeEmail,
      company: safeCompany,
      budget: safeBudget,
      dream: safeDream,
      brandName,
    });

    await transporter.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to: toAddress,
      replyTo: safeEmail,
      subject: `Consultation inquiry from ${safeName}`,
      text,
      html,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("[contact]", error);
    return res.status(500).json({ ok: false, error: "Unable to send your message. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Contact API listening on http://localhost:${port}`);
});
