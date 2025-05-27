import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCreateContactMutation } from "../../redux/features/Contacts/contactApi";
import { toast } from "sonner";

type FormData = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

const ContactUs = () => {
    const [createContact] = useCreateContactMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const result = await createContact(data);
            if (result?.data?.status === true) {
                toast.success("Your data was submitted successfully.");
                reset();
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
                <p className="text-muted-foreground">Have questions? We're here to help!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Send us a message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <Input placeholder="Your name" {...register("name", { required: "Name is required" })} />
                                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                            </div>

                            <div>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <Input placeholder="Subject" {...register("subject", { required: "Subject is required" })} />
                                {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>}
                            </div>

                            <div>
                                <Textarea
                                    placeholder="Your message"
                                    rows={5}
                                    {...register("message", {
                                        required: "Message is required",
                                        minLength: {
                                            value: 10,
                                            message: "Message must be at least 10 characters",
                                        },
                                    })}
                                />
                                {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>}
                            </div>

                            <Button type="submit" className="w-full">
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Contact Info (unchanged) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Our information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-start gap-4">
                            <Mail className="mt-1 h-5 w-5 text-primary" />
                            <div>
                                <h3 className="font-medium">Email</h3>
                                <p className="text-muted-foreground">11appon11@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="mt-1 h-5 w-5 text-primary" />
                            <div>
                                <h3 className="font-medium">Phone</h3>
                                <p className="text-muted-foreground">+880 1722-779803</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <MapPin className="mt-1 h-5 w-5 text-primary" />
                            <div>
                                <h3 className="font-medium">Address</h3>
                                <p className="text-muted-foreground">Fulbari Bus Stand, Dinajpur Sadar</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ContactUs;
