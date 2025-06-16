import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const banners = [
    {
        id: 1,
        image: "https://i.ibb.co.com/2YLnc0TD/360-F-979397061-g-Nr-Tw3w-Vmm5-Fmv7-Ex-DLiw-Oqsq54q-YAgl.jpg",
        title: "Summer Sale Extravaganza",
        subtitle: "Limited Time Offer",
        description: "Up to 50% Off on select mountain bikes",
    },
    {
        id: 2,
        image: "https://i.ibb.co.com/p6F2dbhJ/images-1.jpg",
        title: "Electric Revolution",
        subtitle: "New Arrivals",
        description: "Experience the future with our premium e-bikes",
    },
    {
        id: 3,
        image: "https://i.ibb.co.com/ZQP8hX0/images.jpg",
        title: "Adventure Awaits",
        subtitle: "Best Sellers",
        description: "Top-rated bikes for your next journey",
    },
];

export default function BannerCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        pauseOnHover: true,
        dotsClass: "slick-dots !bottom-4", // Custom dots positioning
    };

    return (
        <div className="container mx-auto px-4">
            <div className="w-full mx-auto mb-8">
                <Slider {...settings}>
                    {banners.map((banner) => (
                        <Card key={banner.id} className="border-none shadow-sm rounded-lg overflow-hidden">
                            <CardContent className="p-0 relative group">
                                <img src={banner.image} alt={banner.title} className="w-full h-[400px] md:h-[500px] object-cover rounded-lg brightness-90 transition-all duration-300 group-hover:brightness-75" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-lg flex flex-col items-start justify-end p-8">
                                    <div className="max-w-2xl space-y-2 text-left">
                                        <p className="text-sm font-medium text-gray-300">{banner.subtitle}</p>
                                        <h2 className="text-2xl md:text-4xl font-semibold text-white">{banner.title}</h2>
                                        <p className="text-base text-gray-300">{banner.description}</p>
                                        <Link to="/products">
                                            <Button size="lg" className="mt-4 px-6 py-3 font-medium bg-white text-gray-900 hover:bg-gray-100" variant="default">
                                                Shop Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
