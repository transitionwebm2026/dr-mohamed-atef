import type { Locale, Localized } from '@/i18n/config';
import type { Department, DepartmentId, FeaturedSurgery, Procedure } from './types';

/**
 * Services in three departments — the same three that file the articles and videos:
 *   1. Colon, rectal & anal surgery (the doctor's logo: "COLON SURGERY CONSULTANT"),
 *      including colorectal cancer surgery
 *   2. General & laparoscopic surgery
 *   3. Surgical oncology — breast, stomach & liver and gynaecological cancers (his Vezeeta profile)
 * Each department holds one or more sub-specialties (`groups`) with their procedures.
 * Stay / recovery values are typical ranges — adjust to the doctor's own protocols.
 */
export const departments: Department[] = [
  {
    id: 'colorectal-surgery',
    icon: 'colorectal',
    image: '/images/services/anorectal-surgery.webp',
    title: { ar: 'جراحة القولون والمستقيم والشرج', en: 'Colon, Rectal & Anal Surgery' },
    short: {
      ar: 'من البواسير والشرخ والناسور بالليزر إلى استئصال أورام القولون والمستقيم بالمنظار مع الحفاظ على العضلة العاصرة.',
      en: 'From laser treatment of haemorrhoids, fissures and fistulas to laparoscopic colorectal cancer surgery that preserves the sphincter.',
    },
    description: {
      ar: 'هو التخصص الأساسي للدكتور محمد عاطف الكردي. يبدأ بمشكلات الشرج الشائعة التي يؤجل كثير من المرضى علاجها حرجًا أو خوفًا من الألم، فنعالجها بالليزر والتقنيات الحديثة التي تحافظ على العضلة العاصرة بعد تشخيص دقيق يستبعد أي أسباب أخرى للأعراض، ويمتد إلى جراحات أورام القولون والمستقيم: استئصال الورم مع الغدد الليمفاوية بالمنظار متى أمكن، بالتنسيق مع العلاج الكيميائي والإشعاعي حسب مرحلة الورم.',
      en: 'Dr. Mohamed Atef ElKordy’s core specialty. It starts with common anal problems that many patients put off out of embarrassment or fear of pain — treated with laser and modern sphincter-preserving techniques after a diagnosis that excludes other causes — and extends to colorectal cancer surgery: removing the tumour with its lymph nodes, laparoscopically whenever possible, coordinated with chemotherapy and radiotherapy according to stage.',
    },
    highlights: {
      ar: ['علاج البواسير والناسور بالليزر بألم أقل وتعافٍ أسرع', 'استئصال أورام القولون والمستقيم بالمنظار', 'الحفاظ على العضلة العاصرة متى أمكن'],
      en: ['Laser treatment for haemorrhoids and fistulas — less pain, faster recovery', 'Laparoscopic colorectal cancer surgery', 'Sphincter preservation whenever possible'],
    },
    tags: {
      ar: ['البواسير بالليزر', 'الشرخ والناسور', 'أورام القولون والمستقيم'],
      en: ['Laser haemorrhoids', 'Fissure & fistula', 'Colorectal cancer'],
    },
    groups: [
      {
        id: 'anorectal-surgery',
        image: '/images/services/anorectal-surgery.webp',
        title: { ar: 'الشرج والمستقيم بالليزر', en: 'Anorectal & laser' },
        procedures: [
          {
            id: 'laser-hemorrhoids',
            title: { ar: 'علاج البواسير بالليزر', en: 'Laser Haemorrhoidoplasty' },
            description: {
              ar: 'تقليص البواسير بطاقة الليزر دون جروح خارجية كبيرة، مع ألم بسيط وعودة سريعة للعمل.',
              en: 'Shrinks haemorrhoids with laser energy without large external wounds — minimal pain and a quick return to work.',
            },
            stay: { ar: 'إقامة: يوم واحد', en: 'Stay: Day case' },
            recovery: { ar: 'تعافٍ: 3–7 أيام', en: 'Recovery: 3–7 days' },
          },
          {
            id: 'anal-fissure',
            title: { ar: 'علاج الشرخ الشرجي', en: 'Anal Fissure Treatment' },
            description: {
              ar: 'من العلاج الدوائي والبوتوكس إلى الجراحة الدقيقة للحالات المزمنة التي لا تستجيب.',
              en: 'From medication and Botox to precise surgery for chronic fissures that do not respond.',
            },
            stay: { ar: 'إقامة: يوم واحد', en: 'Stay: Day case' },
            recovery: { ar: 'تعافٍ: 1–2 أسبوع', en: 'Recovery: 1–2 weeks' },
          },
          {
            id: 'anal-fistula',
            title: { ar: 'جراحة الناسور الشرجي', en: 'Anal Fistula Surgery' },
            description: {
              ar: 'تقنيات حديثة مثل الليزر وLIFT تعالج الناسور مع الحفاظ على التحكم الكامل.',
              en: 'Modern laser and LIFT techniques that treat the fistula while preserving full continence.',
            },
            stay: { ar: 'إقامة: يوم واحد', en: 'Stay: Day case' },
            recovery: { ar: 'تعافٍ: 2–3 أسابيع', en: 'Recovery: 2–3 weeks' },
          },
          {
            id: 'pilonidal-sinus',
            title: { ar: 'جراحة الناسور العصعصي', en: 'Pilonidal Sinus Surgery' },
            description: {
              ar: 'استئصال كامل مع ترقيع أو بالليزر لتقليل فرص عودة المشكلة.',
              en: 'Complete excision with flap reconstruction or laser to minimise recurrence.',
            },
            stay: { ar: 'إقامة: يوم واحد', en: 'Stay: Day case' },
            recovery: { ar: 'تعافٍ: 2–3 أسابيع', en: 'Recovery: 2–3 weeks' },
          },
        ],
      },
      {
        id: 'colorectal-oncology',
        image: '/images/services/colorectal-oncology.webp',
        title: { ar: 'أورام القولون والمستقيم', en: 'Colorectal cancer' },
        procedures: [
          {
            id: 'laparoscopic-colectomy',
            title: { ar: 'استئصال القولون بالمنظار', en: 'Laparoscopic Colectomy' },
            description: {
              ar: 'استئصال الجزء المصاب من القولون مع الغدد الليمفاوية عبر فتحات صغيرة.',
              en: 'Removes the affected colon segment with its lymph nodes through small incisions.',
            },
            stay: { ar: 'إقامة: 3–5 أيام', en: 'Stay: 3–5 days' },
            recovery: { ar: 'تعافٍ: 3–4 أسابيع', en: 'Recovery: 3–4 weeks' },
          },
          {
            id: 'low-anterior-resection',
            title: { ar: 'استئصال أورام المستقيم مع الحفاظ على العضلة العاصرة', en: 'Sphincter-Preserving Rectal Resection' },
            description: {
              ar: 'استئصال الورم مع الأنسجة المحيطة بالمستقيم (TME) والحفاظ على التحكم الطبيعي.',
              en: 'Total mesorectal excision (TME) that removes the tumour while preserving continence.',
            },
            stay: { ar: 'إقامة: 4–7 أيام', en: 'Stay: 4–7 days' },
            recovery: { ar: 'تعافٍ: 4–6 أسابيع', en: 'Recovery: 4–6 weeks' },
          },
          {
            id: 'abdominoperineal-resection',
            title: { ar: 'استئصال أورام المستقيم السفلية والشرج', en: 'Abdominoperineal Resection' },
            description: {
              ar: 'للأورام القريبة جدًا من فتحة الشرج عندما لا يمكن الحفاظ على العضلة العاصرة بأمان.',
              en: 'For tumours very close to the anus when the sphincter cannot be safely preserved.',
            },
            stay: { ar: 'إقامة: 5–7 أيام', en: 'Stay: 5–7 days' },
            recovery: { ar: 'تعافٍ: 6 أسابيع تقريبًا', en: 'Recovery: about 6 weeks' },
          },
          {
            id: 'obstructing-colon-tumors',
            title: { ar: 'جراحات انسداد القولون الورمي', en: 'Surgery for Obstructing Colon Tumours' },
            description: {
              ar: 'تدخل عاجل وآمن لعلاج الانسداد ثم استكمال الخطة العلاجية للورم.',
              en: 'Urgent, safe management of obstruction, followed by completion of the cancer treatment plan.',
            },
            stay: { ar: 'إقامة: حسب الحالة', en: 'Stay: Case-dependent' },
            recovery: { ar: 'تعافٍ: 4–6 أسابيع', en: 'Recovery: 4–6 weeks' },
          },
        ],
      },
    ],
  },
  {
    id: 'general-surgery',
    icon: 'general',
    image: '/images/services/general-surgery.webp',
    title: { ar: 'الجراحة العامة والمناظير', en: 'General & Laparoscopic Surgery' },
    short: {
      ar: 'جراحات المرارة والفتق والغدة الدرقية والأورام الحميدة بالمناظير وأحدث التقنيات.',
      en: 'Gallbladder, hernia, thyroid and benign lump surgery — laparoscopic whenever possible.',
    },
    description: {
      ar: 'إلى جانب جراحات القولون والأورام، يقدم د. محمد عاطف الكردي خبرته كاستشاري أول للجراحة العامة في الجراحات الشائعة، مع الاعتماد على المناظير كلما أمكن لتقليل الألم وتسريع العودة إلى الحياة الطبيعية.',
      en: 'Alongside colorectal and oncological surgery, Dr. Mohamed Atef ElKordy brings his experience as a senior consultant in general surgery to common operations, using laparoscopy whenever possible to reduce pain and speed recovery.',
    },
    highlights: {
      ar: ['جراحات المناظير طفيفة التوغل', 'فحص نسيجي لأي ورم يتم استئصاله', 'خروج سريع من المستشفى في أغلب الحالات'],
      en: ['Minimally invasive laparoscopy', 'Histopathology for every removed lump', 'Fast discharge in most cases'],
    },
    tags: {
      ar: ['المرارة بالمنظار', 'الفتق', 'الغدة الدرقية'],
      en: ['Laparoscopic gallbladder', 'Hernia', 'Thyroid'],
    },
    groups: [
      {
        id: 'general-laparoscopic',
        image: '/images/services/general-surgery.webp',
        title: { ar: 'الجراحة العامة والمناظير', en: 'General & laparoscopic' },
        procedures: [
          {
            id: 'laparoscopic-cholecystectomy',
            title: { ar: 'استئصال المرارة بالمنظار', en: 'Laparoscopic Cholecystectomy' },
            description: {
              ar: 'الحل الجذري لحصوات المرارة والتهاباتها المتكررة عبر فتحات صغيرة.',
              en: 'The definitive treatment for gallstones and recurrent inflammation through small ports.',
            },
            stay: { ar: 'إقامة: يوم واحد', en: 'Stay: 1 day' },
            recovery: { ar: 'تعافٍ: 7–10 أيام', en: 'Recovery: 7–10 days' },
          },
          {
            id: 'hernia-repair',
            title: { ar: 'إصلاح الفتق بالشبكة', en: 'Mesh Hernia Repair' },
            description: {
              ar: 'إصلاح الفتق الأربي والسري والجراحي بالمنظار أو الجراحة المفتوحة.',
              en: 'Repair of inguinal, umbilical and incisional hernias, laparoscopic or open.',
            },
            stay: { ar: 'إقامة: يوم واحد', en: 'Stay: Day case' },
            recovery: { ar: 'تعافٍ: 1–2 أسبوع', en: 'Recovery: 1–2 weeks' },
          },
          {
            id: 'thyroidectomy',
            title: { ar: 'استئصال الغدة الدرقية', en: 'Thyroidectomy' },
            description: {
              ar: 'لعلاج العقد وتضخم الغدة وأورامها مع الحفاظ على الأعصاب والغدد الجار درقية.',
              en: 'For nodules, goitre and thyroid tumours, protecting the nerves and parathyroid glands.',
            },
            stay: { ar: 'إقامة: 1–2 يوم', en: 'Stay: 1–2 days' },
            recovery: { ar: 'تعافٍ: 1–2 أسبوع', en: 'Recovery: 1–2 weeks' },
          },
          {
            id: 'soft-tissue-tumors',
            title: { ar: 'استئصال أورام الأنسجة الرخوة', en: 'Soft-Tissue Tumour Excision' },
            description: {
              ar: 'استئصال الأورام الدهنية والكتل تحت الجلد مع فحص نسيجي لتأكيد طبيعتها.',
              en: 'Excision of lipomas and subcutaneous lumps with histology to confirm their nature.',
            },
            stay: { ar: 'إقامة: بدون مبيت – يومين', en: 'Stay: Outpatient – 2 days' },
            recovery: { ar: 'تعافٍ: 1–3 أسابيع', en: 'Recovery: 1–3 weeks' },
          },
        ],
      },
    ],
  },
  {
    id: 'surgical-oncology',
    icon: 'oncology',
    image: '/images/services/breast-oncology.webp',
    title: { ar: 'جراحة الأورام', en: 'Surgical Oncology' },
    short: {
      ar: 'جراحات أورام الثدي والمعدة والكبد والأورام النسائية، ضمن خطة علاج متكاملة مع فريق متعدد التخصصات.',
      en: 'Breast, stomach, liver and gynaecological cancer surgery within an integrated multidisciplinary plan.',
    },
    description: {
      ar: 'بصفته أستاذًا مساعدًا لجراحة الأورام بالمعهد القومي للأورام – جامعة القاهرة، يتعامل د. محمد عاطف الكردي مع أورام الثدي والمعدة والكبد والأورام النسائية وفق أحدث البروتوكولات العالمية. لا نتخذ قرارًا جراحيًا قبل تأكيد التشخيص وتحديد مرحلة الورم بدقة، ثم نختار مع المريض الجراحة الأنسب التي تجمع بين السيطرة الكاملة على المرض والحفاظ على الأعضاء وجودة الحياة.',
      en: 'As Assistant Professor of Surgical Oncology at the National Cancer Institute – Cairo University, Dr. Mohamed Atef ElKordy treats breast, stomach, liver and gynaecological cancers to current international protocols. No surgical decision is made before the diagnosis is confirmed and the tumour accurately staged; then, together with the patient, we choose the operation that combines complete disease control with organ preservation and quality of life.',
    },
    highlights: {
      ar: ['تحديد دقيق لمرحلة الورم قبل أي قرار جراحي', 'جراحات الحفاظ على الثدي وعينة الغدة الحارسة', 'خطة متكاملة مع أطباء العلاج الكيميائي والإشعاعي'],
      en: ['Accurate staging before any surgical decision', 'Breast-conserving surgery and sentinel node biopsy', 'An integrated plan with medical and radiation oncology'],
    },
    tags: {
      ar: ['أورام الثدي', 'المعدة والكبد', 'الأورام النسائية'],
      en: ['Breast', 'Stomach & liver', 'Gynaecological'],
    },
    groups: [
      {
        id: 'breast-oncology',
        image: '/images/services/breast-oncology.webp',
        title: { ar: 'أورام الثدي', en: 'Breast cancer' },
        procedures: [
          {
            id: 'breast-conserving-surgery',
            title: { ar: 'استئصال الورم مع الحفاظ على الثدي', en: 'Breast-Conserving Surgery (Lumpectomy)' },
            description: {
              ar: 'إزالة الورم بهامش أمان مع الحفاظ على الثدي، ويُستكمل غالبًا بالعلاج الإشعاعي.',
              en: 'Removes the tumour with a safe margin while preserving the breast, usually followed by radiotherapy.',
            },
            stay: { ar: 'إقامة: يوم واحد', en: 'Stay: 1 day' },
            recovery: { ar: 'تعافٍ: 1–2 أسبوع', en: 'Recovery: 1–2 weeks' },
          },
          {
            id: 'modified-radical-mastectomy',
            title: { ar: 'استئصال الثدي الجذري المعدل', en: 'Modified Radical Mastectomy' },
            description: {
              ar: 'استئصال الثدي مع الغدد الليمفاوية الإبطية عند الحاجة، مع إمكانية الترميم.',
              en: 'Removal of the breast and axillary lymph nodes when needed, with reconstruction options.',
            },
            stay: { ar: 'إقامة: 1–2 يوم', en: 'Stay: 1–2 days' },
            recovery: { ar: 'تعافٍ: 3–4 أسابيع', en: 'Recovery: 3–4 weeks' },
          },
          {
            id: 'sentinel-node-biopsy',
            title: { ar: 'عينة الغدة الليمفاوية الحارسة', en: 'Sentinel Lymph Node Biopsy' },
            description: {
              ar: 'تحديد مدى انتشار المرض بأقل تدخل، وتجنب استئصال الغدد الإبطية دون داعٍ.',
              en: 'Stages the disease with minimal intervention, avoiding unnecessary removal of axillary nodes.',
            },
            stay: { ar: 'إقامة: يوم واحد', en: 'Stay: Day case' },
            recovery: { ar: 'تعافٍ: أسبوع تقريبًا', en: 'Recovery: about 1 week' },
          },
          {
            id: 'oncoplastic-breast-surgery',
            title: { ar: 'جراحات الثدي التجميلية الأورامية', en: 'Oncoplastic Breast Surgery' },
            description: {
              ar: 'دمج استئصال الورم مع تقنيات تجميلية لإعادة تشكيل الثدي في نفس الجراحة.',
              en: 'Combines tumour removal with plastic-surgery techniques to reshape the breast in one operation.',
            },
            stay: { ar: 'إقامة: 1–2 يوم', en: 'Stay: 1–2 days' },
            recovery: { ar: 'تعافٍ: 2–3 أسابيع', en: 'Recovery: 2–3 weeks' },
          },
        ],
      },
      {
        id: 'gastric-oncology',
        image: '/images/services/gastric-oncology.webp',
        title: { ar: 'أورام المعدة والكبد', en: 'Stomach & liver' },
        procedures: [
          {
            id: 'total-gastrectomy',
            title: { ar: 'استئصال المعدة الكلي مع الغدد الليمفاوية', en: 'Total Gastrectomy with D2 Dissection' },
            description: {
              ar: 'لأورام الجزء العلوي والأوسط من المعدة، مع إعادة توصيل المريء بالأمعاء.',
              en: 'For tumours of the upper and middle stomach, reconnecting the oesophagus to the bowel.',
            },
            stay: { ar: 'إقامة: 5–7 أيام', en: 'Stay: 5–7 days' },
            recovery: { ar: 'تعافٍ: 4–6 أسابيع', en: 'Recovery: 4–6 weeks' },
          },
          {
            id: 'subtotal-gastrectomy',
            title: { ar: 'استئصال المعدة الجزئي', en: 'Subtotal (Distal) Gastrectomy' },
            description: {
              ar: 'لأورام الجزء السفلي من المعدة مع الحفاظ على جزء منها لتسهيل التغذية.',
              en: 'For lower-stomach tumours, preserving part of the stomach to ease eating.',
            },
            stay: { ar: 'إقامة: 4–6 أيام', en: 'Stay: 4–6 days' },
            recovery: { ar: 'تعافٍ: 3–5 أسابيع', en: 'Recovery: 3–5 weeks' },
          },
          {
            id: 'partial-hepatectomy',
            title: { ar: 'استئصال جزئي للكبد', en: 'Partial Hepatectomy' },
            description: {
              ar: 'استئصال الجزء المصاب من الكبد مع الحفاظ على جزء سليم كافٍ لأداء وظائفه.',
              en: 'Removes the affected part of the liver while preserving enough healthy liver to function.',
            },
            stay: { ar: 'إقامة: 5–7 أيام', en: 'Stay: 5–7 days' },
            recovery: { ar: 'تعافٍ: 4–6 أسابيع', en: 'Recovery: 4–6 weeks' },
          },
          {
            id: 'liver-metastasectomy',
            title: { ar: 'استئصال النقائل الكبدية', en: 'Liver Metastasectomy' },
            description: {
              ar: 'استئصال الأورام الثانوية بالكبد، خاصة الناتجة عن أورام القولون، ضمن خطة علاجية متكاملة.',
              en: 'Removes secondary liver tumours, especially from colorectal cancer, within an integrated plan.',
            },
            stay: { ar: 'إقامة: 4–7 أيام', en: 'Stay: 4–7 days' },
            recovery: { ar: 'تعافٍ: 4–6 أسابيع', en: 'Recovery: 4–6 weeks' },
          },
        ],
      },
      {
        id: 'gynecologic-oncology',
        image: '/images/services/gynecologic-oncology.webp',
        title: { ar: 'الأورام النسائية', en: 'Gynaecological cancers' },
        procedures: [
          {
            id: 'radical-hysterectomy',
            title: { ar: 'استئصال الرحم الجذري', en: 'Radical Hysterectomy' },
            description: {
              ar: 'لأورام عنق الرحم في مراحلها المبكرة، مع الأنسجة المحيطة والغدد الليمفاوية الحوضية.',
              en: 'For early cervical cancer, with surrounding tissue and pelvic lymph nodes.',
            },
            stay: { ar: 'إقامة: 3–5 أيام', en: 'Stay: 3–5 days' },
            recovery: { ar: 'تعافٍ: 4–6 أسابيع', en: 'Recovery: 4–6 weeks' },
          },
          {
            id: 'ovarian-cytoreduction',
            title: { ar: 'جراحة استئصال أورام المبيض', en: 'Ovarian Cancer Cytoreductive Surgery' },
            description: {
              ar: 'استئصال أكبر قدر ممكن من الورم لتحسين فعالية العلاج الكيميائي والنتائج.',
              en: 'Removes as much tumour as possible to improve chemotherapy effectiveness and outcomes.',
            },
            stay: { ar: 'إقامة: 5–7 أيام', en: 'Stay: 5–7 days' },
            recovery: { ar: 'تعافٍ: 4–6 أسابيع', en: 'Recovery: 4–6 weeks' },
          },
          {
            id: 'endometrial-staging',
            title: { ar: 'جراحة أورام بطانة الرحم وتحديد المرحلة', en: 'Endometrial Cancer Staging Surgery' },
            description: {
              ar: 'استئصال الرحم والمبيضين مع تقييم الغدد الليمفاوية، وكثيرًا ما تتم بالمنظار.',
              en: 'Hysterectomy and removal of the ovaries with lymph node assessment, often laparoscopic.',
            },
            stay: { ar: 'إقامة: 2–3 أيام', en: 'Stay: 2–3 days' },
            recovery: { ar: 'تعافٍ: 2–4 أسابيع', en: 'Recovery: 2–4 weeks' },
          },
          {
            id: 'pelvic-lymphadenectomy',
            title: { ar: 'استئصال الغدد الليمفاوية الحوضية', en: 'Pelvic Lymphadenectomy' },
            description: {
              ar: 'تقييم انتشار المرض بدقة لتحديد الحاجة إلى العلاج التكميلي.',
              en: 'Accurately assesses spread to determine the need for further treatment.',
            },
            stay: { ar: 'إقامة: 2–4 أيام', en: 'Stay: 2–4 days' },
            recovery: { ar: 'تعافٍ: 3–4 أسابيع', en: 'Recovery: 3–4 weeks' },
          },
        ],
      },
    ],
  },
];

/** Department names keyed by id — the category labels of articles and videos. */
export const departmentTitles = Object.fromEntries(departments.map((d) => [d.id, d.title])) as Record<
  DepartmentId,
  Localized
>;

/** Filter pills (articles / videos), in department order. */
export function departmentFilters(lang: Locale) {
  return departments.map((d) => ({ key: d.id, label: d.title[lang] }));
}

/** Home "featured" panels — one per department. */
export const featuredSurgeries: FeaturedSurgery[] = [
  {
    id: 'laser-hemorrhoids',
    departmentId: 'colorectal-surgery',
    image: '/images/services/anorectal-surgery.webp',
    title: { ar: 'علاج البواسير والناسور بالليزر', en: 'Laser Treatment for Haemorrhoids & Fistula' },
    description: {
      ar: 'تقنيات ليزر حديثة بألم أقل وعودة سريعة للحياة اليومية، مع الحفاظ التام على العضلة العاصرة.',
      en: 'Modern laser techniques with less pain and a fast return to daily life, fully preserving the sphincter.',
    },
  },
  {
    id: 'laparoscopy',
    departmentId: 'general-surgery',
    image: '/images/services/general-surgery.webp',
    title: { ar: 'استئصال المرارة وإصلاح الفتق بالمنظار', en: 'Laparoscopic Gallbladder & Hernia Surgery' },
    description: {
      ar: 'فتحات صغيرة بدل الجرح الكبير: ألم أقل وخروج من المستشفى في نفس اليوم أو اليوم التالي في أغلب الحالات.',
      en: 'Small ports instead of a large incision: less pain and discharge the same or next day in most cases.',
    },
  },
  {
    id: 'breast-conserving',
    departmentId: 'surgical-oncology',
    image: '/images/services/breast-oncology.webp',
    title: { ar: 'جراحات الحفاظ على الثدي', en: 'Breast-Conserving Surgery' },
    description: {
      ar: 'استئصال الورم بهامش أمان مع الحفاظ على الثدي، وعينة الغدة الحارسة لتقليل المضاعفات.',
      en: 'Tumour removal with a safe margin while preserving the breast, plus sentinel node biopsy to limit side effects.',
    },
  },
];

/** Every procedure of a department, across its sub-specialties. */
export function departmentProcedures(department: Department): Procedure[] {
  return department.groups.flatMap((g) => g.procedures);
}

/** Image shown in the specialty showcase when a procedure card is selected. */
export function procedureImage(procedure: Procedure): string {
  return procedure.image ?? `/images/procedures/${procedure.id}.webp`;
}
