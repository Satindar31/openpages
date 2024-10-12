import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware();
// Clerk config to match routes

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

// Utility function to find a blog by domain
// async function findBlogByDomain(domain) {
//   // Replace this with your logic to fetch blog details from your database
//   const blog = await fetchBlogFromDB(domain); // Mock function
//   return blog;
// }

// export async function middleware(req) {

//   const { hostname } = req.nextUrl;

//   // Handle subdomains like: user.openpages.blog
//   const baseDomain = 'openpages.blog';
//   if (hostname.endsWith(baseDomain)) {
//     // Extract the subdomain (e.g., 'user' from 'user.openpages.blog')
//     const subdomain = hostname.replace(`.${baseDomain}`, '');

//     // Fetch the blog content based on the subdomain
//     const blog = await findBlogByDomain(subdomain);

//     if (blog) {
//       // Rewrite to the blog's dynamic route (e.g., `/blog/[id]` or `/[user]`)
//       req.nextUrl.pathname = `/blog/${blog.id}`; // Adjust this to your routing
//       return NextResponse.rewrite(req.nextUrl);
//     }

//     // If no blog found, redirect to 404 or a fallback page
//     return NextResponse.rewrite(new URL('/404', req.url));
//   }

//   // Handle custom domains like: example.com
//   const blog = await findBlogByDomain(hostname);
//   if (blog) {
//     // Rewrite to the blog's dynamic route (e.g., `/blog/[id]`)
//     req.nextUrl.pathname = `/blog/${blog.id}`; // Adjust this to your routing
//     return NextResponse.rewrite(req.nextUrl);
//   }

//   // If no matching blog or domain, allow default behavior or return a 404
//   return NextResponse.next();
// }
