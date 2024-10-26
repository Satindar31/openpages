import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

export default async function findBlogByID(id: string, published: boolean = true) {
  // Fetch blog from Prisma

  try {
    const blog = await prisma.publication.findFirst({
      where: {
        id: id,
        published: published
      },
      select: {
        articles: {
            include: {
                author: true
            }
        },
        createdAt: true,
        name: true,
      }
    });
    return blog;
  } catch (error) {
    if ((error as PrismaClientKnownRequestError).code == "P2025") {
      return;
    }
    console.error(error);
    throw new Error("Error fetching blog. Error: " + error);
  }
}
