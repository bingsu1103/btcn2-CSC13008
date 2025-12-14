import HeroSlider from "@/components/HeroSlider";
import MostPopularFilm from "@/components/MostPopularFilm";
import TopRatingFilm from "@/components/TopRatingFilm";

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-4">
      <HeroSlider></HeroSlider>
      <MostPopularFilm></MostPopularFilm>
      <TopRatingFilm></TopRatingFilm>
    </div>
  );
};

export default Home;
