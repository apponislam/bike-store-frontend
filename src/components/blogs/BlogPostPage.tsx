import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useGetBlogByIdQuery } from "../../redux/features/blogs/blogApi";
import { formatDate } from "../../lib/utils";

export const BlogPostPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetBlogByIdQuery(id || "");

    if (isLoading) {
        return <div className="container mx-auto py-12 px-4 max-w-4xl">Loading...</div>;
    }

    if (isError || !data?.data) {
        return <div className="container mx-auto py-12 px-4 max-w-4xl">Post not found</div>;
    }

    const post = data.data;
    const author = post.author;
    const authorName = author?.name || "Unknown";
    const authorPhoto = author?.photo;
    const updatedAt = post.updatedAt !== post.createdAt ? ` • Updated ${formatDate(post.updatedAt)}` : "";

    return (
        <div className="container mx-auto py-12 px-4 max-w-4xl">
            <Button asChild variant="outline" className="mb-8">
                <Link to="/blog">← Back to Blog</Link>
            </Button>

            <article className="prose prose-lg dark:prose-invert max-w-none">
                <div className="mb-8">
                    <span className="text-primary font-medium capitalize">{post.category}</span>
                    <h1 className="text-4xl font-bold mt-2">{post.title}</h1>

                    <div className="flex items-center mt-4 gap-3">
                        {authorPhoto && <img src={authorPhoto} alt={authorName} className="w-10 h-10 rounded-full object-cover" />}
                        <div>
                            <p className="text-muted-foreground m-0">By {authorName}</p>
                            <p className="text-sm text-muted-foreground m-0">
                                {formatDate(post.createdAt)}
                                {updatedAt}
                            </p>
                        </div>
                    </div>
                </div>

                {post.image && <img src={post.image} alt={post.title} className="w-full h-auto rounded-lg mb-8 max-h-[500px] object-cover" />}

                <div className="mb-8 text-lg font-medium text-muted-foreground">{post.excerpt}</div>

                <div className="space-y-4">
                    {post.content.split("\n").map((paragraph, i) => (
                        <p key={i} className="text-justify">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </article>
        </div>
    );
};
