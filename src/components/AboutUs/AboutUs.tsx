import { Card, CardContent } from "../ui/card";

export default function AboutPage() {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground py-8">
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold mb-4">Welcome to Our Bike Shop</h1>
                    <p className="text-lg max-w-3xl mx-auto text-muted-foreground">We provide high-quality bikes and accessories to make your rides more enjoyable. Whether you're a casual rider or a professional, we have something for everyone. Our goal is to deliver the best bikes, service, and experience for cycling enthusiasts.</p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full px-4 sm:px-0">
                    <Card>
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-4 pt-4">Our Mission</h3>
                            <p>Our mission is to inspire and support the cycling community by providing top-of-the-line bikes, accessories, and services that enhance your riding experience.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-4 pt-4">Customer Satisfaction</h3>
                            <p>We aim to make sure every customer walks away with the perfect bike that fits their needs, backed by excellent customer service and a lifetime of support.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <h3 className="text-xl font-semibold mb-4 pt-4">Our Team</h3>
                            <p>Our team consists of passionate cyclists and bike experts, committed to helping you find the best products and services for your cycling journey.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
