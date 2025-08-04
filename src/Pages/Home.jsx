import { ReTitle } from "re-title";
import CategorySection from "../Components/Home-Component/Category-Section/CategorySection";
import Hero from "../Components/Home-Component/Hero-Section/Hero";
import FeaturedProducts from "../Components/Home-Component/Featured-Section/FeaturedProducts";
import FlashDeals from "../Components/Home-Component/FlashDeals-Section/FlashDeals";
import Brands from "../Components/Home-Component/Brand-Section/Brands";
import useScrollToTop from "../Components/Utils/useScrollToTop";



const Home = () => {
    useScrollToTop()
    return (
        <div>
            <ReTitle title="Digital Xpress | Home" />
            <Hero />
            <FeaturedProducts />
            <CategorySection />
            <FlashDeals />
            <Brands />
        </div>
    );
};

export default Home;
