"use client"

import { useOrganization } from "@clerk/nextjs";
import Link from "next/link";

export default function VisitPublication({ orgId }: { orgId: string }) {
  const { organization } = useOrganization();

  return (
    <Link
      prefetch={true}
      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      href={
        process.env.NODE_ENV === "development"
          ? `/blog/${orgId}`
          : `https://${organization!.slug}.${process.env.BASE_DOMAIN}`
      }
    >
      Visit your blog
    </Link>
  );
}
