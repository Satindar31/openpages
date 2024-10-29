export default function Article({ content, title, author }: { content: string, title: string, author: { name: string } }) {
    return (
        <div>
            <h1>{title}</h1>
            <h2>{author.name}</h2>
            <p className="prose prose-xl md:prose-2xl">{content}</p>
        </div>
    );

}