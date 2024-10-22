"use client";

import EditorChild from "@/components/editor/editorChild";


export default function WriteArticlePage() {

  return (
    <div className="prose md:prose-xl">
      <EditorChild APIURL={`${process.env.NEXT_PUBLIC_BASE_URL}/api/article/draft/save`} _id={null} initValue={undefined} />
    </div>
  );
}
