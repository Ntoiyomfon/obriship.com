import Link from "next/link";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function BookPage() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { user },
  } = supabase
    ? await supabase.auth.getUser()
    : { data: { user: null } };

  return (
    <main className="bg-[--surface] py-8">
      <div className="section-shell">
        {user && (
          <div className="mb-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-[--ink-muted] hover:text-[--ink] transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        )}
        <BookingFlow />
      </div>
    </main>
  );
}
