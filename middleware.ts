import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import fetchBlogFromDB from "./lib/blogs/fetchBlogFromDB";

const isPublicRoute = createRouteMatcher(["/", "/api/clerk/webhooks"]);

async function findBlogByDomain(domain: string, custom: boolean) {
  // Replace this with your logic to fetch blog details from your database
  const blog = await fetchBlogFromDB(domain, custom); // Mock function
  return blog;
}

export default clerkMiddleware(
  async (auth, request) => {
    if (!isPublicRoute(request)) {
      auth().protect();
    }

    const { hostname, pathname } = request.nextUrl;
    const baseDomain = process.env.BASE_DOMAIN ?? "localhost";

    // If the URL is simple BASE_URL, allow default behavior
    if (hostname == baseDomain) {
      return NextResponse.next();
    } 
    // If not then if the URL is a subdomain like: user.openpages.blog do the following
    else {
      if (hostname.endsWith(baseDomain)) {
        const segments = pathname.split("/");
        const blogId = segments[segments.length - 1];
        const subdomain = hostname.replace(`.${baseDomain}`, "");
        // Fetch the publication from the subdomain
        const publication = await findBlogByDomain(subdomain, false);

        if (publication) {
          console.log("publication found");

          // If the URL contains blogId, rewrite to the blog's dynamic route
          if (blogId) {
            request.nextUrl.pathname = `/blog/${publication.id}/${blogId}`;
            return NextResponse.rewrite(request.nextUrl);
          }

          // If no blogId, rewrite to the blog's main page
          request.nextUrl.pathname = `/blog/${publication.id}`;
          return NextResponse.rewrite(request.nextUrl);
        }
        // Else return 404;
        return NextResponse.rewrite(new URL("/404", request.url));
      } else {
        // Handle custom domains like: example.com
        const blog = await findBlogByDomain(hostname, true);
        if (blog) {
          // Rewrite to the blog's dynamic route (e.g., `/blog/[id]`)
          request.nextUrl.pathname = `/blog/${blog.id}`; // Adjust this to your routing
          return NextResponse.rewrite(request.nextUrl);
        }

        // If no matching blog or domain, allow default behavior or return a 404
        return NextResponse.next();
      }
    }
  },
  {
    // Uncomment next line if you face issues with clerk
    // debug: true
  }
);

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
