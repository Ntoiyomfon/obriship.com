import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { MobileDashboardNav } from "@/components/layout/MobileDashboardNav";
import { Sidebar } from "@/components/layout/Sidebar";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user }
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
  const email = user?.email ?? "Signed in user";
  const userId = user?.id;

  return (
    <main className="min-h-dvh bg-[--surface] lg:flex">
      <Sidebar email={email} />
      <div className="flex-1 px-5 pb-24 pt-8 sm:px-8 md:pb-8 lg:px-10">
        <div className="mx-auto max-w-[1200px] space-y-8">
          <DashboardClient userId={userId} />
        </div>
      </div>
      <MobileDashboardNav />
    </main>
  );
}
