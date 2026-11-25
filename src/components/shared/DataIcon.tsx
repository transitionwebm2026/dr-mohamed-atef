import {
  Activity,
  Award,
  BadgeCheck,
  BookOpen,
  BriefcaseMedical,
  CalendarClock,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  HeartPulse,
  Hospital,
  Medal,
  Microscope,
  Ribbon,
  ScanSearch,
  Stethoscope,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { IconKey } from '@/data/types';

const iconMap: Record<IconKey, LucideIcon> = {
  breast: Ribbon,
  colorectal: Activity,
  gastric: Microscope,
  liver: FlaskConical,
  gynecologic: HeartPulse,
  general: Stethoscope,
  oncology: ScanSearch,
  patients: Users,
  surgeries: HeartPulse,
  years: CalendarClock,
  satisfaction: HeartHandshake,
  conferences: BookOpen,
  degree: GraduationCap,
  hospital: Hospital,
  award: Award,
  fellowship: Medal,
  membership: BadgeCheck,
  consultant: BriefcaseMedical,
};

/** Renders the Lucide icon referenced by a data record's `icon` key. */
export function DataIcon({ name, className }: { name: IconKey; className?: string }) {
  const Icon = iconMap[name];
  return <Icon aria-hidden="true" className={className} strokeWidth={1.75} />;
}
