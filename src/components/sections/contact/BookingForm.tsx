'use client';

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { CircleAlert, CircleCheck, ChevronDown, ShieldCheck } from 'lucide-react';
import type { Dictionary } from '@/dictionaries';
import { cn, formatDate } from '@/lib/utils';
import { WhatsAppIcon } from '@/components/shared/BrandIcons';

type FormLabels = Dictionary['contact']['form'];
type Option = { value: string; label: string };

interface BookingFormProps {
  labels: FormLabels;
  intlLocale: string;
  whatsappNumber: string;
  serviceGroups: { label: string; options: Option[] }[];
  generalOption: Option;
  branches: Option[];
}

type FieldName = 'name' | 'phone' | 'service' | 'branch' | 'date' | 'time';
type Values = Record<FieldName | 'notes', string>;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY: Values = { name: '', phone: '', service: '', branch: '', date: '', time: '', notes: '' };
const ORDER: FieldName[] = ['name', 'phone', 'service', 'branch', 'date', 'time'];

function todayIso(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

/**
 * Consultation booking form → validates, composes a structured message
 * and opens https://wa.me/<number>?text=<message> in a new tab.
 */
export function BookingForm({ labels, intlLocale, whatsappNumber, serviceGroups, generalOption, branches }: BookingFormProps) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const [minDate, setMinDate] = useState<string>('');

  // Client-only values (avoid hydration mismatches): min date + ?service= preselection
  useEffect(() => {
    setMinDate(todayIso());
    const requested = new URLSearchParams(window.location.search).get('service');
    if (requested) {
      // Accepts "proc:<id>", "spec:<id>" or a bare specialty id
      const value = /^(proc|spec):/.test(requested) ? requested : `spec:${requested}`;
      const exists = serviceGroups.some((g) => g.options.some((o) => o.value === value));
      if (exists) setValues((v) => ({ ...v, service: value }));
    }
  }, [serviceGroups]);

  const allServices = [generalOption, ...serviceGroups.flatMap((g) => g.options)];
  const labelFor = (list: Option[], value: string) => list.find((o) => o.value === value)?.label ?? value;

  const validate = (v: Values): Errors => {
    const next: Errors = {};
    if (v.name.trim().length < 3) next.name = labels.errors.name;
    const digits = v.phone.replace(/[\s\-()]/g, '');
    if (!/^\+?\d{8,15}$/.test(digits)) next.phone = labels.errors.phone;
    if (!v.service) next.service = labels.errors.service;
    if (!v.branch) next.branch = labels.errors.branch;
    if (!v.date || (minDate && v.date < minDate)) next.date = labels.errors.date;
    if (!v.time) next.time = labels.errors.time;
    return next;
  };

  const update = (field: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (field !== 'notes' && errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = ORDER.find((f) => found[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const m = labels.message;
    const lines = [
      m.heading,
      '',
      `• ${m.name}: ${values.name.trim()}`,
      `• ${m.phone}: ${values.phone.trim()}`,
      `• ${m.service}: ${labelFor(allServices, values.service)}`,
      `• ${m.branch}: ${labelFor(branches, values.branch)}`,
      `• ${m.date}: ${formatDate(values.date, intlLocale)}`,
      `• ${m.time}: ${values.time}`,
      values.notes.trim() ? `• ${m.notes}: ${values.notes.trim()}` : null,
      '',
      `— ${m.footer}`,
    ].filter((line): line is string => line !== null);

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmittedUrl(url);
  };

  const id = (f: string) => `${uid}-${f}`;
  const hasErrors = Object.values(errors).some(Boolean);

  const fieldClass = (field: FieldName | 'notes') =>
    cn(
      'block w-full rounded-2xl border bg-paper/60 px-4 text-ink transition duration-200 placeholder:text-ink-500 focus:bg-white focus:outline-none focus:ring-4',
      field !== 'notes' && errors[field]
        ? 'border-red-600 focus:border-red-600 focus:ring-red-600/15'
        : 'border-silver focus:border-gold focus:ring-gold/25',
    );

  const describedBy = (field: FieldName) => (errors[field] ? `${id(field)}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {hasErrors ? (
        <p role="alert" className="flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700 sm:col-span-2">
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          {labels.errors.summary}
        </p>
      ) : null}

      <Field id={id('name')} label={labels.fields.name} required={labels.required} error={errors.name}>
        <input
          id={id('name')}
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder={labels.fields.namePlaceholder}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describedBy('name')}
          className={cn(fieldClass('name'), 'h-13')}
        />
      </Field>

      <Field id={id('phone')} label={labels.fields.phone} required={labels.required} error={errors.phone}>
        <input
          id={id('phone')}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          dir="ltr"
          required
          value={values.phone}
          onChange={(e) => update('phone', e.target.value)}
          placeholder={labels.fields.phonePlaceholder}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={describedBy('phone')}
          className={cn(fieldClass('phone'), 'h-13 rtl:text-right')}
        />
      </Field>

      <Field id={id('service')} label={labels.fields.service} required={labels.required} error={errors.service} wide>
        <SelectShell>
          <select
            id={id('service')}
            name="service"
            required
            value={values.service}
            onChange={(e) => update('service', e.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={describedBy('service')}
            className={cn(fieldClass('service'), 'h-13 appearance-none pe-11')}
          >
            <option value="" disabled>
              {labels.fields.servicePlaceholder}
            </option>
            <option value={generalOption.value}>{generalOption.label}</option>
            {serviceGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </SelectShell>
      </Field>

      <Field id={id('branch')} label={labels.fields.branch} required={labels.required} error={errors.branch}>
        <SelectShell>
          <select
            id={id('branch')}
            name="branch"
            required
            value={values.branch}
            onChange={(e) => update('branch', e.target.value)}
            aria-invalid={Boolean(errors.branch)}
            aria-describedby={describedBy('branch')}
            className={cn(fieldClass('branch'), 'h-13 appearance-none pe-11')}
          >
            <option value="" disabled>
              {labels.fields.branchPlaceholder}
            </option>
            {branches.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </SelectShell>
      </Field>

      <Field id={id('date')} label={labels.fields.date} required={labels.required} error={errors.date}>
        <input
          id={id('date')}
          name="date"
          type="date"
          required
          min={minDate || undefined}
          value={values.date}
          onChange={(e) => update('date', e.target.value)}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={describedBy('date')}
          className={cn(fieldClass('date'), 'h-13')}
        />
      </Field>

      <Field id={id('time')} label={labels.fields.time} required={labels.required} error={errors.time} wide>
        <SelectShell>
          <select
            id={id('time')}
            name="time"
            required
            value={values.time}
            onChange={(e) => update('time', e.target.value)}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={describedBy('time')}
            className={cn(fieldClass('time'), 'h-13 appearance-none pe-11')}
          >
            <option value="" disabled>
              {labels.fields.timePlaceholder}
            </option>
            {labels.timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </SelectShell>
      </Field>

      <Field id={id('notes')} label={labels.fields.notes} wide>
        <textarea
          id={id('notes')}
          name="notes"
          rows={4}
          value={values.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder={labels.fields.notesPlaceholder}
          className={cn(fieldClass('notes'), 'resize-y py-3.5 leading-relaxed')}
        />
      </Field>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="btn-shine inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-whatsapp px-8 text-base font-extrabold text-ink shadow-[0_14px_32px_-12px_rgb(37_211_102/0.8)] transition duration-300 hover:-translate-y-0.5 hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold active:scale-[0.99]"
        >
          <WhatsAppIcon className="size-6" />
          {labels.submit}
        </button>
        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-ink-500">
          <ShieldCheck aria-hidden="true" className="size-4 shrink-0 text-gold-600" />
          {labels.privacy}
        </p>
      </div>

      {submittedUrl ? (
        <div role="status" className="flex items-start gap-3 rounded-2xl border border-whatsapp/40 bg-whatsapp/10 p-4 text-sm text-ink sm:col-span-2">
          <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-ink" />
          <p className="leading-relaxed">
            {labels.success}{' '}
            <a href={submittedUrl} target="_blank" rel="noopener noreferrer" className="font-extrabold underline underline-offset-4">
              {labels.successLink}
            </a>
          </p>
        </div>
      ) : null}
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  wide = false,
  children,
}: {
  id: string;
  label: string;
  required?: string;
  error?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={cn('grid gap-2', wide && 'sm:col-span-2')}>
      <label htmlFor={id} className="text-sm font-bold text-ink">
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="ms-1 text-gold-600">
              *
            </span>
            <span className="sr-only"> ({required})</span>
          </>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-red-700">
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute end-4 top-1/2 size-5 -translate-y-1/2 text-ink-500" />
    </div>
  );
}
