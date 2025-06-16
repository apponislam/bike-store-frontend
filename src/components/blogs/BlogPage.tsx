import { useGetBlogsQuery } from "../../redux/features/blogs/blogApi";
import { Skeleton } from "../ui/skeleton";
import { BlogCard } from "./BlogCard";

import { toast } from "sonner";

export const BlogPage = () => {
    const { data, isLoading, error } = useGetBlogsQuery({});

    if (isLoading) {
        return (
            <div className="container mx-auto py-12 px-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Our Blog</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <Skeleton key={idx} className="h-80 rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        toast.error("Failed to load blogs");
        return <div className="text-center mt-20">Something went wrong!</div>;
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-2">Our Blog</h1>
                <p className="text-muted-foreground">Latest news, tips, and stories from the biking world</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.data.map((post) => (
                    <BlogCard key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
};
