import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import axios from "axios";

const Register = () => {
    const [imageUrl, setImageUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    // console.log(fileInputRef);

    interface FormValues {
        email: string;
        password: string;
        photoURL?: string | null;
    }

    const form = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: "",
            photoURL: imageUrl,
        },
    });

    const handleLogin = (data: any) => {
        console.log(data);

        const photoURL = imageUrl;

        const registerData = { ...data, photoURL };
        console.log(registerData);

        form.reset();
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // console.log(import.meta.env.VITE_IMGAPI);

    const uploadImage = (file: any) => {
        const formData = new FormData();
        formData.append("image", file);

        axios
            .post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGAPI}`, formData)
            .then((response) => {
                setImageUrl(response.data.data.display_url);
                console.log(response);
                console.log(response.data.data.display_url);
            })
            .catch((error) => console.error(error));
    };

    // const imagetoURL = (data: any) => {
    //     const file = data.target.files[0];
    //     if (file) {
    //         uploadImage(file);
    //     }
    //     // console.log(imageUrl);
    // };

    // const imagetoURL = (data: any) => {
    //     console.log(data);
    // };

    return (
        <div className="flex items-center justify-center">
            <div className="py-52">
                <div className="w-96 border rounded-2xl border-blue-500 p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="E-mail" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            {/* <FormField
                                control={form.control}
                                name="photoURL"
                                render={({ field: { onBlur, onChange, ref, ...rest } }) => (
                                    <FormItem>
                                        <FormLabel>Photo</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onBlur={onBlur}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        uploadImage(file); // Upload to imgbb
                                                        onChange(file); // Update React Hook Form state
                                                    }
                                                }}
                                                ref={ref}
                                                {...rest}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            /> */}

                            <FormField
                                control={form.control}
                                name="photoURL"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Photo</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files.length > 0) {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            uploadImage(file);
                                                            field.onChange(file);
                                                        }
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button className="mt-4 w-full" type="submit">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Register;
