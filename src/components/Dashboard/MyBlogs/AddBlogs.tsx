import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
// import { useToast } from "../ui/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCreateBlogMutation } from "../../../redux/features/blogs/blogApi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { currentToken } from "../../../redux/features/auth/authSlice";

// Form validation schema
const formSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
    content: z.string().min(50, "Content must be at least 50 characters"),
    category: z.string().min(1, "Category is required"),
    image: z.instanceof(File).optional(),
});

const AddBlogs = () => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = useAppSelector(currentToken) ?? "";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            excerpt: "",
            content: "",
            category: "",
        },
    });

    const uploadImage = async (file: File) => {
        setIsUploading(true);

        toast.loading("Uploading image...");

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGAPI}`, formData);

            setImageUrl(response.data.data.display_url);

            toast.success("Image uploaded successfully");
            toast.dismiss();
        } catch (error) {
            console.error(error);
            toast.error("Failed to upload image");
        } finally {
            setIsUploading(false);
            toast.dismiss();
        }
    };

    const [createBlog] = useCreateBlogMutation();
    // Form Submit Handler
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!imageUrl) {
            toast.error("Please upload an image first");
            return;
        }

        setIsSubmitting(true);

        toast.loading("Submitting blog...");

        try {
            const blogData = {
                ...values,
                image: imageUrl,
            };

            console.log("Submitting blog:", blogData);
            // const token = localStorage.getItem("token") || "";
            // console.log(token);
            const result = createBlog({ blogData, token }).unwrap();
            console.log(result);

            toast.success("Blog created successfully");
            form.reset();
            setImageUrl("");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create blog");
        } finally {
            setIsSubmitting(false);
            toast.dismiss();
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)} className="rounded-full">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">Create New Blog</h1>
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
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                {isUploading && (
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Uploading image...
                                    </div>
                                )}
                                {imageUrl && !isUploading && (
                                    <div className="mt-2">
                                        <img src={imageUrl} alt="Preview" className="h-40 object-cover rounded-md" />
                                    </div>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit" disabled={isSubmitting || isUploading}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                "Create Blog"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AddBlogs;
