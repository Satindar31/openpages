import SettingsForm from "@/components/dashboard/settingsForm";
import { auth } from "@clerk/nextjs/server";

export default function SettingsPage() {
  const { orgId } = auth();

  return <SettingsForm orgId={orgId!} />;
}
