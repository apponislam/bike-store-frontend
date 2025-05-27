import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";

import { Link } from "react-router-dom";
import { BlogPost } from "./blogs.data";

export const BlogCard = ({ post }: { post: BlogPost }) => {
    return (
        <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-t-lg" />
            <CardHeader>
                <span className="text-sm text-primary font-medium">{post.category}</span>
                <CardTitle>{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                    {post.date} • By {post.author}
                </p>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="mb-4">{post.excerpt}</p>
                <Button asChild variant="outline" className="mt-auto">
                    <Link to={`/blog/${post.id}`}>Read More</Link>
                </Button>
            </CardContent>
        </Card>
    );
};
