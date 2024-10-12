"use client"

import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { useState } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from 'use-debounce';


export default function WriteArticlePage() {
    const [content, setContent] = useState<JSONContent | undefined>(undefined);

    const debouncedUpdates = useDebouncedCallback(async (editor: JSONContent[] | undefined) => {
        const json = editor
        setContent(json);
        fetch("/api/article/draft/save", {
            method: "PUT",
            body: JSON.stringify({
                content: content
            })
        }).then(res => {
            if(res.status === 201) {
                console.log("Saved")
                toast.success("Saved")
            } else {
                console.error("Failed to save")
                toast.error("Failed to save")
            }
        })
      }, 1000);

    return (
<div className="prose md:prose-xl">
    <Editor onChange={e => debouncedUpdates(e.content)} />
</div>
    )
}