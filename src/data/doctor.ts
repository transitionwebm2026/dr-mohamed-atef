import type { Localized } from '@/i18n/config';
import type { Certification, Stat, TimelineItem } from './types';

/**
 * Doctor profile.
 * Main title follows the doctor's own logo; academic title, affiliation, doctorate and memberships
 * come from his public Vezeeta profile
 * ("استشاري اول و استاذ (م) جراحة الأورام بالمعهد القومي للأورام - جامعة القاهرة").
 * ⚠️ The numeric statistics below are still SAMPLE figures — replace them with real ones.
 */
export const doctor = {
  name: { ar: 'د. محمد عاطف الكردي', en: 'Dr. Mohamed Atef ElKordy' } satisfies Localized,
  shortName: { ar: 'د. محمد عاطف', en: 'Dr. Mohamed Atef' } satisfies Localized,
  /** As written on the doctor's logo: "COLON SURGERY CONSULTANT — استشاري جراحة أمراض القولون والمستقيم والشرج". */
  title: {
    ar: 'استشاري جراحة أمراض القولون والمستقيم والشرج',
    en: 'Colon & Rectal Surgery Consultant',
  } satisfies Localized,
  /** From the Vezeeta profile. */
  academicTitle: {
    ar: 'أستاذ مساعد جراحة الأورام بالمعهد القومي للأورام',
    en: 'Assistant Professor of Surgical Oncology, National Cancer Institute',
  } satisfies Localized,
  affiliation: {
    ar: 'المعهد القومي للأورام – جامعة القاهرة',
    en: 'National Cancer Institute – Cairo University',
  } satisfies Localized,
};

export const homeStats: Stat[] = [
  {
    id: 'patients',
    value: 10000,
    prefix: '+',
    icon: 'patients',
    label: { ar: 'مريض تمت متابعته وعلاجه', en: 'Patients Treated' },
  },
  {
    id: 'surgeries',
    value: 5000,
    prefix: '+',
    icon: 'surgeries',
    label: { ar: 'جراحة ناجحة', en: 'Successful Surgeries' },
  },
  {
    id: 'years',
    value: 15,
    prefix: '+',
    icon: 'years',
    label: { ar: 'عامًا من الخبرة الجراحية', en: 'Years of Experience' },
  },
];

export const aboutStats: Stat[] = [
  ...homeStats,
  {
    id: 'oncology',
    value: 3000,
    prefix: '+',
    icon: 'oncology',
    label: { ar: 'جراحة أورام', en: 'Oncology Surgeries' },
  },
  {
    id: 'satisfaction',
    value: 98,
    suffix: '%',
    icon: 'satisfaction',
    label: { ar: 'نسبة رضا المرضى', en: 'Patient Satisfaction' },
  },
  {
    id: 'conferences',
    value: 40,
    prefix: '+',
    icon: 'conferences',
    label: { ar: 'مؤتمر ومحاضرة علمية', en: 'Conferences & Lectures' },
  },
];

export const timeline: TimelineItem[] = [
  {
    badge: { ar: 'كلية الطب', en: 'MBBCh' },
    icon: 'degree',
    title: { ar: 'بكالوريوس الطب والجراحة', en: 'Bachelor of Medicine & Surgery' },
    place: { ar: 'كلية الطب', en: 'Faculty of Medicine' },
    description: {
      ar: 'بداية المسيرة الطبية والشغف بالتخصصات الجراحية.',
      en: 'The start of a medical career and a passion for surgery.',
    },
  },
  {
    badge: { ar: 'جامعة القاهرة', en: 'Cairo University' },
    icon: 'award',
    title: { ar: 'دكتوراه جراحة الأورام', en: 'Doctorate (MD) in Surgical Oncology' },
    place: { ar: 'جامعة القاهرة', en: 'Cairo University' },
    description: {
      ar: 'تخصص دقيق في الجراحة الأورامية وتحديد مراحل الأورام والتخطيط العلاجي المتكامل.',
      en: 'Sub-specialisation in oncological surgery, tumour staging and integrated treatment planning.',
    },
  },
  {
    badge: { ar: 'المعهد القومي للأورام', en: 'NCI Egypt' },
    icon: 'hospital',
    title: { ar: 'مدرس جراحة الأورام', en: 'Lecturer of Surgical Oncology' },
    place: { ar: 'المعهد القومي للأورام – جامعة القاهرة', en: 'National Cancer Institute – Cairo University' },
    description: {
      ar: 'العمل في أكبر مركز متخصص لعلاج الأورام في مصر، والمشاركة في التدريس والبحث العلمي.',
      en: 'Working at Egypt’s leading specialised cancer centre, contributing to teaching and research.',
    },
  },
  {
    badge: { ar: 'المعهد القومي للأورام', en: 'NCI Egypt' },
    icon: 'fellowship',
    title: { ar: 'أستاذ مساعد جراحة الأورام', en: 'Assistant Professor of Surgical Oncology' },
    place: { ar: 'المعهد القومي للأورام – جامعة القاهرة', en: 'National Cancer Institute – Cairo University' },
    description: {
      ar: 'قيادة فرق جراحية متخصصة في أورام الثدي والجهاز الهضمي والكبد والأورام النسائية.',
      en: 'Leading specialised surgical teams in breast, gastrointestinal, liver and gynaecological oncology.',
    },
  },
  {
    badge: { ar: 'المعادي – القاهرة', en: 'Maadi, Cairo' },
    icon: 'consultant',
    title: { ar: 'استشاري أول جراحة الأورام والجراحة العامة', en: 'Senior Consultant of Surgical Oncology & General Surgery' },
    place: { ar: 'العيادة الخاصة – المعادي', en: 'Private clinic – Maadi' },
    description: {
      ar: 'رعاية متكاملة لمرضى الأورام من التشخيص وحتى المتابعة طويلة المدى.',
      en: 'Complete care for cancer patients, from diagnosis to long-term follow-up.',
    },
  },
];

export const certifications: Certification[] = [
  {
    id: 'md',
    icon: 'degree',
    title: { ar: 'دكتوراه جراحة الأورام', en: 'MD in Surgical Oncology' },
    issuer: { ar: 'جامعة القاهرة', en: 'Cairo University' },
    badge: { ar: 'القاهرة', en: 'Cairo' },
  },
  {
    id: 'nci',
    icon: 'hospital',
    title: { ar: 'أستاذ مساعد جراحة الأورام', en: 'Assistant Professor of Surgical Oncology' },
    issuer: { ar: 'المعهد القومي للأورام – جامعة القاهرة', en: 'National Cancer Institute – Cairo University' },
    badge: { ar: 'القاهرة', en: 'Cairo' },
  },
  {
    id: 'consultant',
    icon: 'consultant',
    title: { ar: 'استشاري أول جراحة الأورام والجراحة العامة', en: 'Senior Consultant, Surgical Oncology & General Surgery' },
    issuer: { ar: 'مصر', en: 'Egypt' },
    badge: { ar: 'مصر', en: 'Egypt' },
  },
  {
    id: 'rcs',
    icon: 'membership',
    title: { ar: 'عضو الكلية الملكية البريطانية للجراحين', en: 'Member of the Royal College of Surgeons' },
    issuer: { ar: 'لندن – المملكة المتحدة', en: 'London, United Kingdom' },
    badge: { ar: 'لندن', en: 'London' },
  },
  {
    id: 'esso',
    icon: 'membership',
    title: { ar: 'عضو الجمعية الأوروبية لجراحة الأورام', en: 'Member of the European Society of Surgical Oncology' },
    issuer: { ar: 'ESSO – بلجيكا', en: 'ESSO – Belgium' },
    badge: { ar: 'بلجيكا', en: 'Belgium' },
  },
  {
    id: 'egyptian-society',
    icon: 'membership',
    title: { ar: 'عضو الجمعية المصرية لجراحة الأورام', en: 'Member of the Egyptian Society of Surgical Oncology' },
    issuer: { ar: 'الجمعية المصرية لجراحة الأورام', en: 'Egyptian Society of Surgical Oncology' },
    badge: { ar: 'مصر', en: 'Egypt' },
  },
];
