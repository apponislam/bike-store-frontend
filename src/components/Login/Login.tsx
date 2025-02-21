import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
    const dispatch = useAppDispatch();

    const form = useForm({
        defaultValues: {
            email: "johndoe@example.com",
            password: "SecurePass123!",
        },
    });

    const [login, { data, error }] = useLoginMutation();
    console.log("data", data);
    console.log("error", error);

    const handleLogin = async (data: any) => {
        console.log(data);
        const res = await login(data).unwrap();

        const user = verifyToken(res.data.accessToken);

        dispatch(setUser({ user: user, token: res.data.accessToken }));
        form.reset();
    };

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

export default Login;
