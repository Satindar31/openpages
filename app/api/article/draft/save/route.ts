import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { JSONContent } from "novel";
const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const { content, id }: { content: string, id: string } = await req.json();
  if (!content) {
    return new Response("Invalid content", { status: 400 });
  }
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!id) {
    try {
      const draft = await prisma.post.create({
        data: {
          content: content,
          title: "Draft",
          author: {
            connectOrCreate: {
              where: {
                id: user.id,
              },
              create: {
                id: user.id,
                name: user.fullName,
              },
            },
          },
          published: false,
        },
      });

      return new Response(
        JSON.stringify({
          id: draft.id,
        }),
        { status: 201 }
      );
    } catch (error) {
      console.error(error);
      return new Response("An unknown error occurred", { status: 500 });
    }
  }

  try {
    // Save the content to the database
    const draft = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        content: JSON.stringify(content),
        title: "Draft",
        author: {
          connectOrCreate: {
            where: {
              id: user.id,
            },
            create: {
              id: user.id,
              name: user.fullName,
            },
          },
        },
        published: false,
      },
    });
    return new Response(
      JSON.stringify({
        id: draft.id,
      }),
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Response(e.message, { status: 500 });
    }
    return new Response("An unknown error occurred", { status: 500 });
  }
}
