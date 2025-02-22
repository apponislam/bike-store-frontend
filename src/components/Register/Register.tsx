import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import axios from "axios";
import { useLoginMutation, useRegisterMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";

const Register = () => {
    const [imageUrl, setImageUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // console.log(fileInputRef);

    const [login] = useLoginMutation();
    const [register] = useRegisterMutation();
    // console.log("data", data);
    // console.log("error", error);

    interface FormValues {
        name: string;
        email: string;
        password: string;
        photo?: string | null;
    }

    const form = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            photo: imageUrl,
        },
    });

    const handleLogin = async (data: any) => {
        try {
            // console.log(data);

            const photo = imageUrl;
            const role = "customer";

            const registerData = { ...data, photo, role };
            // console.log(registerData);
            const res = await register(registerData).unwrap();
            console.log(res);

            const loginData = {
                email: res.data.email,
                password: data.password,
            };

            const loggedin = await login(loginData).unwrap();

            const mainuser = verifyToken(loggedin.data.accessToken);
            dispatch(setUser({ user: mainuser, token: loggedin.data.accessToken }));

            toast.success("Registration successful");

            navigate("/");

            form.reset();
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
                setImageUrl("");
            }
        } catch {
            toast.error("Registration failed");
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
                // console.log(response);
                // console.log(response.data.data.display_url);
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="flex items-center justify-center">
            <div className="py-52">
                <div className="w-96 border rounded-2xl border-blue-500 p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
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

                            <FormField
                                control={form.control}
                                name="photo"
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
