import { AdminShell } from "@/components/layout/AdminShell";
import { requireAdminSession } from "@/lib/admin-auth";
import { listBookings } from "@/lib/repository";
import { BookingsTable } from "@/components/admin/BookingsTable";

export default async function AdminBookingsPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await requireAdminSession();
  const params = await searchParams;
  const status = typeof params.status === "string" ? params.status : "ALL";

  const bookings = await listBookings({ status });

  return (
    <AdminShell email={session.email}>
      <div className="section-shell space-y-6 py-10 md:py-12">
        <div className="space-y-2">
          <p className="section-label">Booking Management</p>
          <h1 className="font-display text-headline font-extrabold text-ink">
            Bookings
          </h1>
        </div>
        <BookingsTable bookings={bookings} />
      </div>
    </AdminShell>
  );
}
