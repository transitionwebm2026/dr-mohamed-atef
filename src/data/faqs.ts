import type { Faq } from './types';

/** Shown on the Home page (also emitted as FAQPage JSON-LD). */
export const homeFaqs: Faq[] = [
  {
    id: 'h1',
    question: {
      ar: 'هل كل ورم يعني أنه سرطان؟',
      en: 'Does every tumour mean cancer?',
    },
    answer: {
      ar: 'لا. كثير من الأورام والكتل حميدة تمامًا. التشخيص النهائي يعتمد على الفحص والأشعة، والأهم هو العينة النسيجية التي تحدد طبيعة الورم بدقة قبل وضع أي خطة علاج.',
      en: 'No. Many lumps and tumours are completely benign. The final diagnosis depends on examination, imaging and, most importantly, a tissue biopsy that determines the nature of the tumour before any treatment plan.',
    },
  },
  {
    id: 'h2',
    question: {
      ar: 'متى يجب أن أزور جراح القولون والمستقيم؟',
      en: 'When should I see a colorectal surgeon?',
    },
    answer: {
      ar: 'عند نزول دم مع البراز، أو ألم أو بروز عند الشرج، أو إفرازات مستمرة، أو تغير في عادات الإخراج يستمر أكثر من بضعة أسابيع، أو أنيميا وفقدان وزن غير مفسرين. الفحص المبكر يطمئنك ويكشف أي مشكلة في وقت مبكر.',
      en: 'If you notice blood in the stool, anal pain or a lump, persistent discharge, a change in bowel habits lasting more than a few weeks, or unexplained anaemia and weight loss. An early check reassures you and detects any problem early.',
    },
  },
  {
    id: 'h3',
    question: {
      ar: 'كيف يمكنني حجز استشارة مع د. محمد عاطف الكردي؟',
      en: 'How can I book a consultation with Dr. Mohamed Atef ElKordy?',
    },
    answer: {
      ar: 'يمكنك الحجز عبر نموذج الحجز في صفحة التواصل حيث تُرسل بياناتك مباشرة على واتساب، أو بالاتصال بالعيادة. يُفضل إحضار كل التقارير والأشعة والعينات السابقة في الزيارة الأولى.',
      en: 'Book via the form on the Contact page, which sends your details straight to WhatsApp, or call the clinic. Please bring all previous reports, scans and biopsy results to your first visit.',
    },
  },
  {
    id: 'h4',
    question: {
      ar: 'هل علاج البواسير بالليزر مؤلم؟',
      en: 'Is laser haemorrhoid treatment painful?',
    },
    answer: {
      ar: 'يتم الإجراء تحت التخدير، ويكون الألم بعده عادةً أقل بكثير من الجراحة التقليدية لعدم وجود جروح خارجية كبيرة، ويعود أغلب المرضى إلى أعمالهم خلال أيام قليلة. ويحدد الطبيب مدى ملاءمة الليزر حسب درجة البواسير.',
      en: 'It is performed under anaesthesia, and pain afterwards is usually much less than with traditional surgery because there are no large external wounds; most patients return to work within a few days. Suitability depends on the haemorrhoid grade.',
    },
  },
];

/** Shown on the Services page (also emitted as FAQPage JSON-LD). */
export const serviceFaqs: Faq[] = [
  {
    id: 's1',
    question: { ar: 'ما الفحوصات المطلوبة قبل جراحة الأورام؟', en: 'Which tests are needed before cancer surgery?' },
    answer: {
      ar: 'تشمل عادةً العينة النسيجية، والأشعة المقطعية أو الرنين لتحديد مرحلة الورم، ودلالات الأورام عند الحاجة، بالإضافة إلى تحاليل الدم ووظائف القلب والرئة لتقييم الاستعداد للجراحة والتخدير.',
      en: 'Usually a tissue biopsy, CT or MRI to stage the tumour, tumour markers when relevant, plus blood tests and heart and lung assessment to confirm fitness for surgery and anaesthesia.',
    },
  },
  {
    id: 's2',
    question: { ar: 'ما معنى مرحلة الورم ولماذا هي مهمة؟', en: 'What does tumour stage mean and why does it matter?' },
    answer: {
      ar: 'المرحلة تصف حجم الورم ومدى وصوله للغدد الليمفاوية أو الأعضاء الأخرى. وعلى أساسها نحدد إن كانت الجراحة هي الخطوة الأولى، أو إن كان العلاج الكيميائي أو الإشعاعي قبل الجراحة سيحقق نتيجة أفضل.',
      en: 'Stage describes the tumour’s size and whether it has reached lymph nodes or other organs. It determines whether surgery comes first, or whether chemotherapy or radiotherapy before surgery will give a better result.',
    },
  },
  {
    id: 's3',
    question: { ar: 'لماذا قد أحتاج علاجًا كيميائيًا قبل الجراحة؟', en: 'Why might I need chemotherapy before surgery?' },
    answer: {
      ar: 'في بعض الأورام مثل الثدي والمعدة والمستقيم، يساعد العلاج قبل الجراحة على تصغير الورم، ويزيد فرص الاستئصال الكامل، وقد يسمح بالحفاظ على العضو كالثدي أو العضلة العاصرة.',
      en: 'In some cancers, such as breast, stomach and rectal cancer, treatment before surgery shrinks the tumour, increases the chance of complete removal and may allow organ preservation, such as the breast or sphincter.',
    },
  },
  {
    id: 's4',
    question: { ar: 'هل يمكن الحفاظ على الثدي في جراحة سرطان الثدي؟', en: 'Can the breast be preserved in breast cancer surgery?' },
    answer: {
      ar: 'نعم، في نسبة كبيرة من الحالات المناسبة يمكن استئصال الورم فقط مع هامش أمان، ثم استكمال العلاج الإشعاعي، بنتائج مماثلة لاستئصال الثدي الكامل من حيث فرص الشفاء.',
      en: 'Yes. In many suitable cases only the tumour is removed with a safe margin, followed by radiotherapy, with survival results comparable to a full mastectomy.',
    },
  },
  {
    id: 's5',
    question: { ar: 'هل سأحتاج إلى فتحة إخراج (كيس) بعد جراحة المستقيم؟', en: 'Will I need a stoma after rectal surgery?' },
    answer: {
      ar: 'في أغلب حالات أورام المستقيم نحافظ على العضلة العاصرة، وقد نلجأ إلى فتحة مؤقتة لحماية التوصيلة تُغلق بعد أسابيع. أما الفتحة الدائمة فتكون فقط عندما يكون الورم قريبًا جدًا من فتحة الشرج.',
      en: 'In most rectal cancers we preserve the sphincter; a temporary stoma may protect the join and is closed after a few weeks. A permanent stoma is only needed when the tumour is very close to the anus.',
    },
  },
  {
    id: 's6',
    question: { ar: 'ما هي عينة الغدة الليمفاوية الحارسة؟', en: 'What is a sentinel lymph node biopsy?' },
    answer: {
      ar: 'هي تحديد واستئصال أول غدة ليمفاوية يصرف إليها الورم وفحصها. إذا كانت سليمة يمكن تجنب استئصال باقي الغدد، مما يقلل بشكل كبير من احتمال تورم الذراع بعد جراحات الثدي.',
      en: 'It identifies and removes the first lymph node the tumour drains to. If it is clear, removing the remaining nodes can be avoided, greatly reducing the risk of arm swelling after breast surgery.',
    },
  },
  {
    id: 's7',
    question: { ar: 'كم يومًا سأبقى في المستشفى؟', en: 'How long will I stay in hospital?' },
    answer: {
      ar: 'تختلف المدة حسب نوع الجراحة: من يوم واحد في جراحات الثدي، إلى 3–7 أيام في جراحات القولون والمعدة والكبد. ونطبق بروتوكولات التعافي المعزز لتقصير الإقامة بأمان.',
      en: 'It depends on the operation: about one day for breast surgery and 3–7 days for colorectal, gastric and liver surgery. We use enhanced-recovery protocols to shorten the stay safely.',
    },
  },
  {
    id: 's8',
    question: { ar: 'متى تظهر نتيجة الفحص النسيجي بعد الجراحة؟', en: 'When will the pathology result be ready after surgery?' },
    answer: {
      ar: 'تظهر غالبًا خلال 7 إلى 14 يومًا، وتحدد بدقة نوع الورم ومرحلته وهوامش الاستئصال والغدد الليمفاوية، وعلى أساسها نناقش الحاجة إلى علاج تكميلي.',
      en: 'Usually within 7–14 days. It precisely defines tumour type, stage, margins and lymph nodes, and guides any further treatment we discuss.',
    },
  },
  {
    id: 's9',
    question: { ar: 'كيف تكون المتابعة بعد جراحة الأورام؟', en: 'What does follow-up after cancer surgery look like?' },
    answer: {
      ar: 'تشمل زيارات دورية وفحوصات وأشعة وتحاليل بجدول محدد يكون أكثر تقاربًا في أول عامين، للاطمئنان على التعافي واكتشاف أي تغير مبكرًا.',
      en: 'Regular visits with examinations, scans and blood tests on a set schedule — more frequent in the first two years — to monitor recovery and detect any change early.',
    },
  },
  {
    id: 's10',
    question: { ar: 'ما العلامات التي تستدعي التواصل الفوري بعد العملية؟', en: 'Which warning signs after surgery need immediate contact?' },
    answer: {
      ar: 'ارتفاع الحرارة فوق 38.5 درجة، أو ألم شديد متزايد، أو احمرار وإفرازات من الجرح، أو قيء مستمر، أو نزيف، أو ضيق في التنفس. في هذه الحالات تواصل معنا فورًا.',
      en: 'A temperature above 38.5 °C, severe or increasing pain, redness or discharge from the wound, persistent vomiting, bleeding or shortness of breath. Contact us immediately in any of these cases.',
    },
  },
];
