import { Suspense } from "react";
import Loading from "./loading";
import { auth } from "@clerk/nextjs/server";
import Editor from "@/components/editor/EditorParent";
import SettingsDrawer from "@/components/write/settings";

export default async function Writepage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth();
  const response = await fetch(
    `${process.env.BASE_URL}/api/article/draft/getDraft?userID=${userId}&draftID=${params.id}`,
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
    console.log("Error fetching draft");
    return (
      <div>
        <h1>Error fetching draft</h1>
        <p>There was an error fetching the draft</p>
      </div>
    );
  }
  const res = await response.json();

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-4">
        <h1 className="font-black text-2xl md:text-9xl">Write</h1>
        <p className="fint-bold text-lg md:text-4xl">Write your article</p>
        <SettingsDrawer id={res.id} docTitle={res.title} docPublished={res.published} />
        <p>id: {res.id}</p>
        <p>title: {res.title}</p>
        <Editor draftID={res.id} initialValue={res.content} />
      </div>
    </Suspense>
  );
}
