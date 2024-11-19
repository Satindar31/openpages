import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const {
    name,
    slug,
    description,
    isPublished,
    customDomain,
  }: {
    name: string;
    slug: string;
    description: string;
    isPublished: boolean;
    customDomain: string | null | undefined;
  } = await req.json();

  if (customDomain) {
    const res = await fetch(
      `https://api.vercel.com/v10/projects/${process.env.VERCEL_PROJECT_ID}/domains`,
      {
        method: "POST",

        body: JSON.stringify({
          name: customDomain,
        }),

        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        },
      }
    );
    
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 409) {
        return new Response(
          JSON.stringify({
            error: "Domain already exists or not verified",
          }),
          {
            status: 409,
          }
        );
      }

      console.error(data);
      console.error(res.status);
      return new Response(
        JSON.stringify({
          error: "Error creating domain",
        }),
        {
          status: 500,
        }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  }
  else {
    return new Response(
      JSON.stringify({
        error: "Custom domain is required",
      }),
      {
        status: 400,
      }
    );
  }
}
