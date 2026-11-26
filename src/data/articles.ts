import { departmentTitles } from './services';
import type { Article } from './types';

/** Articles are filed under the three service departments (same names as on /services/). */
export const articleCategories = departmentTitles;

export const articles: Article[] = [
  {
    slug: 'breast-cancer-surgery-guide',
    category: 'surgical-oncology',
    image: '/images/articles/breast-cancer-surgery-guide.webp',
    publishedAt: '2026-10-12',
    updatedAt: '2026-11-02',
    readTime: 8,
    title: {
      ar: 'الدليل الشامل لجراحة سرطان الثدي: من التشخيص إلى التعافي',
      en: 'The Complete Guide to Breast Cancer Surgery: From Diagnosis to Recovery',
    },
    excerpt: {
      ar: 'كيف يتم تشخيص سرطان الثدي وتحديد مرحلته، ومتى يمكن الحفاظ على الثدي، وما الذي تتوقعينه قبل الجراحة وبعدها.',
      en: 'How breast cancer is diagnosed and staged, when the breast can be preserved, and what to expect before and after surgery.',
    },
    body: {
      ar: [
        {
          heading: 'التشخيص الدقيق أولًا',
          text: 'تبدأ الرحلة بالفحص السريري والماموجرام والموجات الصوتية، ثم العينة بالإبرة التي تحدد نوع الورم وخصائصه الهرمونية. هذه المعلومات هي الأساس الذي تُبنى عليه خطة العلاج كاملة، ولذلك لا نتخذ أي قرار جراحي قبل اكتمالها.',
        },
        {
          heading: 'الحفاظ على الثدي أم الاستئصال الكامل؟',
          text: 'في كثير من الحالات المناسبة يمكن استئصال الورم فقط مع هامش أمان ثم استكمال العلاج الإشعاعي، بنتائج مماثلة للاستئصال الكامل من حيث فرص الشفاء. ويتحدد الخيار حسب حجم الورم بالنسبة للثدي، وعدد البؤر، ورغبة المريضة بعد شرح كل البدائل.',
        },
        {
          heading: 'الغدد الليمفاوية الإبطية',
          text: 'أصبحت عينة الغدة الليمفاوية الحارسة هي المعيار في الحالات المبكرة؛ إذ نفحص أول غدة يصرف إليها الورم، وإذا كانت سليمة نتجنب استئصال باقي الغدد، مما يقلل كثيرًا من احتمال تورم الذراع.',
        },
        {
          heading: 'بعد الجراحة',
          text: 'تعود أغلب المريضات إلى المنزل خلال يوم أو يومين. وتحدد نتيجة الفحص النسيجي الخطوات التالية مثل العلاج الإشعاعي أو الكيميائي أو الهرموني، ضمن متابعة منتظمة مع الفريق المعالج.',
        },
      ],
      en: [
        {
          heading: 'Accurate diagnosis comes first',
          text: 'The journey starts with clinical examination, mammography and ultrasound, then a needle biopsy that defines the tumour type and hormone receptors. This information is the foundation of the whole treatment plan, so no surgical decision is made before it is complete.',
        },
        {
          heading: 'Breast conservation or mastectomy?',
          text: 'In many suitable cases only the tumour is removed with a safe margin, followed by radiotherapy, with survival comparable to mastectomy. The choice depends on tumour size relative to the breast, the number of foci and the patient’s preference after all options are explained.',
        },
        {
          heading: 'The axillary lymph nodes',
          text: 'Sentinel lymph node biopsy is now the standard in early disease: we examine the first node the tumour drains to and, if it is clear, avoid removing the rest — greatly reducing the risk of arm swelling.',
        },
        {
          heading: 'After surgery',
          text: 'Most patients go home within one or two days. The pathology result guides next steps such as radiotherapy, chemotherapy or hormonal therapy, with regular follow-up by the treating team.',
        },
      ],
    },
    takeaways: {
      ar: ['العينة النسيجية أساس خطة العلاج', 'الحفاظ على الثدي ممكن في كثير من الحالات', 'الغدة الحارسة تقلل خطر تورم الذراع', 'المتابعة المنتظمة جزء أساسي من العلاج'],
      en: ['The biopsy is the foundation of the plan', 'Breast conservation is possible in many cases', 'Sentinel node biopsy reduces arm swelling', 'Regular follow-up is part of treatment'],
    },
  },
  {
    slug: 'colon-cancer-early-signs',
    category: 'colorectal-surgery',
    image: '/images/articles/colon-cancer-early-signs.webp',
    publishedAt: '2026-10-20',
    updatedAt: '2026-11-05',
    readTime: 6,
    featured: true,
    title: {
      ar: 'سرطان القولون: علامات مبكرة لا تتجاهلها وأهمية الكشف المبكر',
      en: 'Colon Cancer: Early Signs You Shouldn’t Ignore and Why Screening Matters',
    },
    excerpt: {
      ar: 'تعرّف على الأعراض التي تستدعي منظار القولون، ولماذا يرفع الاكتشاف المبكر فرص الشفاء بشكل كبير.',
      en: 'Learn which symptoms call for a colonoscopy and why early detection greatly improves the chance of cure.',
    },
    body: {
      ar: [
        { heading: 'أعراض تستدعي الفحص', text: 'نزول دم مع البراز، أو تغير مستمر في عادات الإخراج، أو أنيميا غير مفسرة، أو فقدان وزن دون سبب واضح. هذه الأعراض لا تعني بالضرورة وجود ورم، لكنها تستحق تقييمًا طبيًا ومنظارًا للقولون.' },
        { heading: 'قيمة الكشف المبكر', text: 'كثير من أورام القولون تبدأ كزوائد لحمية صغيرة يمكن استئصالها بالمنظار قبل أن تتحول. ولذلك يُنصح بالفحص الدوري بدءًا من منتصف الأربعينيات، أو قبل ذلك لمن لديهم تاريخ عائلي.' },
        { heading: 'العلاج الجراحي اليوم', text: 'يُستأصل الجزء المصاب مع الغدد الليمفاوية المحيطة، وغالبًا بالمنظار، مما يعني ألمًا أقل وتعافيًا أسرع، مع الحفاظ على الوظائف الطبيعية في معظم الحالات.' },
      ],
      en: [
        { heading: 'Symptoms that need checking', text: 'Blood in the stool, a persistent change in bowel habits, unexplained anaemia or unintended weight loss. These do not necessarily mean a tumour, but they deserve medical assessment and a colonoscopy.' },
        { heading: 'Why early detection matters', text: 'Many colon cancers begin as small polyps that can be removed during colonoscopy before they become malignant. Regular screening is therefore advised from the mid-forties, or earlier with a family history.' },
        { heading: 'Surgery today', text: 'The affected segment is removed with its lymph nodes, often laparoscopically, meaning less pain and faster recovery while preserving normal function in most cases.' },
      ],
    },
    takeaways: {
      ar: ['نزول الدم مع البراز يستحق الفحص دائمًا', 'المنظار قد يمنع الورم قبل حدوثه', 'الجراحة بالمنظار ممكنة في كثير من الحالات'],
      en: ['Blood in the stool always deserves a check', 'Colonoscopy can prevent cancer before it starts', 'Laparoscopic surgery is possible in many cases'],
    },
  },
  {
    slug: 'stomach-cancer-surgery',
    category: 'surgical-oncology',
    image: '/images/articles/stomach-cancer-surgery.webp',
    publishedAt: '2026-09-10',
    updatedAt: '2026-10-01',
    readTime: 7,
    title: {
      ar: 'جراحة سرطان المعدة: ماذا تتوقع قبل العملية وبعدها؟',
      en: 'Stomach Cancer Surgery: What to Expect Before and After',
    },
    excerpt: {
      ar: 'من تحديد مرحلة الورم والعلاج الكيميائي قبل الجراحة، إلى التغذية والحياة الطبيعية بعد استئصال المعدة.',
      en: 'From staging and pre-operative chemotherapy to eating and normal life after gastrectomy.',
    },
    body: {
      ar: [
        { heading: 'تحديد المرحلة بدقة', text: 'يعتمد القرار على المنظار والعينة والأشعة المقطعية، وأحيانًا المنظار التشخيصي للبطن. وفي كثير من الحالات يبدأ العلاج بالكيماوي قبل الجراحة لزيادة فرص الاستئصال الكامل.' },
        { heading: 'الجراحة', text: 'يُستأصل جزء من المعدة أو المعدة كاملة حسب موقع الورم، مع الغدد الليمفاوية المحيطة (D2)، ثم يُعاد توصيل الجهاز الهضمي بطريقة تسمح بالأكل الطبيعي تدريجيًا.' },
        { heading: 'الحياة بعد استئصال المعدة', text: 'يتعلم المريض تناول وجبات صغيرة متكررة غنية بالبروتين، مع مكملات غذائية حسب الحاجة. ومع المتابعة الغذائية المنتظمة يعود معظم المرضى إلى حياتهم الطبيعية.' },
      ],
      en: [
        { heading: 'Accurate staging', text: 'Decisions rely on endoscopy, biopsy and CT, sometimes with a staging laparoscopy. In many cases treatment starts with chemotherapy before surgery to improve the chance of complete removal.' },
        { heading: 'The operation', text: 'Part or all of the stomach is removed depending on tumour location, together with the surrounding lymph nodes (D2), and the digestive tract is reconnected so normal eating can gradually resume.' },
        { heading: 'Life after gastrectomy', text: 'Patients learn to eat small, frequent, protein-rich meals with supplements as needed. With regular nutritional follow-up, most return to normal life.' },
      ],
    },
    takeaways: {
      ar: ['تحديد المرحلة يسبق أي قرار جراحي', 'الكيماوي قبل الجراحة شائع ومفيد', 'الوجبات الصغيرة المتكررة مفتاح التعافي'],
      en: ['Staging precedes any surgical decision', 'Pre-operative chemotherapy is common and helpful', 'Small frequent meals are key to recovery'],
    },
  },
  {
    slug: 'liver-tumors-when-surgery',
    category: 'surgical-oncology',
    image: '/images/articles/liver-tumors-when-surgery.webp',
    publishedAt: '2026-08-22',
    updatedAt: '2026-09-05',
    readTime: 6,
    title: {
      ar: 'أورام الكبد: متى تكون الجراحة هي الحل؟',
      en: 'Liver Tumours: When Is Surgery the Answer?',
    },
    excerpt: {
      ar: 'الفرق بين أورام الكبد الأولية والثانوية، ولماذا تجعل قدرة الكبد على التجدد الجراحة خيارًا فعالًا.',
      en: 'The difference between primary and secondary liver tumours, and why the liver’s ability to regenerate makes surgery effective.',
    },
    body: {
      ar: [
        { heading: 'أورام أولية وثانوية', text: 'الأورام الأولية تنشأ في الكبد نفسه، بينما الثانوية تنتقل إليه من عضو آخر، وأشهرها أورام القولون. وفي الحالتين قد تكون الجراحة جزءًا أساسيًا من العلاج.' },
        { heading: 'قدرة الكبد على التجدد', text: 'يستطيع الكبد السليم أن يعوض الجزء المستأصل خلال أسابيع، لذلك يمكن استئصال جزء كبير منه بأمان بشرط أن يكون الجزء المتبقي كافيًا ويعمل بكفاءة.' },
        { heading: 'التقييم قبل الجراحة', text: 'نعتمد على الأشعة المقطعية والرنين وتحاليل وظائف الكبد لتحديد إمكانية الاستئصال وحجم الجزء المتبقي، ضمن قرار مشترك مع أطباء الكبد والأورام.' },
      ],
      en: [
        { heading: 'Primary and secondary tumours', text: 'Primary tumours arise in the liver itself, while secondary ones spread from another organ — most commonly the colon. In both, surgery may be a key part of treatment.' },
        { heading: 'The liver regenerates', text: 'A healthy liver can replace the removed part within weeks, so a large portion can be safely resected provided the remaining liver is sufficient and works well.' },
        { heading: 'Assessment before surgery', text: 'CT, MRI and liver function tests determine resectability and remnant volume, in a joint decision with hepatology and oncology.' },
      ],
    },
    takeaways: {
      ar: ['النقائل الكبدية من القولون قد تُستأصل جراحيًا', 'الكبد يتجدد بعد الاستئصال', 'التقييم الدقيق أساس الأمان'],
      en: ['Colorectal liver metastases may be surgically removable', 'The liver regenerates after resection', 'Careful assessment is the basis of safety'],
    },
  },
  {
    slug: 'laser-hemorrhoids-treatment',
    category: 'colorectal-surgery',
    image: '/images/articles/laser-hemorrhoids-treatment.webp',
    publishedAt: '2026-10-05',
    updatedAt: '2026-10-25',
    readTime: 5,
    title: {
      ar: 'علاج البواسير بالليزر: لمن يناسب وما الذي تتوقعه؟',
      en: 'Laser Treatment for Haemorrhoids: Who Is It For and What to Expect',
    },
    excerpt: {
      ar: 'درجات البواسير وخيارات علاج كل درجة، ولماذا أصبح الليزر خيارًا مفضلًا لكثير من المرضى، وأهمية استبعاد أسباب النزيف الأخرى.',
      en: 'Haemorrhoid grades and the treatment for each, why laser has become a favourite option, and why other causes of bleeding must be excluded.',
    },
    body: {
      ar: [
        { heading: 'درجات البواسير', text: 'تُصنف البواسير إلى أربع درجات حسب مدى بروزها. الدرجتان الأولى والثانية تستجيبان غالبًا للعلاج الدوائي وتعديل نمط الحياة، بينما تحتاج الدرجات المتقدمة أو المصحوبة بنزيف متكرر إلى تدخل.' },
        { heading: 'كيف يعمل الليزر؟', text: 'يعمل الليزر على تقليص البواسير من الداخل دون جروح خارجية كبيرة، مما يقلل الألم بعد الإجراء ويسمح بالعودة إلى العمل خلال أيام قليلة في أغلب الحالات.' },
        { heading: 'لا تفترض أن كل نزيف بواسير', text: 'نزول الدم قد يكون له أسباب أخرى، منها أورام القولون والمستقيم. لذلك نحرص على فحص دقيق، وقد نوصي بمنظار القولون حسب العمر والأعراض قبل أي علاج.' },
      ],
      en: [
        { heading: 'Haemorrhoid grades', text: 'Haemorrhoids are graded from one to four according to prolapse. Grades one and two usually respond to medication and lifestyle changes, while advanced grades or recurrent bleeding need intervention.' },
        { heading: 'How laser works', text: 'Laser shrinks haemorrhoids from within without large external wounds, reducing post-procedure pain and allowing a return to work within a few days in most cases.' },
        { heading: 'Don’t assume all bleeding is haemorrhoids', text: 'Rectal bleeding can have other causes, including colorectal tumours. We therefore examine carefully and may recommend a colonoscopy, depending on age and symptoms, before any treatment.' },
      ],
    },
    takeaways: {
      ar: ['الدرجات المبكرة تُعالج غالبًا دون جراحة', 'الليزر يقلل الألم ومدة التعافي', 'أي نزيف يستحق فحصًا دقيقًا لاستبعاد الأورام'],
      en: ['Early grades are usually treated without surgery', 'Laser reduces pain and recovery time', 'Any bleeding deserves a check to exclude tumours'],
    },
  },
  {
    slug: 'gallstones-laparoscopic-cholecystectomy',
    category: 'general-surgery',
    image: '/images/procedures/laparoscopic-cholecystectomy.webp',
    publishedAt: '2026-11-10',
    updatedAt: '2026-11-18',
    readTime: 5,
    title: {
      ar: 'حصوات المرارة: متى يكون استئصال المرارة بالمنظار هو الحل؟',
      en: 'Gallstones: When Is Laparoscopic Gallbladder Removal the Answer?',
    },
    excerpt: {
      ar: 'ليست كل حصوة مرارة تحتاج إلى جراحة. تعرّف على الأعراض التي تستدعي الاستئصال، ولماذا أصبح المنظار هو الخيار الأول.',
      en: 'Not every gallstone needs surgery. Learn which symptoms call for removal, and why laparoscopy is now the first choice.',
    },
    body: {
      ar: [
        { heading: 'متى تحتاج المرارة إلى استئصال؟', text: 'الحصوات التي تُكتشف صدفة دون أعراض لا تحتاج غالبًا إلى جراحة. أما نوبات الألم المتكررة أعلى يمين البطن بعد الوجبات الدسمة، أو التهاب المرارة، أو انسداد القناة المرارية، أو التهاب البنكرياس الناتج عن الحصوات، فكلها تجعل الاستئصال هو العلاج الجذري.' },
        { heading: 'لماذا المنظار؟', text: 'يتم استئصال المرارة عبر ثلاث أو أربع فتحات صغيرة بدل الجرح الكبير، مما يعني ألمًا أقل وندبات بسيطة وخروجًا من المستشفى في نفس اليوم أو اليوم التالي في أغلب الحالات.' },
        { heading: 'بعد العملية', text: 'يعود معظم المرضى إلى أعمالهم المكتبية خلال أسبوع تقريبًا. ويتكيف الجهاز الهضمي مع غياب المرارة دون مشكلة، مع تقليل الدهون في الأسابيع الأولى.' },
      ],
      en: [
        { heading: 'When does the gallbladder need removing?', text: 'Stones found by chance without symptoms usually do not need surgery. Recurrent upper-right abdominal pain after fatty meals, gallbladder inflammation, a blocked bile duct or stone-related pancreatitis, however, make removal the definitive treatment.' },
        { heading: 'Why laparoscopy?', text: 'The gallbladder is removed through three or four small ports instead of a large incision — less pain, small scars and discharge the same or next day in most cases.' },
        { heading: 'After the operation', text: 'Most patients return to desk work within about a week. Digestion adapts to life without a gallbladder without problems, with less fat in the first few weeks.' },
      ],
    },
    takeaways: {
      ar: ['الحصوات دون أعراض لا تحتاج غالبًا إلى جراحة', 'الألم المتكرر والالتهاب يستدعيان الاستئصال', 'المنظار يعني ألمًا أقل وعودة أسرع'],
      en: ['Silent stones usually need no surgery', 'Recurrent pain and inflammation call for removal', 'Laparoscopy means less pain and a faster return'],
    },
  },
  {
    slug: 'hernia-repair-guide',
    category: 'general-surgery',
    image: '/images/procedures/hernia-repair.webp',
    publishedAt: '2026-09-25',
    updatedAt: '2026-10-08',
    readTime: 5,
    title: {
      ar: 'الفتق: لماذا لا يختفي وحده، وكيف تختار طريقة الإصلاح؟',
      en: 'Hernia: Why It Won’t Go Away on Its Own and How It Is Repaired',
    },
    excerpt: {
      ar: 'أنواع الفتق الشائعة، وعلامات الخطر التي تستدعي التدخل العاجل، والفرق بين الإصلاح بالمنظار والجراحة المفتوحة.',
      en: 'Common types of hernia, the warning signs that need urgent care, and the difference between laparoscopic and open repair.',
    },
    body: {
      ar: [
        { heading: 'ما هو الفتق؟', text: 'الفتق بروز لجزء من محتويات البطن عبر نقطة ضعف في جدار البطن، وأشهره الفتق الأربي والسري والفتق في مكان جراحة سابقة. ولا يلتئم الفتق من تلقاء نفسه، بل يميل إلى الكبر مع الوقت.' },
        { heading: 'علامات تستدعي التدخل العاجل', text: 'إذا أصبح الفتق مؤلمًا بشدة أو صلبًا ولا يمكن إرجاعه، أو صاحبه قيء وانتفاخ، فقد يكون مختنقًا ويحتاج إلى جراحة عاجلة. لذلك يُفضل إصلاح الفتق بشكل مخطط قبل حدوث المضاعفات.' },
        { heading: 'المنظار أم الجراحة المفتوحة؟', text: 'يتم الإصلاح غالبًا بشبكة طبية تقوي جدار البطن وتقلل فرص عودة الفتق. ونختار بين المنظار والجراحة المفتوحة حسب نوع الفتق وحجمه وحالة المريض، وفي الحالتين يخرج أغلب المرضى في نفس اليوم.' },
      ],
      en: [
        { heading: 'What is a hernia?', text: 'A hernia is a bulge of abdominal contents through a weak point in the abdominal wall — most commonly inguinal, umbilical or at the site of a previous operation. A hernia does not heal by itself and tends to grow over time.' },
        { heading: 'Warning signs that need urgent care', text: 'If a hernia becomes very painful or hard and cannot be pushed back, or comes with vomiting and bloating, it may be strangulated and need emergency surgery. Planned repair before complications is therefore preferred.' },
        { heading: 'Laparoscopic or open?', text: 'Repair usually uses a medical mesh that strengthens the abdominal wall and lowers the chance of recurrence. We choose laparoscopic or open repair according to the hernia’s type and size and the patient’s condition; either way, most patients go home the same day.' },
      ],
    },
    takeaways: {
      ar: ['الفتق لا يختفي وحده ويكبر مع الوقت', 'الألم الشديد وعدم الارتداد علامة خطر', 'الشبكة الطبية تقلل فرص عودة الفتق'],
      en: ['A hernia does not disappear and grows with time', 'Severe pain and an irreducible bulge are warning signs', 'Mesh repair lowers the chance of recurrence'],
    },
  },
  {
    slug: 'anal-fissure-treatment',
    category: 'colorectal-surgery',
    image: '/images/procedures/anal-fissure.webp',
    publishedAt: '2026-08-30',
    updatedAt: '2026-09-12',
    readTime: 5,
    title: {
      ar: 'الشرخ الشرجي: هل يحتاج دائمًا إلى جراحة؟',
      en: 'Anal Fissure: Does It Always Need Surgery?',
    },
    excerpt: {
      ar: 'الفرق بين الشرخ الحاد والمزمن، وخطوات العلاج من تعديل الغذاء والمراهم إلى البوتوكس والجراحة الدقيقة.',
      en: 'The difference between acute and chronic fissures, and the treatment steps from diet and ointments to Botox and precise surgery.',
    },
    body: {
      ar: [
        { heading: 'الشرخ الحاد والمزمن', text: 'الشرخ جرح صغير في بطانة فتحة الشرج يسبب ألمًا حادًا أثناء الإخراج وبعده، وقد يصاحبه نزيف بسيط. أغلب الشروخ الحادة تلتئم خلال أسابيع، أما إذا استمر الشرخ أكثر من ستة أسابيع فيُعتبر مزمنًا.' },
        { heading: 'العلاج يبدأ دون جراحة', text: 'الألياف والسوائل لتليين البراز، والجلوس في ماء دافئ، والمراهم التي ترخي العضلة العاصرة تكفي لعلاج معظم الحالات. وفي بعض الحالات المزمنة يساعد حقن البوتوكس على التئام الشرخ.' },
        { heading: 'متى تكون الجراحة هي الحل؟', text: 'عندما لا يستجيب الشرخ المزمن للعلاج، تُجرى جراحة دقيقة لإرخاء جزء محسوب من العضلة العاصرة الداخلية، بنسب نجاح عالية مع الحفاظ على التحكم الطبيعي.' },
      ],
      en: [
        { heading: 'Acute and chronic fissures', text: 'A fissure is a small tear in the lining of the anus that causes sharp pain during and after bowel movements, sometimes with light bleeding. Most acute fissures heal within weeks; one that lasts more than six weeks is considered chronic.' },
        { heading: 'Treatment starts without surgery', text: 'Fibre and fluids to soften the stool, warm sitz baths and ointments that relax the sphincter are enough for most cases. In some chronic fissures, Botox injection helps the tear heal.' },
        { heading: 'When is surgery the answer?', text: 'When a chronic fissure does not respond, a precise operation relaxes a measured part of the internal sphincter, with high success rates while preserving normal continence.' },
      ],
    },
    takeaways: {
      ar: ['أغلب الشروخ الحادة تلتئم دون جراحة', 'الألياف والمراهم هي الخطوة الأولى', 'الجراحة الدقيقة للحالات المزمنة فقط'],
      en: ['Most acute fissures heal without surgery', 'Fibre and ointments are the first step', 'Precise surgery is only for chronic cases'],
    },
  },
  {
    slug: 'nutrition-after-cancer-surgery',
    category: 'surgical-oncology',
    image: '/images/articles/nutrition-after-cancer-surgery.webp',
    publishedAt: '2026-07-18',
    updatedAt: '2026-08-01',
    readTime: 5,
    title: {
      ar: 'التغذية والتعافي بعد جراحات الأورام',
      en: 'Nutrition and Recovery After Cancer Surgery',
    },
    excerpt: {
      ar: 'نصائح عملية للتغذية والحركة تساعد على التئام الجروح والاستعداد لأي علاج تكميلي.',
      en: 'Practical nutrition and activity tips that help wounds heal and prepare you for any further treatment.',
    },
    body: {
      ar: [
        { heading: 'البروتين أولًا', text: 'يحتاج الجسم بعد الجراحة إلى كميات أكبر من البروتين لالتئام الجروح واستعادة القوة. البيض والأسماك والدواجن والبقوليات ومنتجات الألبان مصادر ممتازة.' },
        { heading: 'الحركة المبكرة', text: 'المشي الخفيف بدءًا من يوم العملية أو اليوم التالي يقلل من الجلطات ومضاعفات الرئة، ويسرّع عودة حركة الأمعاء.' },
        { heading: 'الاستعداد للعلاج التكميلي', text: 'التغذية الجيدة والتعافي الجيد بعد الجراحة يجعلان الجسم أكثر استعدادًا لتحمل العلاج الكيميائي أو الإشعاعي إن احتاج المريض إليه.' },
      ],
      en: [
        { heading: 'Protein first', text: 'After surgery the body needs more protein to heal wounds and regain strength. Eggs, fish, poultry, legumes and dairy are excellent sources.' },
        { heading: 'Move early', text: 'Gentle walking from the day of surgery or the next day reduces clots and lung complications and speeds the return of bowel function.' },
        { heading: 'Preparing for further treatment', text: 'Good nutrition and recovery after surgery leave the body better prepared to tolerate chemotherapy or radiotherapy if needed.' },
      ],
    },
    takeaways: {
      ar: ['البروتين أساس التئام الجروح', 'المشي المبكر يقلل المضاعفات', 'التعافي الجيد يهيئ للعلاج التكميلي'],
      en: ['Protein is the basis of wound healing', 'Early walking reduces complications', 'Good recovery prepares you for further treatment'],
    },
  },
  {
    slug: 'before-cancer-surgery-checklist',
    category: 'surgical-oncology',
    image: '/images/articles/before-cancer-surgery-checklist.webp',
    publishedAt: '2026-07-02',
    updatedAt: '2026-07-20',
    readTime: 5,
    title: {
      ar: 'قبل جراحة الأورام: الفحوصات وتحديد المرحلة والتحضير',
      en: 'Before Cancer Surgery: Tests, Staging and Preparation',
    },
    excerpt: {
      ar: 'قائمة عملية بما تحتاج إلى تجهيزه قبل جراحة الأورام، من التقارير والأشعة إلى يوم العملية.',
      en: 'A practical checklist of what to prepare before cancer surgery, from reports and scans to the day itself.',
    },
    body: {
      ar: [
        { heading: 'اجمع ملفك الطبي', text: 'أحضر كل التقارير السابقة والأشعة (على أسطوانات أو روابط) وشرائح وبلوكات العينة إن وجدت، فهي ضرورية لمراجعة التشخيص وتحديد المرحلة بدقة.' },
        { heading: 'قبل أسبوع', text: 'أكمل الفحوصات المطلوبة، وراجع أدويتك مع الطبيب خاصة مسيلات الدم وأدوية السكر، وتوقف عن التدخين قدر الإمكان لتحسين التئام الجروح ووظائف الرئة.' },
        { heading: 'يوم العملية', text: 'التزم بتعليمات الصيام، واحضر في الموعد، وأزل المجوهرات والعدسات اللاصقة، ورتب لوجود مرافق معك طوال فترة الإقامة.' },
      ],
      en: [
        { heading: 'Gather your medical file', text: 'Bring all previous reports, scans (discs or links) and biopsy slides and blocks if available — they are essential for reviewing the diagnosis and staging accurately.' },
        { heading: 'One week before', text: 'Complete the required tests, review your medications with the doctor — especially blood thinners and diabetes drugs — and stop smoking if possible to improve wound healing and lung function.' },
        { heading: 'On the day', text: 'Follow the fasting instructions, arrive on time, remove jewellery and contact lenses, and arrange for a companion to stay with you during admission.' },
      ],
    },
    takeaways: {
      ar: ['أحضر كل التقارير والأشعة والعينات السابقة', 'راجع أدويتك مع الطبيب مسبقًا', 'رتب لوجود مرافق أثناء الإقامة'],
      en: ['Bring all previous reports, scans and biopsies', 'Review your medications with the doctor in advance', 'Arrange a companion during your stay'],
    },
  },
];

export const featuredArticle: Article = articles.find((a) => a.featured) ?? articles[0]!;

/** Every non-featured article, newest first — the filterable grid on /articles/. */
export const gridArticles: Article[] = articles
  .filter((a) => a.slug !== featuredArticle.slug)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
