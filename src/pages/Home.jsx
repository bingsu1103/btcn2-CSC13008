import HeroSlider from "@/components/HeroSlider";
import MostPopularFilm from "@/components/MostPopular";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-4">
      <HeroSlider></HeroSlider>
      <MostPopularFilm></MostPopularFilm>
    </div>
  );
};

export default Home;
