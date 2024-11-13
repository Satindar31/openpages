import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


function SlugInfoCard({ slug }: { slug: string }) {
    return (
    <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">What is this?</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div>
            A slug is your own subdomain where your blog can be accessed. For example, if your slug is &ldquo;my-awesome-blog&rdquo;, your blog can be accessed at &ldquo;my-awesome-blog.{process.env.NEXT_PUBLIC_BASE_DOMAIN}&rdquo;.
          </div>
        </HoverCardContent>
      </HoverCard>
      )
}

function DomainInfoCard({ domain } : { domain: string | ""}) {
    return (
    <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant={"link"}>What is this?</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div>
            A custom domain is a domain that you own that you can use to access your blog. For example, if you own the domain &ldquo;myblog.com&rdquo;, you can set it as your custom domain and access your blog at &ldquo;myblog.com&rd. 
            If you are setting up blog.myblog.com, make sure it has a CNAME record pointing to {process.env.NEXT_PUBLIC_CNAME_TARGET ?? "cname.vercel-dns.com"}.
          </div>
        </HoverCardContent>
      </HoverCard>
      )
}


export {
    SlugInfoCard,
    DomainInfoCard
}