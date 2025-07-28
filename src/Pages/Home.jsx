import { ReTitle } from "re-title";
import CategorySection from "../Components/Home-Component/Category-Section/CategorySection";
import Hero from "../Components/Home-Component/Hero-Section/Hero";
import FeaturedProducts from "../Components/Home-Component/Featured-Section/FeaturedProducts";
import TestimonialsSection from "../Components/Home-Component/Testimonial-Section/TestimonialsSection";


const Home = () => {
    return (
        <div>
            <ReTitle title="Digital Xpress | Home" />
            <Hero />
            <FeaturedProducts />
            <CategorySection />
            <TestimonialsSection />
        </div>
    );
};

export default Home;
