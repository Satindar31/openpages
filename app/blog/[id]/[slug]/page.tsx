import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";
import Loading from "../loading";
import Article from "@/components/blog/article";

export default async function BlogAritlcePlage({ params }: { params: { slug: string, id: string } }) {

    const res = await fetch(process.env.BASE_URL + `/api/article/published/getArticle?slug=${params.slug}&orgID=${params.id}`, {
        headers: {
            'Authorization': `Bearer ${await auth().getToken()}`
        },
        next: {
            // 10 minutes
            revalidate: 600
        }
    });
    const _json = await res.json();
    const json = _json[0];

    if(!res.ok) return <div>Article not found</div>;

    return (
        <div className="h-screen w-screen text-black">
            <Suspense fallback={ <Loading /> }>
                <Article content={json.contentMD} title={json.title} author={json.author} />
            </Suspense>
        </div>
    )
    
}