import React, { useState } from "react";
import axios from "axios";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Loader2, CheckCircle2, ArrowRight, ExternalLink, Phone } from "lucide-react";
import { SITE } from "@/constants/site";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Booking = () => {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    preferred_date: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      await axios.post(`${API}/bookings`, { ...form, language: lang });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.response?.data?.detail || "");
    }
  };

  const reset = () => {
    setForm({ name: "", phone: "", service: "", preferred_date: "", message: "" });
    setStatus("idle");
  };

  const services = t.services.categories.flatMap((c) => c.items.map((i) => i.name));

  return (
    <section
      id="booking"
      data-testid="booking-section"
      className="py-16 sm:py-32 bg-secondary/40"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow={t.booking.eyebrow}
          title={t.booking.title}
          subtitle={t.booking.subtitle}
          testId="booking-header"
        />

        <div className="mt-14 sm:mt-20 max-w-3xl mx-auto">
          <div>
            <Reveal>
              <div className="rounded-3xl bg-card border border-border/70 p-6 sm:p-10">
                {status === "success" ? (
                  <div
                    data-testid="booking-success"
                    className="flex flex-col items-start gap-4 py-6"
                  >
                    <div className="h-14 w-14 rounded-full bg-primary/15 text-primary flex items-center justify-center">
                      <CheckCircle2 className="h-7 w-7" strokeWidth={1.4} />
                    </div>
                    <h3 className="font-display text-3xl sm:text-4xl leading-tight">
                      {t.booking.success.title}
                    </h3>
                    <p className="text-muted-foreground max-w-lg">{t.booking.success.desc}</p>
                    <button
                      data-testid="booking-success-reset"
                      onClick={reset}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-xs tracking-luxury uppercase hover:bg-secondary/70 transition-colors"
                    >
                      {t.booking.success.again}
                    </button>
                  </div>
                ) : (
                  <form
                    data-testid="booking-form"
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  >
                    <div className="sm:col-span-1">
                      <label className="text-[11px] tracking-luxury uppercase text-muted-foreground">
                        {t.booking.name}
                      </label>
                      <input
                        data-testid="booking-input-name"
                        name="name"
                        required
                        value={form.name}
                        onChange={onChange}
                        placeholder={t.booking.placeholders.name}
                        className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-base"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="text-[11px] tracking-luxury uppercase text-muted-foreground">
                        {t.booking.phone}
                      </label>
                      <input
                        data-testid="booking-input-phone"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={onChange}
                        placeholder={t.booking.placeholders.phone}
                        className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-base"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="text-[11px] tracking-luxury uppercase text-muted-foreground">
                        {t.booking.service}
                      </label>
                      <select
                        data-testid="booking-input-service"
                        name="service"
                        required
                        value={form.service}
                        onChange={onChange}
                        className="mt-2 w-full bg-background text-foreground border-b border-border focus:border-primary outline-none py-2 text-base"
                      >
                        <option value="" disabled>
                          {t.booking.placeholders.service}
                        </option>
                        {services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-1">
                      <label className="text-[11px] tracking-luxury uppercase text-muted-foreground">
                        {t.booking.date}
                      </label>
                      <input
                        data-testid="booking-input-date"
                        name="preferred_date"
                        value={form.preferred_date}
                        onChange={onChange}
                        placeholder={t.booking.placeholders.date}
                        className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-base"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[11px] tracking-luxury uppercase text-muted-foreground">
                        {t.booking.message}
                      </label>
                      <textarea
                        data-testid="booking-input-message"
                        name="message"
                        value={form.message}
                        onChange={onChange}
                        placeholder={t.booking.placeholders.message}
                        rows={3}
                        className="mt-2 w-full bg-transparent border-b border-border focus:border-primary outline-none py-2 text-base resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p
                        data-testid="booking-error"
                        className="sm:col-span-2 text-sm text-destructive"
                      >
                        {errorMsg || t.booking.error}
                      </p>
                    )}

                    <div className="sm:col-span-2 mt-2 flex flex-col sm:flex-row gap-3 sm:items-center">
                      <button
                        type="submit"
                        data-testid="booking-submit"
                        disabled={status === "loading"}
                        className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background hover:bg-primary disabled:opacity-60 px-8 py-4 text-xs tracking-luxury uppercase transition-colors whitespace-nowrap"
                      >
                        {status === "loading" ? (
                          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                        ) : (
                          <>
                            {t.booking.submit}
                            <ArrowRight
                              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                              strokeWidth={1.5}
                            />
                          </>
                        )}
                      </button>
                      <a
                        href={`tel:${SITE.phoneTel}`}
                        data-testid="booking-call-link"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 hover:border-foreground/60 px-8 py-4 text-xs tracking-luxury uppercase transition-colors whitespace-nowrap"
                      >
                        <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                        {t.booking.call}
                      </a>
                      <a
                        href={SITE.booksyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="booking-booksy-link"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 hover:border-foreground/60 px-8 py-4 text-xs tracking-luxury uppercase transition-colors whitespace-nowrap"
                      >
                        {t.booking.booksy}
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
