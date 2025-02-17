import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

const Login = () => {
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = (data: any) => {
        console.log(data);
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
