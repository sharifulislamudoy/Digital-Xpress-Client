import { ReTitle } from "re-title";
import CategorySection from "../Components/Home-Component/Category-Section/CategorySection";
import Hero from "../Components/Home-Component/Hero-Section/Hero";


const Home = () => {
    return (
        <div>
            <ReTitle title="Digital Xpress | Home" />
            <Hero />
            <CategorySection />
        </div>
    );
};

export default Home;
