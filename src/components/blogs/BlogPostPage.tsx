import { useParams } from "react-router-dom";

import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { blogPosts } from "./blogs.data";

export const BlogPostPage = () => {
    const { id } = useParams();
    const post = blogPosts.find((post) => post.id === id);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <Button asChild variant="outline" className="mb-8">
                <Link to="/blog">← Back to Blog</Link>
            </Button>

            <article className="prose prose-lg dark:prose-invert max-w-none">
                <div className="mb-8">
                    <span className="text-primary font-medium">{post.category}</span>
                    <h1 className="text-4xl font-bold mt-2">{post.title}</h1>
                    <p className="text-muted-foreground mt-2">
                        {post.date} • By {post.author}
                    </p>
                </div>

                <img src={post.image} alt={post.title} className="w-full h-auto rounded-lg mb-8" />

                <div className="space-y-4">
                    {post.content.split("\n").map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                    ))}
                </div>
            </article>
        </div>
    );
};
