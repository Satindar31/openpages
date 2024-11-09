import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

import crypto from "crypto"

export async function PUT(req:Request) {
    const { articleId } = await req.json()

    try {
        const article = await prisma.post.update({
            where: {
                id: articleId
            },
            data: {
                likes: {
                    increment: 1
                }
            }
        });
    
        return new Response(JSON.stringify(article), { status: 200 })
    }
    catch(err) {
        const a = crypto.randomBytes(20).toString("hex")
        console.error({
            err,
            randomCode: a
        })

        return new Response(JSON.stringify({ message: "An error occurred" }), { status: 500 })
    }
}