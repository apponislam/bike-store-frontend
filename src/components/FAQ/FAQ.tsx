import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const FAQPage = () => {
    const faqs = [
        {
            question: "How do I place an order?",
            answer: "Browse our bikes, select your desired model, click 'Buy Now', and proceed through checkout. You'll need to create an account or log in to complete your purchase.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards and integrate with SurjoPay for secure transactions.",
        },
        {
            question: "How long does delivery take?",
            answer: "Standard delivery takes 3-5 business days. You can track your order status in your dashboard after purchase.",
        },
        {
            question: "Do you offer assembly services?",
            answer: "Yes! We offer professional assembly for $50. Select this option during checkout.",
        },
        {
            question: "What's your return policy?",
            answer: "Unused bikes can be returned within 14 days with original packaging. See our Terms page for details.",
        },
        {
            question: "Do you offer warranties?",
            answer: "All our bikes come with a 1-year manufacturer warranty. Extended warranties are available for purchase.",
        },
    ];

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="container w-full mx-auto">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-center text-primary">Frequently Asked Questions</CardTitle>
                        <p className="text-center text-muted-foreground mt-2">Find answers to common questions about our bikes and services</p>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full space-y-2">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4  transition-colors">
                                    <AccordionTrigger className="py-4 hover:no-underline text-left font-medium text-lg">{faq.question}</AccordionTrigger>
                                    <AccordionContent className="pb-4 text-muted-foreground">{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center">
                    <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                    <p className="text-muted-foreground mb-4">Contact our support team for more information</p>
                    <Link to="/contact">
                        <Button>Contact Us</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
