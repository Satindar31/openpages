"use client"

import Editor from "@/components/editor/advanced-editor";
import { JSONContent } from "novel";
import { useState } from "react";


export default function WriteArticlePage() {
    const [content, setContent] = useState<JSONContent | undefined>(undefined);
    return (
<div className="prose md:prose-xl">
    <Editor onChange={e => setContent(e.content)} />
</div>
    )
}