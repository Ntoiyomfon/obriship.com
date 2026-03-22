import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { formatDateTimeUtc, statusBadgeClassName, statusLabel } from "@/lib/utils";
import { SHIPMENT_STATUSES, type ShipmentListResponse } from "@/types/shipment";

interface ShipmentTableProps {
  response: ShipmentListResponse;
  query?: string;
  status?: string;
}

export function ShipmentTable({ response, query = "", status = "ALL" }: ShipmentTableProps) {
  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    if (query) {
      params.set("query", query);
    }
    if (status && status !== "ALL") {
      params.set("status", status);
    }
    params.set("page", String(page));
    return `/admin/dashboard?${params.toString()}`;
  };

  return (
    <Card>
      <CardHeader className="gap-6">
        <div className="space-y-2">
          <p className="section-label">Shipment Operations</p>
          <CardTitle>Active Shipment Registry</CardTitle>
        </div>
        <form action="/admin/dashboard" className="grid gap-4 lg:grid-cols-[1fr,220px,auto]">
          <Input
            name="query"
            defaultValue={query}
            placeholder="Search by tracking ID or recipient"
          />
          <Select name="status" defaultValue={status}>
            <option value="ALL">All statuses</option>
            {SHIPMENT_STATUSES.map((entry) => (
              <option key={entry} value={entry}>
                {statusLabel(entry)}
              </option>
            ))}
          </Select>
          <Button type="submit" className="w-full sm:w-auto">
            Apply Filters
          </Button>
        </form>
      </CardHeader>
      <CardContent className="space-y-6">
        {response.items.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface p-8 text-center text-muted">
            No shipments found. Create your first shipment to get started.
          </div>
        ) : null}
        {response.items.length > 0 ? (
          <div className="grid gap-4 md:hidden">
          {response.items.map((shipment) => (
            <article key={shipment.id} className="rounded-2xl border border-border bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink">
                    {shipment.trackingId}
                  </p>
                  <p className="font-semibold text-ink">{shipment.recipientName}</p>
                  <p className="text-sm text-muted">{shipment.recipientEmail}</p>
                </div>
                <Badge className={statusBadgeClassName(shipment.currentStatus)}>
                  {statusLabel(shipment.currentStatus)}
                </Badge>
              </div>
              <div className="mt-4 grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted">Route</span>
                  <span className="text-right text-ink">
                    {shipment.senderCountry} to {shipment.recipientCountry}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted">Service</span>
                  <span className="font-medium text-ink">{shipment.serviceType}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted">Updated</span>
                  <span className="text-right text-ink">
                    {formatDateTimeUtc(shipment.updatedAt)}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href={`/track/${shipment.trackingId}`} className="flex-1">
                  <Button variant="secondary" className="w-full">
                    View
                  </Button>
                </Link>
                <Link href={`/admin/shipments/${shipment.id}`} className="flex-1">
                  <Button className="w-full">Edit</Button>
                </Link>
              </div>
            </article>
          ))}
          </div>
        ) : null}

        {response.items.length > 0 ? (
          <div className="hidden overflow-x-auto md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {response.items.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-mono text-xs uppercase tracking-[0.18em] text-ink">
                    {shipment.trackingId}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-semibold text-ink">{shipment.recipientName}</p>
                      <p className="text-sm text-muted">{shipment.recipientEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted">
                    {shipment.senderCountry} to {shipment.recipientCountry}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-ink">
                    {shipment.serviceType}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusBadgeClassName(shipment.currentStatus)}>
                      {statusLabel(shipment.currentStatus)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted">
                    {formatDateTimeUtc(shipment.updatedAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Link href={`/track/${shipment.trackingId}`}>
                        <Button variant="secondary">View</Button>
                      </Link>
                      <Link href={`/admin/shipments/${shipment.id}`}>
                        <Button>Edit</Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        ) : null}

        {response.items.length > 0 ? (
          <Pagination
            page={response.page}
            pageCount={response.pageCount}
            buildHref={buildHref}
          />
        ) : null}
      </CardContent>
    </Card>
  );
}
