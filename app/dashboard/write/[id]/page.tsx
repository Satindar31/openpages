import { Suspense } from "react";
import Loading from "./loading";
import { auth } from "@clerk/nextjs/server";
import Editor from "@/components/editor/EditorParent";


export default async function Writepage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth()
  const response = await fetch(
    `${process.env.BASE_URL}/api/article/draft/getDraft?userID=${userId}&draftID=${params.id}`,
    {
      next: {
        revalidate: 10,
      },
      method: "GET",
    }
  );
  if (!response.ok) {
    console.log("Error fetching draft");
    return (
      <div>
        <h1>Error fetching draft</h1>
        <p>There was an error fetching the draft</p>
      </div>
    )
  }
  const res = await response.json();


  return (
    <div>
      <h1>Write</h1>
      <p>Write your article</p>
      <Suspense fallback={<Loading />}>
        <p>id: {res.id}</p>
        <p>title: {res.title}</p>
        <Editor draftID={res.id} initialValue={res.content}/>
      </Suspense>
    </div>
  );
}
