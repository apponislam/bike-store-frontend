import { BlogCard } from "./BlogCard";
import { blogPosts } from "./blogs.data";

export const BlogPage = () => {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-2">Our Blog</h1>
                <p className="text-muted-foreground">Latest news, tips, and stories from the biking world</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};
