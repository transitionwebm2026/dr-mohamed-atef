'use client';

import { useState } from 'react';
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ClinicView {
  id: string;
  name: string;
  address: string;
  hours: string;
  phoneDisplay: string;
  phoneHref: string;
  mapSrc: string;
  mapTitle: string;
  directionsHref: string;
}

interface ClinicLocationsProps {
  clinics: ClinicView[];
  email: string;
  labels: {
    branches: string;
    hours: string;
    phone: string;
    email: string;
    address: string;
    directions: string;
  };
}

/** Branch switcher + lazy-loaded Google Maps embed + direct contact details. */
export function ClinicLocations({ clinics, email, labels }: ClinicLocationsProps) {
  const [activeId, setActiveId] = useState(clinics[0]?.id ?? '');
  const clinic = clinics.find((c) => c.id === activeId) ?? clinics[0];
  if (!clinic) return null;

  return (
    <div className="flex h-full flex-col gap-6">
      <div role="group" aria-label={labels.branches} className="grid grid-cols-2 gap-1 rounded-[1.6rem] bg-white p-1">
        {clinics.map((c) => {
          const selected = c.id === clinic.id;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveId(c.id)}
              className={cn(
                'min-h-11 rounded-[1.35rem] px-3 py-2.5 text-sm leading-snug font-bold transition duration-300',
                selected ? 'bg-ink text-white' : 'text-ink-500 hover:text-ink',
              )}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-white">
        <iframe
          key={clinic.id}
          src={clinic.mapSrc}
          title={clinic.mapTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>

      <dl className="grid divide-y divide-ink/10 border-y border-ink/10">
        <div className="flex gap-4 py-5">
          <dt className="grid size-11 shrink-0 place-items-center rounded-full text-ink ring-1 ring-inset ring-gold">
            <MapPin aria-hidden="true" className="size-5" />
            <span className="sr-only">{labels.address}</span>
          </dt>
          <dd>
            <p className="font-extrabold text-ink">{clinic.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-500">{clinic.address}</p>
            <a
              href={clinic.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-ink underline decoration-gold decoration-2 underline-offset-4 hover:text-gold-ink"
            >
              <Navigation aria-hidden="true" className="size-4" />
              {labels.directions}
            </a>
          </dd>
        </div>
        <div className="flex gap-4 py-5">
          <dt className="grid size-11 shrink-0 place-items-center rounded-full text-ink ring-1 ring-inset ring-gold">
            <Clock aria-hidden="true" className="size-5" />
            <span className="sr-only">{labels.hours}</span>
          </dt>
          <dd className="self-center">
            <p className="text-xs font-bold text-ink-500">{labels.hours}</p>
            <p className="mt-0.5 font-bold text-ink">{clinic.hours}</p>
          </dd>
        </div>
        <div className="flex gap-4 py-5">
          <dt className="grid size-11 shrink-0 place-items-center rounded-full text-ink ring-1 ring-inset ring-gold">
            <Phone aria-hidden="true" className="size-5" />
            <span className="sr-only">{labels.phone}</span>
          </dt>
          <dd className="self-center">
            <p className="text-xs font-bold text-ink-500">{labels.phone}</p>
            <a href={clinic.phoneHref} className="mt-0.5 inline-block font-bold whitespace-nowrap text-ink hover:text-gold-ink" dir="ltr">
              {clinic.phoneDisplay}
            </a>
          </dd>
        </div>
        {email ? (
          <div className="flex gap-4 py-5">
            <dt className="grid size-11 shrink-0 place-items-center rounded-full text-ink ring-1 ring-inset ring-gold">
              <Mail aria-hidden="true" className="size-5" />
              <span className="sr-only">{labels.email}</span>
            </dt>
            <dd className="self-center">
              <p className="text-xs font-bold text-ink-500">{labels.email}</p>
              <a href={`mailto:${email}`} className="mt-0.5 inline-block font-bold text-ink hover:text-gold-ink" dir="ltr">
                {email}
              </a>
            </dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}
