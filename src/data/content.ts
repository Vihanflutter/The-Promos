export interface Founder {
  id: string;
  name: string;
  roleBadge: string;
  credentials: string;
  degreeLine: string;
  bio: string;
  creatorHighlight: string;
  image: string;
  heroImageStyle: 'cutout' | 'framed';
  heroViews: string;
  heroCreatorTitle: string;
  heroCreatorSubtitle: string;
  instagramHandle: string;
  socialLinks: Array<{ label: string; sublabel: string; href: string }>;
}

export interface CoreTeamMember {
  id: string;
  role: string;
  subtitle: string;
  name: string;
  initials: string;
  image?: string;
  bio: string;
  detailBio?: string;
}

export interface ClientResult {
  id: string;
  handle: string;
  displayName: string;
  profileImage: string;
  milestoneValue: string;
  milestoneSubtext?: string;
}

export interface ReelItem {
  id: string;
  shortcode: string;
  url: string;
  metricBadge: string;
  likesLabel: string;
  commentsLabel: string;
  title: string;
  creatorHandle: string;
  niche: string;
  thumbnail: string;
}

export interface ProtocolStep {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface PackagePlan {
  id: string;
  name: string;
  tagline: string;
  volume: string;
  cadence: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const LOGO_URL = '/assets/aistudio/The_Promos_Megaphone_Logo_9b1c67d6.png';

export const FOUNDERS: Founder[] = [
  {
    id: 'dr-sapana',
    name: 'Dr. Sapana Agarwal',
    roleBadge: 'FOUNDER',
    credentials: 'Founder · M.Sc., DNHE, INFS',
    degreeLine: 'M.Sc., DNHE, INFS',
    bio: 'Dietitian, nutritionist and psychologist. Director of Shri Giri Pain Management and Health Care Centre.',
    creatorHighlight:
      'Co-creator behind Doctor Dietitian Duo (93K+ followers) and Health Beyond Medicine, blending audience psychology with high-trust wellness storytelling.',
    image: '/assets/dr_sapana_cutout.png',
    heroImageStyle: 'cutout',
    heroViews: '50M+',
    heroCreatorTitle: 'Creator',
    heroCreatorSubtitle: 'Personal Branding Expert',
    instagramHandle: '@doctordietitianduo',
    socialLinks: [
      {
        label: '@doctordietitianduo',
        sublabel: '93K+ Followers · Creator Page',
        href: 'https://www.instagram.com/doctordietitianduo/',
      },
      {
        label: '@hbmbydoctordietitianduo',
        sublabel: 'Health Beyond Medicine',
        href: 'https://www.instagram.com/hbmbydoctordietitianduo/',
      },
    ],
  },
  {
    id: 'dr-anshuman',
    name: 'Dr. Anshuman Agarwal',
    roleBadge: 'FOUNDER',
    credentials: 'Founder · MBBS, MD, FIPM',
    degreeLine: 'MBBS, MD, FIPM',
    bio: 'Pain physician, anesthesiologist and biology educator. Functional Head at Soching Education and founder of Shri Giri Pain Management Center, Kota.',
    creatorHighlight:
      'Co-creator behind Doctor Dietitian Duo (93K+ followers) and Health Beyond Medicine, turning deep medical expertise into viral, credible health content.',
    image: '/assets/aistudio/Dr_ansh-2_d2975b31.png',
    heroImageStyle: 'cutout',
    heroViews: '50M+',
    heroCreatorTitle: 'Educator & MD',
    heroCreatorSubtitle: 'Personal Branding Expert',
    instagramHandle: '@hbmbydoctordietitianduo',
    socialLinks: [
      {
        label: '@doctordietitianduo',
        sublabel: '93K+ Followers · Creator Page',
        href: 'https://www.instagram.com/doctordietitianduo/',
      },
      {
        label: '@hbmbydoctordietitianduo',
        sublabel: 'Health Beyond Medicine',
        href: 'https://www.instagram.com/hbmbydoctordietitianduo/',
      },
    ],
  },
];

export const CORE_TEAM: CoreTeamMember[] = [
  {
    id: 'deepak-singh-chauhan',
    role: 'Creative Head & Branding Expert',
    subtitle: 'The Creative Mind · 6+ Years Experience',
    name: 'Deepak Singh Chauhan',
    initials: 'DS',
    image: '/assets/aistudio/image_145dfea7.png',
    bio: 'The creative mind with 6+ years in content and social media, scaling digital brands through strategic storytelling. From refining scripts to approving final edits, nothing goes live without his eye on strategy and quality.',
  },
  {
    id: 'aakansha-agarwal',
    role: 'Content Lead & Presenter',
    subtitle: 'Biology Faculty · Ex-Motion Education',
    name: 'Aakansha Agarwal',
    initials: 'AA',
    image: '/assets/aistudio/image_30e4c3dc.png',
    bio: 'The presenter. A Biology faculty, model, and lead content creator with 4+ years of experience, including as an ex-faculty at Motion Education. A former Miss Iconic Rajasthan finalist, she brings together subject expertise, confidence on camera, and strong content presence.',
  },
  {
    id: 'amit-agrawal',
    role: 'Marketing Head',
    subtitle: 'The Strategist · MBA Marketing · 10+ Years',
    name: 'Amit Agrawal',
    initials: 'AA',
    bio: 'The strategist. An MBA in Marketing with 10+ years of experience in advertising, events, and integrated marketing, he turns brand strategies into business growth.',
  },
];

export const CLIENT_RESULTS: ClientResult[] = [
  {
    id: 'doctordietitianduo',
    handle: 'doctordietitianduo',
    displayName: 'Doctor Dietitian Duo',
    profileImage: '/assets/aistudio/Screenshot_2026-11-24_155405_aa5cc506.png',
    milestoneValue: '~93K Followers',
  },
  {
    id: 'sochingeducation',
    handle: 'sochingeducation',
    displayName: 'Soching Education',
    profileImage: '/assets/aistudio/Screenshot_2026-11-24_155553_6654e539.png',
    milestoneValue: '50.2K Followers',
    milestoneSubtext: 'in just 1 year',
  },
  {
    id: 'hbmbydoctordietitianduo',
    handle: 'hbmbydoctordietitianduo',
    displayName: 'Health Beyond Medicine By Doctor Dietitian Duo',
    profileImage: '/assets/aistudio/Screenshot_2026-11-24_155703_081cd9f4.png',
    milestoneValue: '~3.3K Followers',
    milestoneSubtext: 'in 2 months',
  },
];

export const REELS: ReelItem[] = [
  {
    id: 'DTr1ZLwEbyL',
    shortcode: 'DTr1ZLwEbyL',
    url: 'https://www.instagram.com/p/DTr1ZLwEbyL/',
    metricBadge: '2.6M views',
    likesLabel: '57K likes',
    commentsLabel: '146 comments',
    title: 'Draw Female Reproductive System Diagram in 10 Seconds',
    creatorHandle: '@sochingeducation',
    niche: 'NEET Biology',
    thumbnail: '/assets/reels/DTr1ZLwEbyL.jpg',
  },
  {
    id: 'DY3_ZIrSiS8',
    shortcode: 'DY3_ZIrSiS8',
    url: 'https://www.instagram.com/p/DY3_ZIrSiS8/',
    metricBadge: '1.8M views',
    likesLabel: '57K likes',
    commentsLabel: '326 comments',
    title: 'Write Any Chemical Formula in Seconds!',
    creatorHandle: '@sochingeducation',
    niche: 'Chemistry & IUPAC',
    thumbnail: '/assets/reels/DY3_ZIrSiS8.jpg',
  },
  {
    id: 'DXowftZEsgD',
    shortcode: 'DXowftZEsgD',
    url: 'https://www.instagram.com/p/DXowftZEsgD/',
    metricBadge: '1.5M views',
    likesLabel: '49K likes',
    commentsLabel: '242 comments',
    title: 'Difference Between Antigen, Antibodies, Antibiotics & Antidote',
    creatorHandle: '@sochingeducation',
    niche: 'NEET Biology',
    thumbnail: '/assets/reels/DXowftZEsgD.jpg',
  },
  {
    id: 'DXHfxJvE6k2',
    shortcode: 'DXHfxJvE6k2',
    url: 'https://www.instagram.com/p/DXHfxJvE6k2/',
    metricBadge: '1.9M views',
    likesLabel: '24K likes',
    commentsLabel: '810 comments',
    title: 'नेता और बीवी — Doctor Couple Comedy',
    creatorHandle: '@doctordietitianduo',
    niche: 'Creator Lifestyle',
    thumbnail: '/assets/reels/DXHfxJvE6k2.jpg',
  },
  {
    id: 'DY2AZAphjiS',
    shortcode: 'DY2AZAphjiS',
    url: 'https://www.instagram.com/p/DY2AZAphjiS/',
    metricBadge: '3.4M views',
    likesLabel: '110K likes',
    commentsLabel: '131 comments',
    title: 'Complete Antibodies in 30 Seconds | NEET Biology',
    creatorHandle: '@sochingeducation',
    niche: 'NEET Biology',
    thumbnail: '/assets/reels/DY2AZAphjiS.jpg',
  },
  {
    id: 'C6q3FLGPQv0',
    shortcode: 'C6q3FLGPQv0',
    url: 'https://www.instagram.com/p/C6q3FLGPQv0/',
    metricBadge: '2.4M views',
    likesLabel: '71K likes',
    commentsLabel: '312 comments',
    title: 'Doctor Dietitian Duo Viral Reel',
    creatorHandle: '@doctordietitianduo',
    niche: 'Creator Lifestyle',
    thumbnail: '/assets/reels/C6q3FLGPQv0.jpg',
  },
  {
    id: 'CxW7XHZPaPE',
    shortcode: 'CxW7XHZPaPE',
    url: 'https://www.instagram.com/p/CxW7XHZPaPE/',
    metricBadge: '1.1M views',
    likesLabel: '30K likes',
    commentsLabel: '86 comments',
    title: 'Esa Kya Maang Liya Maine',
    creatorHandle: '@doctordietitianduo',
    niche: 'Couple Comedy',
    thumbnail: '/assets/reels/CxW7XHZPaPE.jpg',
  },
  {
    id: 'DdoedvDNjpi',
    shortcode: 'DdoedvDNjpi',
    url: 'https://www.instagram.com/p/DdoedvDNjpi/',
    metricBadge: '256K views',
    likesLabel: '3,738 likes',
    commentsLabel: '113 comments',
    title: 'कोलेस्ट्रॉल के 5 लक्षण — 5 Signs of High Cholesterol',
    creatorHandle: '@hbmbydoctordietitianduo',
    niche: 'Medical Authority',
    thumbnail: '/assets/reels/DdoedvDNjpi.jpg',
  },
  {
    id: 'Dd_pn4XB4yq',
    shortcode: 'Dd_pn4XB4yq',
    url: 'https://www.instagram.com/p/Dd_pn4XB4yq/',
    metricBadge: '218K views',
    likesLabel: '3,029 likes',
    commentsLabel: '7 comments',
    title: 'बच्चे के गले में कुछ अटक जाए तो तुरंत क्या करें?',
    creatorHandle: '@hbmbydoctordietitianduo',
    niche: 'Medical Authority',
    thumbnail: '/assets/reels/Dd_pn4XB4yq.jpg',
  },
  {
    id: 'DehJvKXqfMF',
    shortcode: 'DehJvKXqfMF',
    url: 'https://www.instagram.com/p/DehJvKXqfMF/',
    metricBadge: '126K views',
    likesLabel: '4,572 likes',
    commentsLabel: '9 comments',
    title: '5 Foods for High Cholesterol',
    creatorHandle: '@hbmbydoctordietitianduo',
    niche: 'Health & Nutrition',
    thumbnail: '/assets/reels/DehJvKXqfMF.jpg',
  },
];

export const PROTOCOL_STEPS: ProtocolStep[] = [
  {
    number: '01',
    title: 'Deep-Dive Research',
    description:
      'We analyze competitors, find gaps in your niche and study the patterns behind high-performing reels to shape your content strategy.',
    image: '/assets/aistudio/01_Deep_Dive_Research_796934e7.PNG',
    imageAlt: 'The Promos strategy team conducting competitor and niche research at desktop workstation',
  },
  {
    number: '02',
    title: 'Viral Scripting',
    description:
      'We write 25–30 hook-led scripts designed to catch attention in the first few seconds and keep viewers watching.',
    image: '/assets/aistudio/02_Viral_Scripting_7df74f2b.png',
    imageAlt: 'Creative strategist writing hook-led short-form video scripts on tablet',
  },
  {
    number: '03',
    title: 'Guided Shooting',
    description:
      'Record in just two days a month. We prepare the shot list, direct each take and guide you through delivery.',
    image: '/src/assets/images/protocol_guided_shooting_1795587735354.jpg',
    imageAlt: 'Director and camera crew guiding a founder during a studio video shoot',
  },
  {
    number: '04',
    title: 'High-Retention Editing',
    description:
      'Our editors use high-retention pacing, crisp captions and contextual b-roll to hold attention and keep your message clear.',
    image: '/assets/aistudio/04_High-Retention_Editing_cc51f2f5.png',
    imageAlt: 'Video editor color-grading and cutting a high-retention vertical reel in Premiere Pro',
  },
  {
    number: '05',
    title: 'Strategic Posting',
    description:
      'We handle uploads, captions, hashtags, search optimisation and publishing times for each platform.',
    image: '/assets/aistudio/05_Strategic_Posting_1e5815bb.png',
    imageAlt: 'Optimized vertical health reel prepared for publishing on smartphone screen',
  },
  {
    number: '06',
    title: 'Growth Management',
    description:
      'We manage your community, reply to comments and use DM automation to follow up with interested leads.',
    image: '/src/assets/images/protocol_growth_management_1795587733210.jpg',
    imageAlt: 'Agency growth team reviewing engagement analytics and community growth strategy',
  },
];

export const PACKAGES: PackagePlan[] = [
  {
    id: 'launch',
    name: 'Complete Launch',
    tagline: 'Build a regular presence.',
    volume: '4 reels + 6 posts',
    cadence: 'per month · every third day',
    features: ['Strategy', 'Scripting', 'Shooting', 'Editing', 'Posting'],
    ctaLabel: 'Ask about Launch',
  },
  {
    id: 'momentum',
    name: 'Complete Momentum',
    tagline: 'Keep your audience engaged.',
    volume: '6 reels + 10 posts',
    cadence: 'per month · every alternate day',
    features: ['Strategy', 'Scripting', 'Shooting', 'Editing', 'Posting'],
    ctaLabel: 'Ask about Momentum',
    featured: true,
  },
  {
    id: 'spotlight',
    name: 'Complete Spotlight',
    tagline: 'Show up every day.',
    volume: '10 reels + 20 posts',
    cadence: 'per month · every day',
    features: ['Strategy', 'Scripting', 'Shooting', 'Editing', 'Posting'],
    ctaLabel: 'Ask about Spotlight',
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'How much time do I need to commit each month?',
    answer:
      'Only two focused shooting days per month (roughly 4–5 hours total). Our team handles deep-dive research, scripting, shoot direction, editing, thumbnails, captions, and publishing so your calendar stays protected.',
  },
  {
    question: 'Why work with The Promos instead of hiring an in-house editor?',
    answer:
      'An in-house editor only cuts footage—you still have to research trends, write hooks, direct shoots, design graphics, and manage posting. With The Promos, you get a complete specialist pod (strategist, scriptwriter, director, senior editor, and growth manager) at a fraction of the overhead.',
  },
  {
    question: 'Do you work with doctors, educators, and founders outside Kota?',
    answer:
      'Yes. While our founders and core studio are rooted in Kota, Rajasthan, we partner with doctors, coaching institutes, entrepreneurs, and creators across India—offering both on-location shoots and structured remote guided recording workflows.',
  },
  {
    question: 'What if I feel camera-shy or have never recorded reels before?',
    answer:
      'Most of our highest-performing clients started with zero camera experience. We write natural spoken-word scripts tailored to your voice and coach your pacing, framing, and delivery line-by-line during every shoot.',
  },
  {
    question: 'How do you measure success beyond vanity views?',
    answer:
      'Views open the door, but authority and inbound demand pay the bills. We track watch-time retention, profile visits, saves, shares, DM inquiries, and qualified leads generated from your content every month.',
  },
];
