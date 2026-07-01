import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";

export async function NavbarWrapper() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = supabase
    ? await supabase.auth.getUser()
    : { data: { user: null } };

  return (
    <Navbar
      isAuthenticated={!!user}
      userEmail={user?.email ?? null}
    />
  );
}
