import { currentUser } from "@clerk/nextjs/server";

import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

export async function PUT(req: Request) {
  const { title, id, description, published }: { title: string, id: string, description: string, published: boolean } = await req.json();
  
    if (!title || !description || !id) {
        return new Response("Invalid content", { status: 400 });
    }
    const user = await currentUser();
    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const article = await prisma.post.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                published: published,
            }
        })

        return new Response(JSON.stringify(article), { status: 201 });
    }
    catch (error) {
        console.error(error);
        return new Response("An unknown error occurred", { status: 500 });
    }
}