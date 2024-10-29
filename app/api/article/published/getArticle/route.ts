import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  const orgId = url.searchParams.get("orgID");

  if (!slug || !orgId) {
    console.log(slug)
    console.log(orgId)
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      { status: 400 }
    );
  }
  try {
    const articles = await prisma.post.findMany({
      where: {
        slug: slug,
        Publication: {
          every: {
            id: orgId,
          },
        },
      },
      select: {
        author: true,
        contentMD: true,
        title: true,
      }
    });

    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e }), { status: 500 });
  }
}
