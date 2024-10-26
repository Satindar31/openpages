import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userID");
  const orgId = url.searchParams.get("orgID");
  if (!userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const drafts = await prisma.post.findMany({
      where: {
        authorId: userId,
        published: false,
        Publication: {
          some: {
            id: orgId!,
          }
        }
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
