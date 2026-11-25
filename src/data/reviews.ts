import type { Review } from './types';

/**
 * Patient testimonials.
 * ⚠️ SAMPLE content — publish only genuine reviews collected with the patients' consent.
 * (The doctor's Vezeeta profile shows a 4.5/5 rating from 77 patients — real quotes can be taken from there.)
 */
export const reviews: Review[] = [
  {
    id: 'r1',
    name: { ar: 'منى عبد الرحمن', en: 'Mona Abdelrahman' },
    procedure: { ar: 'جراحة الحفاظ على الثدي', en: 'Breast-Conserving Surgery' },
    rating: 5,
    text: {
      ar: 'من أول زيارة شرح لي الدكتور كل الخيارات بهدوء وصراحة، وطمأنني إن الحفاظ على الثدي ممكن في حالتي. العملية عدت بسلام والمتابعة كانت مستمرة في كل مرحلة.',
      en: 'From the first visit the doctor explained every option calmly and honestly, and reassured me that preserving the breast was possible in my case. Surgery went smoothly and follow-up was constant at every stage.',
    },
  },
  {
    id: 'r2',
    name: { ar: 'أحمد محمود', en: 'Ahmed Mahmoud' },
    procedure: { ar: 'استئصال أورام القولون بالمنظار', en: 'Laparoscopic Colectomy' },
    rating: 5,
    text: {
      ar: 'كنت خايف جدًا لما عرفت التشخيص، لكن الخطة كانت واضحة من البداية. العملية تمت بالمنظار وخرجت من المستشفى بعد أيام قليلة، والحمد لله النتيجة ممتازة.',
      en: 'I was terrified when I heard the diagnosis, but the plan was clear from the start. The operation was done laparoscopically, I left hospital after a few days and, thank God, the result is excellent.',
    },
  },
  {
    id: 'r3',
    name: { ar: 'خالد إبراهيم', en: 'Khaled Ibrahim' },
    procedure: { ar: 'استئصال أورام المعدة', en: 'Gastrectomy' },
    rating: 5,
    text: {
      ar: 'الدكتور نسّق مع طبيب العلاج الكيميائي قبل وبعد العملية، وكان متابع حالتي بنفسه. التزامه وأمانته في الشرح فرقوا معايا ومع أسرتي جدًا.',
      en: 'The doctor coordinated with my oncologist before and after surgery and followed my case personally. His commitment and honesty made a real difference to me and my family.',
    },
  },
  {
    id: 'r4',
    name: { ar: 'سارة يوسف', en: 'Sara Youssef' },
    procedure: { ar: 'جراحة الأورام النسائية', en: 'Gynaecological Oncology Surgery' },
    rating: 5,
    text: {
      ar: 'تعامل راقٍ وخصوصية كاملة. حسيت بالأمان من أول لحظة، والفريق كله كان داعم ومتعاون. شكرًا على الإنسانية قبل المهارة.',
      en: 'Refined care and complete privacy. I felt safe from the first moment and the whole team was supportive. Thank you for the humanity as much as the skill.',
    },
  },
  {
    id: 'r5',
    name: { ar: 'محمد سعيد', en: 'Mohamed Saeed' },
    procedure: { ar: 'استئصال جزئي للكبد', en: 'Partial Hepatectomy' },
    rating: 5,
    text: {
      ar: 'قالولي إن الحالة صعبة، لكن الدكتور درس الأشعة بالتفصيل وشرح لنا كل خطوة. العملية نجحت والمتابعة بعدها كانت دقيقة جدًا.',
      en: 'I was told my case was difficult, but the doctor studied the scans in detail and explained every step to us. The operation succeeded and the follow-up afterwards was meticulous.',
    },
  },
  {
    id: 'r6',
    name: { ar: 'نهى كمال', en: 'Noha Kamal' },
    procedure: { ar: 'استئصال الغدة الدرقية', en: 'Thyroidectomy' },
    rating: 5,
    text: {
      ar: 'كنت قلقة على صوتي وشكل الجرح، لكن الحمد لله صوتي سليم والجرح بالكاد يظهر. دكتور محترم يشرح بالتفصيل ويطمئنك.',
      en: 'I was worried about my voice and the scar, but my voice is perfect and the scar is barely visible. A respectful doctor who explains in detail and reassures you.',
    },
  },
  {
    id: 'r7',
    name: { ar: 'عمرو حسن', en: 'Amr Hassan' },
    procedure: { ar: 'استئصال أورام المستقيم', en: 'Rectal Cancer Surgery' },
    rating: 5,
    text: {
      ar: 'أكتر حاجة كنت خايف منها هي الكيس الدائم، والدكتور قدر يحافظ على العضلة العاصرة. ممتن جدًا للخبرة والاهتمام.',
      en: 'My biggest fear was a permanent stoma, and the doctor managed to preserve the sphincter. Deeply grateful for his expertise and care.',
    },
  },
  {
    id: 'r8',
    name: { ar: 'هبة مصطفى', en: 'Heba Mostafa' },
    procedure: { ar: 'علاج البواسير بالليزر', en: 'Laser Haemorrhoidoplasty' },
    rating: 5,
    text: {
      ar: 'أجلت العلاج سنين بسبب الإحراج والخوف من الألم. التعامل كان راقي جدًا، والليزر كان أسهل بكتير مما توقعت، ورجعت شغلي بعد أيام.',
      en: 'I put off treatment for years out of embarrassment and fear of pain. The care was very discreet, the laser was far easier than I expected, and I was back at work in days.',
    },
  },
  {
    id: 'r9',
    name: { ar: 'ياسر عادل', en: 'Yasser Adel' },
    procedure: { ar: 'استئصال المرارة بالمنظار', en: 'Laparoscopic Cholecystectomy' },
    rating: 5,
    text: {
      ar: 'عملية المرارة بالمنظار تمت بسرعة وخرجت تاني يوم. العيادة منظمة والمتابعة على الواتساب ممتازة.',
      en: 'My laparoscopic gallbladder surgery was quick and I went home the next day. The clinic is organised and WhatsApp follow-up was excellent.',
    },
  },
];
