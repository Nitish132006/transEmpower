// ServicesData.ts
import { Stethoscope, Heart, Users, Briefcase, GraduationCap, Shield, Phone, AlertTriangle, Scale, FileText, Home } from 'lucide-react';

export const modules: any = {
  health: [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Insurance Hub",
      description: "Provides comprehensive gender-affirming surgery insurance coverage including pre-authorization, claims assistance, and coverage verification. This ensures transgender individuals can access necessary medical procedures without financial or bureaucratic barriers.",
      features: ["Pre-authorization support", "Claims processing", "Provider network", "Coverage verification"]
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "HealWell",
      description: "Offers post-surgery counseling, mental health support, and rehabilitation guidance. Supports emotional and physical recovery, helping transgender individuals navigate healing with professional care and peer support.",
      features: ["Licensed therapists", "Support groups", "Recovery planning", "24/7 helpline"]
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "CareConnect+",
      description: "A directory of verified trans-friendly doctors, clinics, and healthcare providers. Empowers transgender individuals to make informed choices while ensuring safe, respectful, and inclusive care.",
      features: ["Verified providers", "Reviews & ratings", "Appointment booking", "Specialist referrals"]
    }
  ],
  safety: [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "SOS & Safe Shelter",
      description: "Provides immediate emergency shelters and NGO contacts for safety and protection. Aimed at transgender individuals facing threats or unsafe situations, ensuring rapid support and secure temporary housing.",
      features: ["24/7 emergency line", "Safe shelter network", "Crisis intervention", "Temporary housing"]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Violence Reporting Tool",
      description: "Secure platform to report harassment, discrimination, or violence. Offers guidance, legal resources, and evidence collection to help transgender individuals pursue justice safely.",
      features: ["Anonymous reporting", "Legal guidance", "Evidence collection", "Advocacy support"]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Legal Support Directory",
      description: "Access to low-cost and free lawyers specializing in LGBTQ+ rights. Helps transgender individuals navigate legal challenges, secure representation, and protect their rights effectively.",
      features: ["Pro bono lawyers", "Legal consultations", "Document assistance", "Court representation"]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Policy Updates",
      description: "Provides real-time updates on laws, government schemes, and policy changes affecting transgender rights. Ensures individuals are informed and empowered to advocate for themselves.",
      features: ["Real-time updates", "Policy analysis", "Rights information", "Advocacy alerts"]
    }
  ],
  career: [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Career Path",
      description: "Job listings and career guidance tailored for literate transgender individuals, matching skills and qualifications to opportunities. Supports resume building, interview prep, and networking.",
      features: ["Qualification-based jobs", "Resume & interview prep", "Networking events", "Skill building"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Skill Hunt",
      description: "Skill-based job opportunities for school/college dropouts, such as tailoring, culinary, and beauty services. Focused on inclusive employment and community support.",
      features: ["Tailoring", "Culinary services", "Beauty services", "Community-based support"]
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Freelancing & Gig",
      description: "Partnerships with delivery and e-commerce platforms like Zomato, Swiggy, Zepto for flexible freelance work. Enables transgender individuals to earn income on their own schedule.",
      features: ["Food delivery", "E-commerce delivery", "Task-based gigs", "Flexible timings"]
    }
  ],
  edugo: [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Scholarships",
      description: "Financial aid for school, college, or skill-based courses. Supports transgender learners to pursue education without financial barriers.",
      features: ["Merit scholarships", "Need-based aid", "Grants", "Skill training funds"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Learn in Web",
      description: "Interactive online courses for professional and personal skill development. Helps transgender individuals gain coding, design, marketing, and other marketable skills.",
      features: ["Coding", "Design", "Marketing", "Professional skills"]
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Exam Prepare",
      description: "Resources and mock tests for banking, government, and competitive exams. Ensures transgender individuals have equal access to exam preparation and career opportunities.",
      features: ["Study material", "Mock tests", "Exam strategies", "Coaching support"]
    },
    {
      icon: <Stethoscope className="w-6 h-6" />,
      title: "PridePath",
      description: "Mentorship and career guidance from experienced transgender community members. Supports skill guidance, networking, and personal development.",
      features: ["1-on-1 mentorship", "Career counseling", "Skill guidance", "Networking opportunities"]
    }
  ],
  shelter: [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Hostels",
      description: "Verified, trans-friendly hostels for men and women. Provides safe and inclusive living spaces for transgender individuals.",
      features: ["Men hostels", "Women hostels", "Shared rooms", "Secure facilities"]
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Rental Homes",
      description: "Verified landlords offering accommodations to transgender tenants. Encourages inclusivity and safety in long-term housing options.",
      features: ["Private apartments", "Shared homes", "Verified landlords", "Inclusive environment"]
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "Hotels",
      description: "Trans-friendly hotels for short-term stays. Ensures safe, welcoming environments for travelers and visitors.",
      features: ["Budget hotels", "Premium hotels", "Verified listings", "Safe environment"]
    }
  ]
};

export const moduleColors: any = {
  health: 'from-blue-500 to-blue-400',
  safety: 'from-red-500 to-red-400',
  career: 'from-teal-500 to-teal-400',
  edugo: 'from-green-500 to-green-400',
  shelter: 'from-purple-500 to-purple-400'
};

export const moduleNames: any = {
  health: 'Health',
  safety: 'Safety',
  career: 'Career Path',
  edugo: 'EduGo',
  shelter: 'Shelter+'
};
