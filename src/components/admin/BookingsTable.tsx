"use client";

import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import type { Database } from "@/types/database.types";

type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];

function formatDate(dateString: string | null) {
  if (!dateString) return "—";
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(dateString));
}

function statusBadge(status: string) {
  switch (status) {
    case "pending":
      return (
        <Badge className="bg-[--freight-light] text-[--warning] hover:bg-[--freight-light]">
          Pending
        </Badge>
      );
    case "processing":
      return (
        <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50">
          Processing
        </Badge>
      );
    case "dispatched":
      return (
        <Badge className="bg-green-50 text-[--success] hover:bg-green-50">
          Dispatched
        </Badge>
      );
    default:
      return <Badge>{status}</Badge>;
  }
}

function getSenderName(sender: unknown): string {
  const s = sender as Record<string, string> | null;
  return s?.name ?? s?.full_name ?? s?.firstName ?? "Unknown";
}

function getSenderCountry(sender: unknown): string {
  const s = sender as Record<string, string> | null;
  return s?.country ?? "";
}

function getReceiverCountry(receiver: unknown): string {
  const r = receiver as Record<string, string> | null;
  return r?.country ?? "";
}

interface BookingsTableProps {
  bookings: BookingRow[];
}

export function BookingsTable({ bookings: initialBookings }: BookingsTableProps) {
  const [bookings, setBookings] = useState<BookingRow[]>(initialBookings);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleApprove(bookingId: string) {
    setLoadingId(bookingId);
    try {
      const response = await fetch(`/api/bookings/${bookingId}/approve`, {
        method: "POST"
      });

      if (!response.ok) {
        alert("Failed to approve booking");
        return;
      }

      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "processing" as const } : b
        )
      );
    } catch {
      alert("Failed to approve booking");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDispatch(bookingId: string) {
    setLoadingId(bookingId);
    try {
      const response = await fetch(`/api/bookings/${bookingId}/dispatch`, {
        method: "POST"
      });

      if (!response.ok) {
        alert("Failed to dispatch booking");
        return;
      }

      setBookings((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "dispatched" as const } : b
        )
      );
    } catch {
      alert("Failed to dispatch booking");
    } finally {
      setLoadingId(null);
    }
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent>
          <div className="py-16 text-center">
            <p className="font-display text-lg font-semibold text-[--ink]">
              No bookings yet
            </p>
            <p className="mt-1 text-sm text-[--ink-muted]">
              Customer bookings will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Requests</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-xs uppercase tracking-[0.18em] text-ink">
                    {booking.tracking_id ?? "—"}
                  </TableCell>
                  <TableCell className="font-medium text-ink">
                    {getSenderName(booking.sender)}
                  </TableCell>
                  <TableCell className="text-sm capitalize text-ink">
                    {booking.service}
                  </TableCell>
                  <TableCell className="text-sm text-[--ink-muted]">
                    {getSenderCountry(booking.sender)} → {getReceiverCountry(booking.receiver)}
                  </TableCell>
                  <TableCell>{statusBadge(booking.status)}</TableCell>
                  <TableCell className="text-sm text-[--ink-muted]">
                    {formatDate(booking.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    {booking.status === "pending" ? (
                      <button
                        type="button"
                        disabled={loadingId === booking.id}
                        onClick={() => handleApprove(booking.id)}
                        className="rounded-lg bg-[--freight] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-[#b04508] disabled:opacity-50"
                      >
                        {loadingId === booking.id ? "..." : "Approve"}
                      </button>
                    ) : booking.status === "processing" ? (
                      <button
                        type="button"
                        disabled={loadingId === booking.id}
                        onClick={() => handleDispatch(booking.id)}
                        className="rounded-lg bg-[--ink] px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-[--ink]/80 disabled:opacity-50"
                      >
                        {loadingId === booking.id ? "..." : "Dispatch"}
                      </button>
                    ) : (
                      <Link
                        href={`/track/${booking.tracking_id ?? ""}`}
                        className="text-sm font-medium text-[--freight] hover:underline"
                      >
                        View Tracking
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
