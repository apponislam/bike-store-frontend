import Slider from "react-slick";

// Import Slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent } from "../ui/card";

const banners = [
    { id: 1, image: "/src/assets/demo.jpg", text: "Limited Time Offer - Up to 50% Off!" },
    { id: 2, image: "/src/assets/demo.jpg", text: "Ride the Future with Our Electric Bikes" },
    { id: 3, image: "/src/assets/demo.jpg", text: "Explore New Adventures - Shop Now!" },
];

export default function BannerCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div className="container mx-auto">
            <div className="w-full mx-auto mb-6">
                <Slider {...settings}>
                    {banners.map((banner) => (
                        <Card key={banner.id} className="border-none shadow-md">
                            <CardContent className="p-0 relative">
                                <img src={banner.image} alt={banner.text} className="w-full h-[300px] object-cover rounded-xl dark:opacity-90" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                                    <p className="text-white text-lg font-semibold">{banner.text}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
