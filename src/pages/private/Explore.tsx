import { useEffect, useState } from "react";
import service from "../../services/index.services";
import type { ExploreIdea } from "../../types";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

function Explore() {
  const [ideas, setIdeas] = useState<ExploreIdea[]>([]);

  useEffect(() => {
    service
      .get("/ideas/explore")
      .then((response) => {
        setIdeas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSave = (ideaId: string) => {
    service
      .post(`/ideas/explore/${ideaId}/save`)
      .then(() => {
        alert("Saved to your collection!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mt-4 mb-1 px-6">Explore</h1>
      <p className="text-white/70 mb-6 px-6">
        Tattoo ideas from the Inkspire community.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-5xl mx-auto">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="group flex flex-col w-full max-w-xs mx-auto bg-zinc-800/70 backdrop-blur-md border border-zinc-700 rounded-3xl p-3 shadow-lg hover:-translate-y-1 hover:border-zinc-500 hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-52 rounded-2xl overflow-hidden bg-zinc-700">
              {idea.imageUrl ? (
                <img
                  src={idea.imageUrl}
                  alt={idea.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs font-medium uppercase tracking-wider">
                  No Image
                </div>
              )}

              <button
                onClick={() => handleSave(idea.id)}
                className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:scale-110 active:scale-95 transition-all"
                aria-label="Save to collection"
              >
                <Heart className="w-4 h-4 text-zinc-600 hover:text-red-500" />
              </button>
            </div>

            <div className="flex flex-col gap-2 flex-1 px-2 pt-4 pb-2">
              <h2 className="text-base font-bold text-zinc-100 truncate">
                {idea.title}
              </h2>

              <div className="text-xs text-zinc-400 space-y-0.5">
                {idea.genre && (
                  <p className="truncate">Genre: <span className="text-zinc-200 font-medium">{idea.genre}</span></p>
                )}
                {idea.spot && (
                  <p className="truncate">Spot: <span className="text-zinc-200 font-medium">{idea.spot}</span></p>
                )}
              </div>

              <p className="mt-auto text-xs text-zinc-500">
                by <span className="text-zinc-300 font-medium">{idea.user.username} ({idea.user.role})</span>
              </p>

              <Link
                to={`/explore/${idea.id}`}
                className="block w-full text-center py-2 text-xs font-semibold rounded-xl bg-zinc-200 text-zinc-900 hover:bg-white transition-all"
              >
                View details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;