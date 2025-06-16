import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { currentToken } from "../../../redux/features/auth/authSlice";
import { useGetBlogByIdQuery, useUpdateBlogMutation } from "../../../redux/features/blogs/blogApi";

// Form validation schema
const formSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
    content: z.string().min(50, "Content must be at least 50 characters"),
    category: z.string().min(1, "Category is required"),
    image: z.union([z.instanceof(File), z.string()]).optional(),
});

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = useAppSelector(currentToken) ?? "";

    // Fetch blog data
    const { data: blogData, isLoading, isError } = useGetBlogByIdQuery(id || "");
    const [updateBlog] = useUpdateBlogMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            excerpt: "",
            content: "",
            category: "",
        },
    });

    // Set form values when blog data is loaded
    useEffect(() => {
        if (blogData?.data) {
            const { title, excerpt, content, category, image } = blogData.data;
            form.reset({
                title,
                excerpt,
                content,
                category,
                image,
            });
            setImageUrl(image);
        }
    }, [blogData, form]);

    const uploadImage = async (file: File) => {
        setIsUploading(true);
        toast.loading("Uploading image...");

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGAPI}`, formData);
            setImageUrl(response.data.data.display_url);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image");
        } finally {
            setIsUploading(false);
            toast.dismiss();
        }
    };

    // Form Submit Handler
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!id) return;

        setIsSubmitting(true);
        toast.loading("Updating blog...");

        try {
            const updatedData = {
                ...values,
                image: imageUrl,
            };

            const result = await updateBlog({
                id,
                updatedData,
                token,
            }).unwrap();
            console.log(result);

            toast.success("Blog updated successfully");
            navigate("/dashboard/myblogs");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update blog");
        } finally {
            setIsSubmitting(false);
            toast.dismiss();
        }
    };

    if (isLoading) {
        return (
            <div className="container mx-auto py-8 px-4 max-w-4xl">
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </div>
        );
    }

    if (isError || !blogData?.data) {
        return (
            <div className="container mx-auto py-8 px-4 max-w-4xl">
                <div className="text-center py-10">
                    <h2 className="text-xl font-semibold">Blog not found</h2>
                    <Button onClick={() => navigate(-1)} className="mt-4">
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-full">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">Edit Blog</h1>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Title Field */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter blog title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Excerpt Field */}
                    <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Excerpt</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter a short excerpt" className="min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Content Field */}
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Write your blog content here..." className="min-h-[200px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Category Field */}
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="technology">Technology</SelectItem>
                                        <SelectItem value="travel">Travel</SelectItem>
                                        <SelectItem value="food">Food</SelectItem>
                                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Image Upload */}
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Featured Image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                field.onChange(file);
                                                uploadImage(file);
                                            }
                                        }}
                                    />
                                </FormControl>
                                {isUploading ? (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Uploading image...
                                    </div>
                                ) : (
                                    imageUrl && (
                                        <div className="mt-2">
                                            <img src={imageUrl} alt="Preview" className="h-40 object-cover rounded-md" />
                                        </div>
                                    )
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting || isUploading}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update Blog"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default EditBlog;
