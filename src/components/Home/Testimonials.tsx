import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const testimonials = [
    {
        name: "John Doe",
        review: "Amazing quality and fast delivery. Highly recommended!",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        name: "Jane Smith",
        review: "Great customer service and top-notch bikes!",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        name: "Alex Johnson",
        review: "I love my new mountain bike! Great performance and value.",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
];

export default function Testimonials() {
    return (
        <div className="container mx-auto py-12">
            <div className="text-center">
                <h2 className="text-2xl font-bold">What Our Customers Say</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                    {testimonials.map((t, index) => (
                        <Card key={index} className="shadow-lg">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={t.avatar} />
                                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <CardTitle>{t.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 dark:text-gray-300">{t.review}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
