import React, { useState } from "react";
import axios from "axios";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { Loader2, CheckCircle2, ArrowRight, ExternalLink, Phone } from "lucide-react";
import { SITE } from "@/constants/site";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fieldBase =
  "peer w-full rounded-xl bg-foreground/[0.03] border border-border px-4 pt-6 pb-2 text-base text-foreground outline-none ease-premium transition-all duration-300 hover:border-foreground/20 focus:border-primary/60 focus:bg-foreground/[0.05] focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.14)]";

const labelFloat =
  "pointer-events-none absolute left-4 top-4 text-muted-foreground text-base ease-premium transition-all duration-200 " +
  "peer-focus:top-2.5 peer-focus:text-[10px] peer-focus:tracking-luxury peer-focus:uppercase peer-focus:text-primary " +
  "peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:tracking-luxury peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:text-muted-foreground";

const FloatingInput = ({ label, testId, className = "", ...props }) => (
  <div className={`relative ${className}`}>
    <input {...props} placeholder=" " data-testid={testId} className={fieldBase} />
    <label className={labelFloat}>{label}</label>
  </div>
);

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
              <div className="rounded-[1.75rem] card-premium border border-border p-6 sm:p-10 shadow-soft-lg">
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
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
                  >
                    <FloatingInput
                      testId="booking-input-name"
                      name="name"
                      required
                      value={form.name}
                      onChange={onChange}
                      label={t.booking.name}
                    />
                    <FloatingInput
                      testId="booking-input-phone"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={onChange}
                      label={t.booking.phone}
                    />
                    <div className="relative sm:col-span-1">
                      <select
                        data-testid="booking-input-service"
                        name="service"
                        required
                        value={form.service}
                        onChange={onChange}
                        className={`${fieldBase} appearance-none cursor-pointer ${form.service ? "" : "text-muted-foreground"}`}
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23B89567' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
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
                      <label className="pointer-events-none absolute left-4 top-2.5 text-[10px] tracking-luxury uppercase text-muted-foreground">
                        {t.booking.service}
                      </label>
                    </div>
                    <FloatingInput
                      testId="booking-input-date"
                      name="preferred_date"
                      value={form.preferred_date}
                      onChange={onChange}
                      label={t.booking.date}
                    />
                    <div className="relative sm:col-span-2">
                      <textarea
                        data-testid="booking-input-message"
                        name="message"
                        value={form.message}
                        onChange={onChange}
                        placeholder=" "
                        rows={3}
                        className={`${fieldBase} resize-none peer`}
                      />
                      <label className={labelFloat}>{t.booking.message}</label>
                    </div>

                    {status === "error" && (
                      <p
                        data-testid="booking-error"
                        className="sm:col-span-2 text-sm text-destructive"
                      >
                        {errorMsg || t.booking.error}
                      </p>
                    )}

                    <div className="sm:col-span-2 mt-3 flex flex-col sm:flex-row gap-3 sm:items-center">
                      <button
                        type="submit"
                        data-testid="booking-submit"
                        disabled={status === "loading"}
                        className="group inline-flex h-[54px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground disabled:opacity-60 px-8 text-xs tracking-luxury uppercase ease-premium transition-all duration-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 whitespace-nowrap"
                      >
                        {status === "loading" ? (
                          <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                        ) : (
                          <>
                            {t.booking.submit}
                            <ArrowRight
                              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                              strokeWidth={1.5}
                            />
                          </>
                        )}
                      </button>
                      <a
                        href={`tel:${SITE.phoneTel}`}
                        data-testid="booking-call-link"
                        className="inline-flex h-[54px] w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 px-8 text-xs tracking-luxury uppercase ease-premium transition-all duration-300 whitespace-nowrap"
                      >
                        <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                        {t.booking.call}
                      </a>
                      <a
                        href={SITE.booksyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="booking-booksy-link"
                        className="inline-flex h-[54px] w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border hover:border-primary/40 hover:bg-primary/5 px-8 text-xs tracking-luxury uppercase ease-premium transition-all duration-300 whitespace-nowrap"
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
