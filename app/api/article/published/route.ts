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

  if (!userId || !orgId) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      { status: 400 }
    );
  }
  try {
    const articles = await prisma.post.findMany({
      where: {
        Publication: {
          some: {
            id: orgId,
          },
        },
        published: true,
      },
    });
    
    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e }), { status: 500 });
  }
}
