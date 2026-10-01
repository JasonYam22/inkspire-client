import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Pencil, Compass } from "lucide-react";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/index.services";
import type { TattooIdea } from "../../types";

const genres = [
  "Traditional", "Neo-Traditional", "Japanese", "Blackwork", "Realism",
  "Watercolor", "Minimalist", "Fine Line", "Tribal", "Geometric", "Lettering",
];

const chipTilts = [
  "-rotate-3",
  "rotate-2 translate-y-2",
  "-rotate-1 -translate-y-1",
  "rotate-3",
];

const tiles = [
  { pos: "left-0 top-10 w-40 h-56 -rotate-6", icon: Pencil },
  { pos: "left-1/4 top-0 w-48 h-64 rotate-3 z-10", icon: Heart },
  { pos: "right-0 top-14 w-40 h-52 rotate-6", icon: Compass },
];

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  const [ideas, setIdeas] = useState<TattooIdea[]>([]);

  useEffect(() => {
    if (!isLoggedIn) return;

    service
      .get("/ideas")
      .then((response) => {
        setIdeas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isLoggedIn]);

  const favorites = ideas.filter((idea) => idea.isFavorite).length;
  const genreCount = new Set(ideas.map((idea) => idea.genre).filter(Boolean)).size;
  const recent = [...ideas]
    .filter((idea) => idea.imageUrl)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const outline = "text-transparent [-webkit-text-stroke:1px_#a1a1aa]";

  return (
    <div className="max-w-5xl mx-auto px-6 pt-10 pb-20 overflow-hidden">
      {/* Hero: staggered giant type */}
      <section className="relative">
        <p className="absolute right-0 top-0 text-xs uppercase tracking-widest text-zinc-400">
          {formatDate(new Date())}
        </p>
        <h1 className="text-7xl md:text-9xl font-black uppercase leading-none text-white">
          Ink
        </h1>
        <h1 className={`text-7xl md:text-9xl font-black uppercase leading-none ml-10 md:ml-32 ${outline}`}>
          Spire
        </h1>
        <p className="mt-4 ml-auto max-w-xs text-right text-sm text-zinc-300">
          Your tattoo ideas, all in one place.
        </p>
      </section>

      {/* Tilted collage */}
      <section className="relative h-80 md:h-96 mt-10 max-w-2xl mx-auto">
        {tiles.map((tile, i) => {
          const idea = recent[i];
          const base = `absolute ${tile.pos} rounded-2xl overflow-hidden border border-zinc-600 shadow-2xl`;

          return idea ? (
            <Link key={idea.id} to={`/ideas/${idea.id}`} className={`${base} group`}>
              <img
                src={idea.imageUrl as string}
                alt={idea.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          ) : (
            <div
              key={i}
              className={`${base} bg-zinc-800/80 backdrop-blur-md flex items-center justify-center`}
            >
              <tile.icon className="w-10 h-10 text-zinc-500" />
            </div>
          );
        })}
      </section>

      {/* Big words / numbers */}
      <section className="mt-6 flex flex-col">
        {isLoggedIn ? (
          <>
            <p className="text-6xl md:text-8xl font-black text-white leading-none">
              {ideas.length} <span className={outline}>ideas</span>
            </p>
            <p className="text-6xl md:text-8xl font-black text-white leading-none ml-12 md:ml-40">
              {favorites} <span className={outline}>loved</span>
            </p>
            <p className="text-6xl md:text-8xl font-black text-white leading-none ml-4 md:ml-16">
              {genreCount} <span className={outline}>styles</span>
            </p>
          </>
        ) : (
          <>
            <p className="text-6xl md:text-8xl font-black text-white leading-none">
              Collect.
            </p>
            <p className={`text-6xl md:text-8xl font-black leading-none ml-12 md:ml-40 ${outline}`}>
              Favorite.
            </p>
            <p className="text-6xl md:text-8xl font-black text-white leading-none ml-4 md:ml-16">
              Explore.
            </p>
          </>
        )}
      </section>

      {/* Scattered style chips */}
      <section className="mt-16 flex flex-wrap gap-3 justify-center">
        {genres.map((genre, i) => (
          <span
            key={genre}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full bg-zinc-900/70 backdrop-blur-md border border-zinc-600 text-zinc-200 ${chipTilts[i % chipTilts.length]}`}
          >
            {genre}
          </span>
        ))}
      </section>

      {/* Steps, offset */}
      <section className="mt-16 flex flex-col gap-2">
        {[
          { n: "01", t: "Sign up", offset: "" },
          { n: "02", t: "Add ideas", offset: "ml-8 md:ml-40" },
          { n: "03", t: "Get inked", offset: "ml-16 md:ml-80" },
        ].map((step) => (
          <p key={step.n} className={`flex items-baseline gap-4 ${step.offset}`}>
            <span className={`text-5xl font-black ${outline}`}>{step.n}</span>
            <span className="text-xl font-bold text-zinc-200">{step.t}</span>
          </p>
        ))}
      </section>

      {/* Footer */}
      <p className="mt-16 text-right text-xs text-zinc-500">© 2026 Inkspire</p>
    </div>
  );
}

export default Home;