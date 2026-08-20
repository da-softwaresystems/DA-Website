export type LegalBlock =
  | { kind: "text"; body: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "link"; href: string; label: string }
  | { kind: "note"; title: string; body?: string; email?: string; items?: readonly string[] };

export type LegalIcon =
  | "database"
  | "device"
  | "usage"
  | "cloud"
  | "shield"
  | "plug"
  | "key"
  | "control"
  | "children"
  | "refresh"
  | "mail"
  | "send"
  | "trash"
  | "archive"
  | "clock";

export type LegalSection = {
  id: string;
  title: string;
  icon: LegalIcon;
  blocks: readonly LegalBlock[];
};

export type LegalDocument = {
  eyebrow: string;
  title: string;
  subtitle: string;
  effectiveDate: string;
  intro: readonly string[];
  sections: readonly LegalSection[];
  cta: { title: string; description: string };
};

const supportEmail = "dasoftwaresystems@gmail.com";

export const privacyPolicy: LegalDocument = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  subtitle: "Study Library Manager application",
  effectiveDate: "January 1, 2026",
  intro: [
    "DA Software Systems built the Study Library Manager application as a commercial service. It is intended for library administrators and staff to manage students, seat allocations, and payments within a study library environment.",
    "This page explains how we collect, use, and protect information when the application is used.",
  ],
  sections: [
    {
      id: "information-we-collect",
      title: "Information we collect",
      icon: "database",
      blocks: [
        { kind: "text", body: "The application may collect the following information:" },
        {
          kind: "list",
          items: [
            "Student names",
            "Phone numbers",
            "Seat allocation information",
            "Payment records",
            "Library membership details",
          ],
        },
        { kind: "text", body: "This information is entered by the library administrator for the purpose of managing library operations." },
      ],
    },
    {
      id: "device-information",
      title: "Device information",
      icon: "device",
      blocks: [
        { kind: "text", body: "We may collect limited technical information about the device running the application:" },
        { kind: "list", items: ["Device model", "Operating system version", "Application version"] },
        { kind: "text", body: "This helps us improve application reliability and performance." },
      ],
    },
    {
      id: "how-we-use-information",
      title: "How we use information",
      icon: "usage",
      blocks: [
        {
          kind: "list",
          items: [
            "Manage student records",
            "Track seat allocation",
            "Record payments",
            "Provide library management features",
            "Improve application performance",
          ],
        },
      ],
    },
    {
      id: "data-storage",
      title: "Data storage",
      icon: "cloud",
      blocks: [
        { kind: "text", body: "Application data may be stored securely using cloud infrastructure. The application may use backend services such as Google Firebase for data storage and synchronisation." },
        { kind: "text", body: "Library administrators remain responsible for the data they manage within the application." },
      ],
    },
    {
      id: "data-security",
      title: "Data security",
      icon: "shield",
      blocks: [
        { kind: "text", body: "We take reasonable measures to protect stored information. However, no method of transmission over the Internet or method of electronic storage is completely secure, and we cannot guarantee absolute security." },
      ],
    },
    {
      id: "third-party-services",
      title: "Third-party services",
      icon: "plug",
      blocks: [
        { kind: "text", body: "The application may use third-party services to support its functionality:" },
        { kind: "list", items: ["Google Firebase — cloud database and backend infrastructure"] },
        { kind: "text", body: "These services operate under their own privacy policies." },
      ],
    },
    {
      id: "application-permissions",
      title: "Application permissions",
      icon: "key",
      blocks: [
        { kind: "text", body: "The application may request the following permissions:" },
        {
          kind: "list",
          items: [
            "Internet access — required for data synchronisation",
            "Notifications — used to provide updates or reminders",
          ],
        },
      ],
    },
    {
      id: "user-control",
      title: "User control",
      icon: "control",
      blocks: [
        { kind: "text", body: "Library administrators have full control over the information stored within the application and can update or delete records at any time." },
        { kind: "text", body: "To delete an account together with all of its associated data, follow the process on our account deletion page." },
        { kind: "link", href: "/account-deletion", label: "Request account deletion" },
      ],
    },
    {
      id: "childrens-privacy",
      title: "Children's privacy",
      icon: "children",
      blocks: [
        { kind: "text", body: "This application is not intended for children under the age of 13. We do not knowingly collect personal information from children." },
      ],
    },
    {
      id: "changes-to-this-policy",
      title: "Changes to this policy",
      icon: "refresh",
      blocks: [
        { kind: "text", body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page along with a revised effective date." },
      ],
    },
    {
      id: "contact-us",
      title: "Contact us",
      icon: "mail",
      blocks: [
        { kind: "text", body: "If you have any questions about this Privacy Policy, please contact DA Software Systems." },
        { kind: "note", title: "Developer", body: "DA Software Systems", email: supportEmail },
      ],
    },
  ],
  cta: {
    title: "Questions about your data?",
    description: "Reach out and we will get back to you, usually within one business day.",
  },
};

export const accountDeletion: LegalDocument = {
  eyebrow: "Legal",
  title: "Account Deletion Request",
  subtitle: "Study Library Manager application",
  effectiveDate: "January 1, 2026",
  intro: [
    "This page explains how users of the Study Library Manager application can request deletion of their account and the data associated with it.",
    "The application is developed and maintained by DA Software Systems.",
  ],
  sections: [
    {
      id: "how-to-request-deletion",
      title: "How to request deletion",
      icon: "send",
      blocks: [
        { kind: "text", body: "To permanently delete your account and all associated data, send a request to our support team by email." },
        {
          kind: "note",
          title: "Send your request to",
          email: supportEmail,
          body: "Please include the following information:",
          items: [
            "Your registered email address",
            "Your library or organisation name",
            "Optionally, your reason for deletion",
          ],
        },
      ],
    },
    {
      id: "data-that-will-be-deleted",
      title: "Data that will be deleted",
      icon: "trash",
      blocks: [
        { kind: "text", body: "Once the request is verified and approved, the following information is permanently removed from our systems:" },
        {
          kind: "list",
          items: [
            "Administrator account information",
            "Student records",
            "Seat allocation details",
            "Payment and transaction records",
            "Library configuration settings",
          ],
        },
      ],
    },
    {
      id: "data-that-may-be-retained",
      title: "Data that may be retained",
      icon: "archive",
      blocks: [
        { kind: "text", body: "Some limited information may be retained for a short period where we are required to do so, for:" },
        {
          kind: "list",
          items: [
            "Legal compliance",
            "Fraud prevention and security monitoring",
            "Financial recordkeeping required by law",
          ],
        },
      ],
    },
    {
      id: "processing-time",
      title: "Processing time",
      icon: "clock",
      blocks: [
        { kind: "text", body: "Account deletion requests are typically processed within 5–7 business days after the request has been verified." },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      icon: "mail",
      blocks: [
        { kind: "text", body: "If you have any questions about account deletion or your data, please contact us." },
        { kind: "note", title: "Developer", body: "DA Software Systems", email: supportEmail },
      ],
    },
  ],
  cta: {
    title: "Ready to delete your account?",
    description: "Email us from your registered address and we will confirm once the deletion is complete.",
  },
};
