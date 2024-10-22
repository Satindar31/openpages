import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const { content, id, md }: { content: string; id: string , md: string} = await req.json();
  if (!content) {
    return new Response("Invalid content", { status: 400 });
  }
  const user = await currentUser();
  const { orgId, has } = auth();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!id) {
    if (
      has({
        permission: "org:writing:permission",
      })
    ) {
      try {
        const draft = await prisma.post.create({
          data: {
            content: JSON.stringify(content),
            contentMD: md,
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
            Publication: {
              connectOrCreate: {
                where: {
                  id: orgId!,
                },
                create: {
                  id: (Math.random() * 1000000).toString(),
                  name: "Drafts",
                  slug: crypto.randomUUID().toString()
                }
              },
            }
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
  } else {
    if (
      has({
        permission: "org:writing:permission",
      })
    ) {
      try {
        // Save the content to the database
        const draft = await prisma.post.update({
          where: {
            id: id,
          },
          data: {
            content: JSON.stringify(content),
            contentMD: md,
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
            Publication: {
              connect: {
                id: orgId!,
              },
            },
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
    } else {
      return new Response("Unauthorized", { status: 401 });
    }
  }
}
