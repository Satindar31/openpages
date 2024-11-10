import { OrganizationList, OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import VisitPublication from "@/components/dashboard/visitPublication";

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
          revalidate: 6000,
          tags: ["drafts"],
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
        "/api/article/published?orgID=" +
        orgId +
        "&userID=" +
        userId,
      {
        next: {
          revalidate: 600,
          tags: ["published"],
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
      <div className="m-4 p-4">
        <Suspense fallback={<Loading />}>
          <h1 className="text-4xl md:text-9xl font-black">Dashboard</h1>
          <h2 className="text-lg md:text-4xl font-bold">
            Welcome to your dashboard
          </h2>
          <OrganizationSwitcher hidePersonal />
          <Link
            prefetch={true}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ml-2 mr-2"
            href={"/dashboard/write"}
          >
            New post
          </Link>
          <VisitPublication orgId={orgId} />

          <div className="grid grid-cols-2">
            <div>
              <h3>Drafts:</h3>
              <ul>
                {drafts.length > 0 &&
                  drafts.map(
                    (draft: {
                      id: string;
                      title: string;
                      updatedAt: string;
                    }) => (
                      <li className={"border m-1 p-1 rounded hover:shadow duration-150"} key={draft.id}>
                        <Link href={"/dashboard/write/" + draft.id}>
                          <span className="font-bold">{draft.title}</span>
                        </Link>
                        , updated:{" "}
                        {new Date(draft.updatedAt).toLocaleString()}
                      </li>
                    )
                  )}
                  {drafts.length === 0 && <li>No drafts</li>}
              </ul>
            </div>

            <div>
              <h3>Published:</h3>
              <ul>
                {published.length > 0 &&
                  published.map(
                    (article: {
                      slug: string;
                      id: string;
                      title: string;
                      updatedAt: string;
                    }) => (
                      <li className={"border m-1 p-1 rounded hover:shadow duration-150"} key={article.id}>
                        <Link href={`/blog/${orgId}/` + article.slug}>
                          <span className="font-bold">{article.title}</span>
                        </Link>
                        , updated:{" "}
                        {new Date(article.updatedAt).toLocaleString()}
                      </li>
                    )
                  )}

                {published.length === 0 && <li>No published articles</li>}
              </ul>
            </div>
          </div>
        </Suspense>
      </div>
    );
  }
}
