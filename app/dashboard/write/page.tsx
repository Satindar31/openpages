"use client";

import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { useState } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

export default function WriteArticlePage() {
  const [content, setContent] = useState<string | undefined>(undefined);

  const [draftID, setDraftID] = useState("");

  const debouncedUpdates = useDebouncedCallback(
    async (editor: JSONContent[] | undefined) => {
      const json = editor;
      setContent(Buffer.from(JSON.stringify(json)).toString("base64"));
      if (draftID !== "" || draftID !== undefined) {
        console.log(draftID)
        fetch("/api/article/draft/save", {
          method: "PUT",
          body: JSON.stringify({
            content: content,
            id: draftID,
          }),
          cache: "no-cache"
        }).then((res) => {
          if (res.status === 201) {
            console.log("Saved(not first)");
            
            toast.success("Saved");
            res.json().then((data) => {
                console.log(data);
                setDraftID(data.id);
            })
          } else {
            console.error("Failed to save");
            toast.error("Failed to save");
          }
        });
      } else {
        fetch("/api/article/draft/save", {
          method: "PUT",
          body: JSON.stringify({
            content: content,
          }),
          cache: "no-cache"
        }).then((res) => {
          if (res.status === 201) {
            console.log("Saved (first save)");
            // get json body
            res.json().then((data) => {
                console.log(data);
              setDraftID(data.id);
            });
            // console log text body

            toast.success("Saved");
          } else {
            console.error("Failed to save");
            toast.error("Failed to save");
          }
        });
      }
    },
    1000
  );

  return (
    <div className="prose md:prose-xl">
      <Editor onChange={(e) => debouncedUpdates(e.content)} />
    </div>
  );
}
