import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { MyBlogCard } from "./MyBlogCard";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/alert-dialog";

import { toast } from "sonner";
import { useDeleteBlogMutation, useGetMyBlogsQuery } from "../../../redux/features/blogs/blogApi";
import { useAppSelector } from "../../../redux/hooks";
import { currentToken } from "../../../redux/features/auth/authSlice";

export const MyBlogs = () => {
    const token = useAppSelector(currentToken) ?? "";

    const { data, error, isLoading, refetch } = useGetMyBlogsQuery({ token });
    const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

    const handleDelete = async (id: string) => {
        try {
            const result = await deleteBlog({ id, token }).unwrap();
            console.log(result);
            refetch();
            toast.success("Blog deleted successfully");
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete blog");
            console.error("Delete error:", err);
        }
    };

    // console.log(error);

    if (isLoading) return <div>Loading blogs...</div>;
    if (error) return <div>Error loading blogs</div>;

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-12">
                <h1 className="text-3xl font-bold">My Blogs</h1>
                <Button asChild>
                    <Link to="/dashboard/myblogs/create">Create New Blog</Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.data.map((post) => (
                    <div key={post._id} className="relative group">
                        <MyBlogCard post={post} />
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="outline" size="icon" className="bg-white/90 hover:bg-white" asChild>
                                <Link to={`/dashboard/myblogs/${post._id}`}>
                                    <Pencil className="h-4 w-4" />
                                </Link>
                            </Button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="icon" className="bg-white/90 hover:bg-white text-red-600 hover:text-red-700" disabled={isDeleting}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>This action cannot be undone. This will permanently delete your blog post.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => handleDelete(post._id ?? "")}>
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
