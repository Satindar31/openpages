import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const { content } = await req.json();

  if(!content || typeof content !== "object") {
    return new Response("Invalid content", { status: 400 });
  }
  const user = await currentUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // Save the content to the database
    await prisma.post.create({
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
    return new Response("OK", { status: 201 });
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Response(e.message, { status: 500 });
    }
    return new Response("An unknown error occurred", { status: 500 });
  }
}
