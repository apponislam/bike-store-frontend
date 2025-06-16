import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../ui/card";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { Blog } from "../../../redux/features/blogs/blogApi";

export const MyBlogCard = ({ post }: { post: Blog }) => {
    const authorName = typeof post.author === "string" ? post.author : post.author?.name || "Unknown";

    return (
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
            <CardHeader>
                <span className="text-sm text-primary font-medium">{post.category}</span>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                    {new Date(post.createdAt || "").toLocaleDateString()} • By {authorName}
                </p>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
                <Button asChild variant="outline" className="w-full">
                    <Link to={`/blog/${post._id}`}>Read More</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};
