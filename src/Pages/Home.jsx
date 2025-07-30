import { ReTitle } from "re-title";
import CategorySection from "../Components/Home-Component/Category-Section/CategorySection";
import Hero from "../Components/Home-Component/Hero-Section/Hero";
import FeaturedProducts from "../Components/Home-Component/Featured-Section/FeaturedProducts";
import TestimonialsSection from "../Components/Home-Component/Testimonial-Section/TestimonialsSection";
import FlashDeals from "../Components/Home-Component/FlashDeals-Section/FlashDeals";
import Brands from "../Components/Home-Component/Brand-Section/Brands";



const Home = () => {
    return (
        <div>
            <ReTitle title="Digital Xpress | Home" />
            <Hero />
            <FeaturedProducts />
            <CategorySection />
            <TestimonialsSection />
            <FlashDeals />
            <Brands />
        </div>
    );
};

export default Home;
