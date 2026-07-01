import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const userId = user?.id;

  return <DashboardClient userId={userId} />;
}
