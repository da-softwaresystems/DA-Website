import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { accountDeletion } from "@/data/legal";

export const metadata: Metadata = {
  title: "Account Deletion",
  description: "Request deletion of your Study Library Manager account and associated data.",
  alternates: { canonical: "/account-deletion" },
};

export default function AccountDeletionPage() {
  return <LegalPage document={accountDeletion} />;
}
