import findBlogByID from "@/lib/blogs/findBlogByID";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

export default async function PublicationPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const blog = await findBlogByID(id, true);
    if (!blog) {
        return <div>Blog not found</div>;
    }
    
    return (
        <div className="w-screen h-full">
            <Suspense fallback={ <Loading /> }>
                <h1>{blog.name}</h1>
                <h2>{new Date(blog.createdAt).toLocaleDateString()}</h2>
                <ol>
                    {blog.articles.map((article) => (
                        <li key={article.id}><Link href={`/blog/${id}/${article.id}`}>Title: {article.title} author: {article.author.name}</Link></li>                    
                    ))}
                </ol>
            </Suspense>
        </div>
    );
}