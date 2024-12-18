"use client";

import YooptaEditor, {
  createYooptaEditor,
  YooptaContentValue,
} from "@yoopta/editor";

import { markdown } from "@yoopta/exports";

import Paragraph from "@yoopta/paragraph";
import Blockquote from "@yoopta/blockquote";
import Embed from "@yoopta/embed";
import Image from "@yoopta/image";
import Link from "@yoopta/link";
import Callout from "@yoopta/callout";
import Video from "@yoopta/video";
import File from "@yoopta/file";
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists";
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks";
import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings";
import Code from "@yoopta/code";
import Table from "@yoopta/table";
import Divider from "@yoopta/divider";
import ActionMenuList from "@yoopta/action-menu-list";
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar";
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActionNotionMenuExample } from "@/components/ActionMenu/Notion";
import { NotionToolbar } from "@/components/Toolbars/NotionToolbar/NotionToolbar";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import { revalidateTag } from "next/cache";
import uploadToCloudinary from "@/lib/uploadToCloudinary";

const plugins = [
  Paragraph,
  Table.extend({
    events: {
      onBeforeCreate: (editor, table) => {
        return editor.commands.buildTableElements({
          rows: 2,
          columns: 2,
          columnWidth: 120,
        });
      },
    },
  }),
  Divider,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  NumberedList,
  BulletedList,
  TodoList,
  Code,
  Link,
  Embed,
  Image.extend({
    options: {
      async onUpload(file) {
        console.log("got file");
        const data = await uploadToCloudinary(file, "image");
        return {
          src: data.secure_url,
          alt: "cloudinary",
          sizes: {
            width: data.width,
            height: data.height,
          },
        };
      },
    },
  }),
  Video.extend({
    options: {
      onUpload: async (file) => {
        const data = await uploadToCloudinary(file, "video");
        return {
          src: data.secure_url,
          alt: "cloudinary",
          sizes: {
            width: data.width,
            height: data.height,
          },
        };
      },
      onUploadPoster: async (file) => {
        const image = await uploadToCloudinary(file, "image");
        return image.secure_url;
      },
    },
  }),
  File.extend({
    options: {
      onUpload: async (file) => {
        const response = await uploadToCloudinary(file, "auto");
        return {
          src: response.url,
          format: response.format,
          name: response.name,
          size: response.bytes,
        };
      },
    },
  }),
];

const TOOLS = {
  ActionMenu: {
    render: ActionNotionMenuExample,
    tool: ActionMenuList,
  },
  Toolbar: {
    render: NotionToolbar,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

function EditorChild({
  initValue,
  APIURL,
  _id,
}: {
  initValue: string | undefined;
  APIURL: string;
  _id: string | null;
}) {
  const initialValueParsed = JSON.parse(initValue || "{}");
  const editor = useMemo(() => createYooptaEditor(), []);
  const [id, setID] = useState<string | null>(_id);
  const selectionRef = useRef(null);

  const serializeMarkdown = () => {
    const data = editor.getEditorValue();
    const markdownString = markdown.serialize(editor, data);

    return markdownString;
  };

  const debounced = useDebouncedCallback(
    // function
    (value: YooptaContentValue) => {
      const mdString = serializeMarkdown();
      if (id == null) {
        fetch(APIURL, {
          method: "PUT",
          body: JSON.stringify({
            content: value,
            md: mdString,
          }),
        }).then((res) => {
          if (res.ok) {
            // set id to id from response body
            res.json().then((data) => {
              setID(data.id);
            });
            toast.success("Article created successfully");
            revalidateTag("drafts");
          } else {
            toast.error("Error creating article");
          }
        });
      } else if (id !== null) {
        fetch(APIURL, {
          method: "PUT",
          body: JSON.stringify({
            content: value,
            id: id,
            md: mdString,
          }),
        }).then((res) => {
          if (res.ok) {
            toast.success("Article updated successfully");
            revalidateTag("drafts");
          } else {
            toast.error("Error updating article");
          }
        });
      }
    },
    // delay in ms
    1000
  );

  useEffect(() => {
    editor.on("change", debounced);
    return () => {
      // [IMPORTANT] - unsubscribe from event on unmount
      editor.off("change", debounced);
    };
  }, [editor]);

  return (
    <div className="flex justify-center w-screen h-full" ref={selectionRef}>
      <YooptaEditor
        className="w-full h-full"
        width={800}
        placeholder="Start writing here..."
        editor={editor}
        plugins={plugins}
        tools={TOOLS}
        marks={MARKS}
        selectionBoxRoot={selectionRef}
        value={initialValueParsed}
      />
    </div>
  );
}

export default EditorChild;
