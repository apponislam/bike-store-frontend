import FAQPage from "../FAQ/FAQ";
import BannerCarousel from "./Slider";
import SpecialProducts from "./SpecialProducts";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
        <div>
            <BannerCarousel></BannerCarousel>
            <SpecialProducts></SpecialProducts>
            <Testimonials></Testimonials>
            <FAQPage></FAQPage>
        </div>
    );
};

export default Home;
