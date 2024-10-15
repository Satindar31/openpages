import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Dashboard() {
  const response = await fetch(
    process.env.BASE_URL + "/api/article/draft?userID=" + auth().userId,
    {
      next: {
        revalidate: 10,
      },
      method: "GET",
    }
  );

  if (!response.ok) {
    console.log("Erorr fetching drafts");
  }

  const drafts = await response.json();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
      drafts:
      <ul>
        {drafts.map(
          (draft: {
            id: string;
            title: string;
            updatedAt: string;
          }) => (
            <li key={draft.id}>
              <Link href={"/dashboard/write/" + draft.id}>{draft.id}</Link>,
              title: {draft.title}, updated: {new Date(draft.updatedAt).toLocaleString()}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
