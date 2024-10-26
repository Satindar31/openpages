import { Pool } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
const connectionString = `${process.env.DATABASE_URL}`

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)
const prisma = new PrismaClient({ adapter })

export default async function fetchBlogFromDB(domain: string, custom: boolean) {
    if(custom === false) {
        const blog = await prisma.publication.findFirst({
            where: {
                slug: domain
            }
        })
        return blog;
    }
    else {
        const blog = await prisma.publication.findFirst({
            where: {
                domain: domain
            }
        })
        return blog;
    }
}