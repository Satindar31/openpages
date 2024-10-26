import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

export async function GET(req: Request) {
    const url = new URL(req.url)
    const userId = url.searchParams.get('userID')
    const draftId = url.searchParams.get('draftID')

    if(!draftId) {
        return new Response(JSON.stringify({ message: "No draft specified" }), { status: 402 });
    }
    if(!userId) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    try {
        const draft = await prisma.post.findUnique({
            where: {
                id: draftId,
                AND: {
                    authorId: userId,
                    published: false
                }
            },
            select: {
                id: true,
                title: true,
                content: true,
                published: true,
            },
        });

        if(!draft) {
            return new Response(JSON.stringify({ message: "Draft not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(draft), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("An unknown error occurred", { status: 500 });
    }
}