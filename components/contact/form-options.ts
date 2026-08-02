export const INQUIRY_TYPES = [
  { value: "general", label: "General Inquiry" },
  { value: "new-project", label: "New Project" },
  { value: "software-development", label: "Software Development" },
  { value: "ai-consultation", label: "AI Consultation" },
  { value: "cloud-services", label: "Cloud Services" },
  { value: "business-automation", label: "Business Automation" },
  { value: "healthcare-solutions", label: "Healthcare Solutions" },
  { value: "technical-support", label: "Technical Support" },
  { value: "internship", label: "Internship Program" },
  { value: "career", label: "Career Opportunity" },
  { value: "partnership", label: "Partnership" },
  { value: "business-collaboration", label: "Business Collaboration" },
  { value: "other", label: "Other" },
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number]["value"];

export const PROJECT_INQUIRY_TYPES: readonly InquiryType[] = [
  "new-project",
  "software-development",
  "ai-consultation",
  "cloud-services",
  "business-automation",
  "healthcare-solutions",
  "partnership",
  "business-collaboration",
];

export const PREFERRED_CONTACT_METHODS = ["Email", "Phone", "WhatsApp", "Google Meet"] as const;

export const BUDGET_RANGES = ["Under ₹50K", "₹50K – ₹2L", "₹2L – ₹10L", "₹10L+", "Let's Discuss"] as const;

export const TIMELINES = ["Immediate", "Within 1 Month", "1–3 Months", "3–6 Months", "Flexible"] as const;

export const PRIORITIES = ["Low", "Medium", "High", "Critical"] as const;

export const SKILLS = [
  "Java",
  "Spring Boot",
  "React",
  "Next.js",
  "Flutter",
  "Python",
  "AI / Machine Learning",
  "SQL",
  "Firebase",
  "Git & GitHub",
  "Docker",
  "Other",
] as const;

export const MESSAGE_MAX_LENGTH = 1000;

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  inquiryType: InquiryType;
  subject: string;
  message: string;
  preferredContact: string;
  budget: string;
  timeline: string;
  productName: string;
  priority: string;
  yearsExperience: string;
  careerLinkedin: string;
  college: string;
  degree: string;
  graduationYear: string;
  skills: string[];
  portfolio: string;
  internLinkedin: string;
  whyIntern: string;
  consent: boolean;
};

export const initialFormValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  inquiryType: "general",
  subject: "",
  message: "",
  preferredContact: "Email",
  budget: "",
  timeline: "",
  productName: "",
  priority: "",
  yearsExperience: "",
  careerLinkedin: "",
  college: "",
  degree: "",
  graduationYear: "",
  skills: [],
  portfolio: "",
  internLinkedin: "",
  whyIntern: "",
  consent: false,
};

export type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+]?[\d\s-]{7,15}$/;

export function validateContactForm(values: ContactFormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone)) errors.phone = "Please enter a valid phone number.";
  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  if (!values.message.trim()) errors.message = "Please tell us a little more.";
  else if (values.message.length > MESSAGE_MAX_LENGTH) errors.message = `Message must be under ${MESSAGE_MAX_LENGTH} characters.`;
  if (!values.consent) errors.consent = "Please confirm you're okay being contacted.";

  return errors;
}
