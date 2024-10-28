import { Webhook } from "svix";
import { headers } from "next/headers";
import { currentUser, WebhookEvent } from "@clerk/nextjs/server";

import { PrismaClient } from "@prisma/client";
import defaultContent from "@/lib/defaultContent";
const prisma = new PrismaClient();



export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  console.log("Event type:", evt.type);
  if (evt.type === "organization.created") {
    try {
      await prisma.publication.create({
        data: {
          id: payload.data.id,
          name: payload.data.name,
          slug: payload.data.slug,
          members: {
            connect: {
              id: payload.data.created_by
            }
          },
          articles: {
            create: {
              title: "Welcome to " + process.env.APP_NAME,
              author: {
                connect: {
                  id: process.env.SYSADMIN_ID
                }
              },
              content: JSON.stringify(defaultContent),
              contentMD: "# This is the first article of " + payload.data.name,
              published: true
            }
          },
          published: true
        }
      })
      return new Response("", { status: 200 });
    }
    catch(err) {
      console.error("Error creating publication:", err);
      return new Response("Error occured. Error: " + err , {
        status: 500,
      });
    }
  } else if (evt.type === "organization.deleted") {
    try {
      await prisma.publication.delete({
        where: {
          id: payload.data.id,
        },
      });
      return new Response("", { status: 200 });
    } catch (err) {
      console.error("Error deleting publication:", err);
      return new Response("Error occured", {
        status: 500,
      });
    }
  } else if (evt.type === "organization.updated") {
    try {
      await prisma.publication.update({
        where: {
          id: payload.data.id,
        },
        data: {
          name: payload.data.name,
          slug: payload.data.slug,
        },
      });
      return new Response("", { status: 200 });
    } catch (error) {
      console.error("Error updating publication:", error);
      return new Response("Error occured", {
        status: 500,
      });
    }
  } else if (evt.type == "user.created") {
    try {
      await prisma.user.create({
        data: {
          id: payload.data.id,
          name: payload.data.name,
        },
      });
      return new Response("", { status: 200 });
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error occured", {
        status: 500,
      });
    }
  } else if (evt.type == "user.deleted") {
    try {
      await prisma.user.delete({
        where: {
          id: payload.data.id,
        },
      });
      return new Response("", { status: 200 });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response("Error occured", {
        status: 500,
      });
    }
  }
}
