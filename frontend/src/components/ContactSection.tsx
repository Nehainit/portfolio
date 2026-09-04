"use client";

import type { FormEvent } from "react";
import { motion } from "motion/react";
import SectionDivider from "./SectionDivider";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const email = "nehadubey1021@gmail.com";
const bookingUrl = process.env.NEXT_PUBLIC_CAL_URL;

export default function ContactSection() {
  function sendProjectDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name")?.toString().trim() || "There";
    const senderEmail = form.get("email")?.toString().trim() || "";
    const message = form.get("message")?.toString().trim() || "";

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      `Project inquiry from ${name}`,
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${senderEmail}\n\n${message}`,
    )}`;
  }

  return (
    <section id="contact" className="scroll-mt-24 px-6 pb-20 md:px-10">
      <SectionDivider title="Contact me" />

      <motion.div
        className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-2"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.div className="rounded-2xl border border-gray-200 p-7 md:p-10" variants={fadeUp}>
          <div className="flex items-start justify-between gap-5">
            <div>
              <h2 className="text-2xl font-semibold text-gray-950 md:text-3xl">Choose a time</h2>
              <p className="mt-2 text-gray-500">Book directly on the calendar.</p>
            </div>
            <a
              href={bookingUrl || `mailto:${email}?subject=Schedule a conversation`}
              target={bookingUrl ? "_blank" : undefined}
              rel={bookingUrl ? "noopener noreferrer" : undefined}
              className="shrink-0 rounded-full bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
            >
              {bookingUrl ? "Open Cal.com ↗" : "Schedule by email ↗"}
            </a>
          </div>

          <div className="mt-10 rounded-xl bg-gray-50 p-6">
            <p className="text-sm font-semibold text-gray-900">Flexible conversations</p>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Tell me what you are building and I&apos;ll find a time that works.
            </p>
          </div>
        </motion.div>

        <motion.form
          onSubmit={sendProjectDetails}
          className="rounded-2xl border border-gray-200 p-7 md:p-10"
          variants={fadeUp}
        >
          <h2 className="text-2xl font-semibold text-gray-950 md:text-3xl">Send project details</h2>
          <div className="mt-7 space-y-5">
            <label className="block text-sm font-medium text-gray-600">
              Name
              <input
                name="name"
                required
                placeholder="Your name"
                className="mt-2 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              Email
              <input
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="mt-2 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900"
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              Message
              <textarea
                name="message"
                required
                rows={4}
                placeholder="How can I help you?"
                className="mt-2 block w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900"
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black"
            >
              Send message ↗
            </button>
          </div>
        </motion.form>

        <motion.a
          href={`mailto:${email}`}
          className="rounded-2xl border border-gray-200 p-7 transition-all hover:border-gray-300 hover:shadow-md md:p-8"
          variants={fadeUp}
        >
          <p className="text-sm text-gray-500">Email me directly:</p>
          <p className="mt-2 text-xl font-semibold text-gray-950 md:text-2xl">{email}</p>
        </motion.a>

        <motion.a
          href="/socials"
          className="flex items-center justify-between rounded-2xl bg-gray-900 p-7 text-white transition-colors hover:bg-black md:p-8"
          variants={fadeUp}
        >
          <span className="text-xl font-semibold md:text-2xl">Check social profiles</span>
          <span className="text-2xl">→</span>
        </motion.a>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <motion.footer
      className="border-t border-gray-100 py-10 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm text-gray-400">Thanks for visiting! Built with care.</p>
    </motion.footer>
  );
}
