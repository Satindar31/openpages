import { auth } from "@clerk/nextjs/server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new  URL(req.url)
  const userId = url.searchParams.get("userID")
  if(!userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 402 });
    }

  try {
    const drafts = await prisma.post.findMany({
      where: {
        authorId: userId,
        published: false,
      },
      select: {
        id: true,
        title: true,
        updatedAt: true,
      },
    });

    return new Response(JSON.stringify(drafts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("An unknown error occurred", { status: 500 });
  }
}
