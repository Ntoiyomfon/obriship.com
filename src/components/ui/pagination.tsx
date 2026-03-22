import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  pageCount: number;
  buildHref: (page: number) => string;
}

export function Pagination({ page, pageCount, buildHref }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav className="flex flex-wrap items-center gap-2" aria-label="Pagination">
      <Link href={buildHref(Math.max(1, page - 1))}>
        <Button variant="secondary" disabled={page <= 1}>
          Previous
        </Button>
      </Link>
      {pages.map((entry) => (
        <Link key={entry} href={buildHref(entry)}>
          <span
            className={cn(
              "inline-flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-medium transition",
              entry === page
                ? "border-accent bg-accent text-ink"
                : "border-border bg-white text-ink hover:bg-surface"
            )}
          >
            {entry}
          </span>
        </Link>
      ))}
      <Link href={buildHref(Math.min(pageCount, page + 1))}>
        <Button variant="secondary" disabled={page >= pageCount}>
          Next
        </Button>
      </Link>
    </nav>
  );
}

