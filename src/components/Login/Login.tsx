import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation() as { state?: { from?: string } };
    const redirectPath = location?.state?.from || "/";
    const form = useForm();
    const [login] = useLoginMutation();

    const handleLogin = async (data: any) => {
        try {
            const res = await login(data).unwrap();
            const user = verifyToken(res.data.accessToken);
            dispatch(setUser({ user: user, token: res.data.accessToken }));
            navigate(redirectPath, { replace: true });
            toast.success("Login successful");
            form.reset();
        } catch (err: any) {
            toast.error(err?.data?.errorSources[0].message || "Login failed");
        }
    };

    // Default login credentials
    const handleDefaultLogin = (role: "admin" | "user") => {
        const credentials = {
            admin: {
                email: "11appon11@gmail.com",
                password: "Abc123Admin",
            },
            user: {
                email: "demo1@gmail.com",
                password: "Abc123",
            },
        };

        form.setValue("email", credentials[role].email);
        form.setValue("password", credentials[role].password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-muted-foreground">Login to your account</p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter your email" {...field} />
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
                                        <Input type="password" placeholder="Enter your password" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">
                            Login
                        </Button>
                    </form>
                </Form>

                <div className="space-y-3">
                    <p className="text-center text-sm text-muted-foreground">Or try with demo accounts</p>
                    <div className="flex gap-4">
                        <Button variant="outline" className="w-full" onClick={() => handleDefaultLogin("admin")}>
                            Login as Admin
                        </Button>
                        <Button variant="outline" className="w-full" onClick={() => handleDefaultLogin("user")}>
                            Login as User
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
