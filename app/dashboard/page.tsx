import { OrganizationList, OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Dashboard() {
  const { orgId, userId } = auth();

  if (!orgId || orgId == undefined) {
    return (
      <div className="flex items-center justify-center">
        <OrganizationList hidePersonal />
      </div>
    );
  }

  if (orgId) {
    // For drafts
    const response = await fetch(
      process.env.BASE_URL +
        `/api/article/draft?userID=${userId}&orgID=${orgId}`,
      {
        next: {
          revalidate: 0,
        },
        method: "GET",
        headers: {
          Authorization: "Bearer " + (await auth().getToken()),
        },
      }
    );

    if (!response.ok) {
      console.log("Erorr fetching drafts");
    }

    const drafts = await response.json();

    const response2 = await fetch(
      process.env.BASE_URL +
        `/api/article/published?userID=${userId}&orgID=${orgId}`,
      {
        next: {
          revalidate: 0,
        },
        headers: {
          Authorization: "Bearer " + (await auth().getToken()),
        },
        method: "GET",
      }
    );
    if (!response2.ok) {
      console.log("Error fetching published articles");
    }
    const published = await response2.json();

    return (
      <div>
        <h1 className="text-4xl md:text-9xl font-black">Dashboard</h1>
        <h2 className="text-lg md:text-4xl font-bold">
          Welcome to your dashboard
        </h2>
        <OrganizationSwitcher hidePersonal />
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          href={"/dashboard/write"}
        >
          New post
        </Link>

        <p>drafts:</p>

        <ul>
          <Suspense fallback={<Loading />}>
            {drafts.length > 0 &&
              drafts.map(
                (draft: { id: string; title: string; updatedAt: string }) => (
                  <li key={draft.id}>
                    <Link href={"/dashboard/write/" + draft.id}>
                      {draft.id}
                    </Link>
                    , title: {draft.title}, updated:{" "}
                    {new Date(draft.updatedAt).toLocaleString()}
                  </li>
                )
              )}
          </Suspense>
        </ul>
        <p>Published:</p>
        <ul>
          <Suspense fallback={<Loading />}>
            {published.length > 0 &&
              published.map(
                (article: { id: string; title: string; updatedAt: string }) => (
                  <li key={article.id}>
                    <Link href={"/dashboard/write/" + article.id}>
                      {article.id}
                    </Link>
                    , title: {article.title}, updated:{" "}
                    {new Date(article.updatedAt).toLocaleString()}
                  </li>
                )
              )}
          </Suspense>
        </ul>
      </div>
    );
  }
}
