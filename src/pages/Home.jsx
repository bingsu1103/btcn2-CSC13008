const heroMovie = {
  title: "The General (1926)",
  genres: "Action, Adventure, Comedy",
  poster: "https://image.tmdb.org/t/p/w300/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
};

const popularMovies = [
  {
    id: 1,
    poster: "https://image.tmdb.org/t/p/w300/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
  },
  {
    id: 2,
    poster: "https://image.tmdb.org/t/p/w300/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
  },
  {
    id: 3,
    poster: "https://image.tmdb.org/t/p/w300/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
];

const topRatingMovies = [
  {
    id: 1,
    poster: "https://image.tmdb.org/t/p/w300/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  },
  {
    id: 2,
    poster: "https://image.tmdb.org/t/p/w300/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  },
  {
    id: 3,
    poster: "https://image.tmdb.org/t/p/w300/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-4">
      {/* HERO */}
      <div className="relative flex justify-center mb-12">
        <img
          src={heroMovie.poster}
          alt={heroMovie.title}
          className="w-[300px] rounded-lg shadow-lg"
        />

        {/* Prev / Next */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-white">
          ‹
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl text-gray-400 hover:text-white">
          ›
        </button>

        {/* Info */}
        <div className="absolute bottom-6 text-center">
          <h2 className="text-lg font-semibold">{heroMovie.title}</h2>
          <p className="text-sm text-gray-300">{heroMovie.genres}</p>
        </div>
      </div>

      {/* MOST POPULAR */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold mb-4">Most Popular</h3>
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {popularMovies.map((movie) => (
              <img
                key={movie.id}
                src={movie.poster}
                alt=""
                className="w-[180px] rounded-md hover:scale-105 transition"
              />
            ))}
          </div>

          <button className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
            ‹
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
            ›
          </button>
        </div>
      </section>

      {/* TOP RATING */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Top Rating</h3>
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {topRatingMovies.map((movie) => (
              <img
                key={movie.id}
                src={movie.poster}
                alt=""
                className="w-[180px] rounded-md hover:scale-105 transition"
              />
            ))}
          </div>

          <button className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
            ‹
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl text-gray-400">
            ›
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
