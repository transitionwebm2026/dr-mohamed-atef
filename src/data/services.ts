import type { FeaturedSurgery, Procedure, Specialty } from './types';

/**
 * Sub-specialties — led by colon, rectal & anal surgery (the doctor's logo: "COLON SURGERY CONSULTANT"),
 * plus the oncology fields listed on his Vezeeta profile (breast, colon, stomach, liver, gynaecological)
 * and general surgery. Stay / recovery values are typical ranges — adjust to the doctor's own protocols.
 */
export const specialties: Specialty[] = [
  {
    id: 'anorectal-surgery',
    icon: 'colorectal',
    image: '/images/services/anorectal-surgery.webp',
    title: { ar: 'جراحات الشرج والمستقيم بالليزر', en: 'Anorectal & Laser Surgery' },
    short: {
      ar: 'علاج البواسير والشرخ والناسور بأحدث التقنيات وبأقل ألم ممكن، بخصوصية كاملة.',
      en: 'Modern, low-pain treatment for haemorrhoids, fissures and fistulas — with complete privacy.',
    },
    description: {
      ar: 'مشكلات الشرج والمستقيم من أكثر الحالات شيوعًا، ويؤجل كثير من المرضى علاجها بسبب الحرج أو الخوف من الألم. نعتمد على تقنيات الليزر والجراحات الحديثة التي تحافظ على العضلة العاصرة، مع تشخيص دقيق يستبعد أي أسباب أخرى للأعراض مثل أورام القولون والمستقيم.',
      en: 'Anorectal problems are among the most common conditions, yet many patients delay treatment out of embarrassment or fear of pain. We use laser techniques and modern sphincter-preserving surgery, with an accurate diagnosis that excludes other causes such as colorectal tumours.',
    },
    highlights: {
      ar: ['علاج البواسير بالليزر بألم أقل وتعافٍ أسرع', 'الحفاظ التام على وظيفة العضلة العاصرة', 'فحص دقيق لاستبعاد أي أسباب أخرى للنزيف'],
      en: ['Laser haemorrhoid treatment with less pain and faster recovery', 'Full preservation of sphincter function', 'Thorough examination to exclude other causes of bleeding'],
    },
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
    icon: 'oncology',
    image: '/images/services/colorectal-oncology.webp',
    title: { ar: 'جراحة أورام القولون والمستقيم', en: 'Colorectal Cancer Surgery' },
    short: {
      ar: 'استئصال أورام القولون والمستقيم بالمنظار أو الجراحة المفتوحة مع الحفاظ على الوظائف الطبيعية.',
      en: 'Laparoscopic or open colorectal cancer surgery that preserves normal function.',
    },
    description: {
      ar: 'تعتمد جراحة أورام القولون والمستقيم على استئصال الجزء المصاب مع الغدد الليمفاوية المحيطة بدقة، ثم إعادة توصيل الأمعاء. ونحرص في أورام المستقيم على الحفاظ على العضلة العاصرة كلما أمكن، مع التنسيق للعلاج الكيميائي والإشعاعي قبل الجراحة أو بعدها حسب مرحلة الورم.',
      en: 'Colorectal cancer surgery removes the affected segment together with its lymph nodes, then reconnects the bowel. In rectal cancer we aim to preserve the sphincter whenever possible, coordinating chemotherapy and radiotherapy before or after surgery according to stage.',
    },
    highlights: {
      ar: ['الجراحة بالمنظار لتعافٍ أسرع وألم أقل', 'الحفاظ على العضلة العاصرة متى أمكن', 'بروتوكولات التعافي المعزز بعد الجراحة'],
      en: ['Laparoscopic surgery for faster recovery and less pain', 'Sphincter preservation whenever possible', 'Enhanced recovery after surgery (ERAS) protocols'],
    },
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
  {
    id: 'breast-oncology',
    icon: 'breast',
    image: '/images/services/breast-oncology.webp',
    title: { ar: 'جراحة أورام الثدي', en: 'Breast Cancer Surgery' },
    short: {
      ar: 'استئصال أورام الثدي مع الحفاظ على الثدي كلما أمكن، وفق أحدث البروتوكولات العالمية.',
      en: 'Breast tumour surgery that preserves the breast whenever possible, following current international protocols.',
    },
    description: {
      ar: 'تطورت جراحة أورام الثدي لتجمع بين السيطرة الكاملة على المرض والحفاظ على شكل الثدي وجودة الحياة. نحدد مع كل مريضة الخيار الأنسب بعد مراجعة الأشعة والعينة ومرحلة الورم، ضمن خطة متكاملة مع أطباء العلاج الكيميائي والإشعاعي.',
      en: 'Breast cancer surgery now combines complete disease control with preserving the breast’s appearance and quality of life. With every patient we choose the best option after reviewing imaging, biopsy and stage, within an integrated plan with medical and radiation oncology.',
    },
    highlights: {
      ar: ['جراحات الحفاظ على الثدي متى كانت مناسبة', 'عينة الغدة الليمفاوية الحارسة لتقليل تورم الذراع', 'خطة علاج متكاملة مع فريق متعدد التخصصات'],
      en: ['Breast-conserving surgery whenever suitable', 'Sentinel lymph node biopsy to reduce arm swelling', 'Integrated plan with a multidisciplinary team'],
    },
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
    icon: 'gastric',
    image: '/images/services/gastric-oncology.webp',
    title: { ar: 'جراحة أورام المعدة والكبد', en: 'Stomach & Liver Cancer Surgery' },
    short: {
      ar: 'استئصال أورام المعدة مع الغدد الليمفاوية، واستئصال أورام الكبد الأولية والثانوية بأمان.',
      en: 'Gastrectomy with lymph node dissection, and safe resection of primary and secondary liver tumours.',
    },
    description: {
      ar: 'تتطلب أورام المعدة والكبد تقييمًا دقيقًا لمرحلة المرض قبل اتخاذ القرار. في أورام المعدة يشمل العلاج غالبًا علاجًا كيميائيًا قبل الجراحة وبعدها مع استئصال المعدة والغدد الليمفاوية (D2)، وفي أورام الكبد نعتمد على تقييم وظائف الكبد وحجم الجزء المتبقي لضمان أعلى درجات الأمان.',
      en: 'Stomach and liver tumours require careful staging before any decision. For stomach cancer, treatment often includes chemotherapy before and after surgery with gastrectomy and D2 lymph node dissection; for liver tumours we assess liver function and remnant volume for maximum safety.',
    },
    highlights: {
      ar: ['تحديد مرحلة الورم بدقة قبل الجراحة', 'استئصال الغدد الليمفاوية D2 وفق المعايير العالمية', 'تقييم وظائف الكبد وحجم الجزء المتبقي'],
      en: ['Accurate staging before surgery', 'D2 lymphadenectomy to international standards', 'Liver function and remnant volume assessment'],
    },
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
    icon: 'gynecologic',
    image: '/images/services/gynecologic-oncology.webp',
    title: { ar: 'جراحة الأورام النسائية', en: 'Gynaecological Cancer Surgery' },
    short: {
      ar: 'جراحات أورام الرحم وعنق الرحم والمبيض بخصوصية كاملة ودقة جراحية عالية.',
      en: 'Uterine, cervical and ovarian cancer surgery with complete privacy and high precision.',
    },
    description: {
      ar: 'تحتاج الأورام النسائية إلى جراحة دقيقة تجمع بين الاستئصال الكامل للمرض وتحديد مرحلته بدقة لتوجيه العلاج التكميلي. نتعامل مع كل حالة بخصوصية تامة، ونشرح للمريضة وأسرتها كل الخيارات بوضوح ضمن فريق علاجي متكامل.',
      en: 'Gynaecological cancers need precise surgery that removes all disease and stages it accurately to guide further treatment. Every case is handled with complete privacy, and we clearly explain all options to the patient and her family within an integrated team.',
    },
    highlights: {
      ar: ['تحديد دقيق لمرحلة الورم أثناء الجراحة', 'جراحات استئصال جذرية عند الحاجة', 'خصوصية كاملة ودعم نفسي للمريضة'],
      en: ['Accurate surgical staging', 'Radical resections when required', 'Complete privacy and emotional support'],
    },
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
  {
    id: 'general-surgery',
    icon: 'general',
    image: '/images/services/general-surgery.webp',
    title: { ar: 'الجراحة العامة والمناظير', en: 'General & Laparoscopic Surgery' },
    short: {
      ar: 'جراحات المرارة والفتق والغدة الدرقية والأورام الحميدة بأحدث التقنيات.',
      en: 'Gallbladder, hernia, thyroid and benign tumour surgery using modern techniques.',
    },
    description: {
      ar: 'إلى جانب جراحات القولون والأورام، يقدم د. محمد عاطف الكردي خبرته كاستشاري أول للجراحة العامة في الجراحات الشائعة، مع الاعتماد على المناظير كلما أمكن لتقليل الألم وتسريع العودة إلى الحياة الطبيعية.',
      en: 'Alongside colorectal and oncological surgery, Dr. Mohamed Atef ElKordy brings his experience as a senior consultant in general surgery to common operations, using laparoscopy whenever possible to reduce pain and speed recovery.',
    },
    highlights: {
      ar: ['جراحات المناظير طفيفة التوغل', 'فحص نسيجي لأي ورم يتم استئصاله', 'خروج سريع من المستشفى في أغلب الحالات'],
      en: ['Minimally invasive laparoscopy', 'Histopathology for every removed lump', 'Fast discharge in most cases'],
    },
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
];

export const featuredSurgeries: FeaturedSurgery[] = [
  {
    id: 'laser-hemorrhoids',
    specialtyId: 'anorectal-surgery',
    image: '/images/services/anorectal-surgery.webp',
    tag: { ar: 'الشرج والمستقيم', en: 'Anorectal' },
    title: { ar: 'علاج البواسير والناسور بالليزر', en: 'Laser Treatment for Haemorrhoids & Fistula' },
    description: {
      ar: 'تقنيات ليزر حديثة بألم أقل وعودة سريعة للحياة اليومية، مع الحفاظ التام على العضلة العاصرة.',
      en: 'Modern laser techniques with less pain and a fast return to daily life, fully preserving the sphincter.',
    },
  },
  {
    id: 'colectomy',
    specialtyId: 'colorectal-oncology',
    image: '/images/services/colorectal-oncology.webp',
    tag: { ar: 'أورام القولون', en: 'Colorectal Cancer' },
    title: { ar: 'استئصال أورام القولون والمستقيم بالمنظار', en: 'Laparoscopic Colorectal Cancer Surgery' },
    description: {
      ar: 'استئصال الورم والغدد الليمفاوية عبر فتحات صغيرة مع الحفاظ على العضلة العاصرة متى أمكن.',
      en: 'Tumour and lymph node removal through small incisions, preserving the sphincter whenever possible.',
    },
  },
  {
    id: 'breast-conserving',
    specialtyId: 'breast-oncology',
    image: '/images/services/breast-oncology.webp',
    tag: { ar: 'أورام الثدي', en: 'Breast' },
    title: { ar: 'جراحات الحفاظ على الثدي', en: 'Breast-Conserving Surgery' },
    description: {
      ar: 'استئصال الورم بهامش أمان مع الحفاظ على الثدي، وعينة الغدة الحارسة لتقليل المضاعفات.',
      en: 'Tumour removal with a safe margin while preserving the breast, plus sentinel node biopsy to limit side effects.',
    },
  },
];

export function getSpecialty(id: string): Specialty | undefined {
  return specialties.find((s) => s.id === id);
}

/** Image shown in the specialty showcase when a procedure card is selected. */
export function procedureImage(procedure: Procedure): string {
  return procedure.image ?? `/images/procedures/${procedure.id}.webp`;
}
