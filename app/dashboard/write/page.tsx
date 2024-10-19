"use client";

import Editor from "@/components/editor/advanced-editor";
import SettingsDrawer from "@/components/write/settings";
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
      setContent(Buffer.from(JSON.stringify(json)).toString("utf-8"));
      if (draftID !== "" || draftID !== undefined) {
        fetch("/api/article/draft/save", {
          method: "PUT",
          body: JSON.stringify({
            content: content,
            id: draftID,
          }),
          cache: "no-cache",
        }).then((res) => {
          if (res.status === 201) {
            toast.success("Saved");
            res.json().then((data) => {
              setDraftID(data.id);
            });
          } else {
            console.error("Failed to save");
            toast.error("Failed to save", {
              action: (
                <button
                  onClick={() => {
                    fetch("/api/article/draft/save", {
                      method: "PUT",
                      body: JSON.stringify({
                        content: content,
                        id: draftID,
                      }),
                      cache: "no-cache",
                    }).then((res) => {
                      if (res.status === 201) {
                        toast.success("Saved");
                        res.json().then((data) => {
                          setDraftID(data.id);
                        });
                      } else {
                        console.error("Failed to save");
                        toast.error("Failed to save");
                      }
                    });
                  }}
                >
                  Retry
                </button>
              ),
            });
          }
        });
      } else {
        fetch("/api/article/draft/save", {
          method: "PUT",
          body: JSON.stringify({
            content: content,
          }),
          cache: "no-cache",
        }).then((res) => {
          if (res.status === 201) {
            // get json body
            res.json().then((data) => {
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
