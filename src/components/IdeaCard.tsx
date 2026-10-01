import { useState } from "react";
import type { TattooIdea } from "../types";
import service from "../services/index.services";
import { Heart } from "lucide-react"
import { Link } from "react-router-dom"

type Props = {
  tattooIdea: TattooIdea;
};

function IdeaCard({ tattooIdea }: Props) {

const [isFavorite, setIsFavorite] = useState(tattooIdea.isFavorite)

const handleToggleFavorite = () => {
  service.put(`/ideas/${tattooIdea.id}`, {isFavorite: !isFavorite})
  .then(() => {
    setIsFavorite(!isFavorite)
  })
  .catch((error: any) => {
    console.log(error)
  })
}

return (
  <div className="group flex flex-col w-full max-w-xs mx-auto bg-zinc-800/70 backdrop-blur-md border border-zinc-700 rounded-3xl p-3 shadow-lg hover:-translate-y-1 hover:border-zinc-500 hover:shadow-2xl transition-all duration-300">
    {/* Image */}
    <div className="relative h-52 rounded-2xl overflow-hidden bg-zinc-700">
      {tattooIdea.imageUrl ? (
        <img
          src={tattooIdea.imageUrl}
          alt={tattooIdea.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs font-medium uppercase tracking-wider">
          No Image
        </div>
      )}

      <button
        onClick={handleToggleFavorite}
        className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:scale-110 active:scale-95 transition-all"
        aria-label="Favorite tattoo idea"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isFavorite
              ? "text-red-500 fill-red-500"
              : "text-zinc-600 hover:text-red-500"
          }`}
        />
      </button>
    </div>

    {/* Content */}
    <div className="flex flex-col gap-2 flex-1 px-2 pt-4 pb-2">
      <h2 className="text-base font-bold text-zinc-100 truncate">
        {tattooIdea.title}
      </h2>

      <div className="text-xs text-zinc-400 space-y-0.5 mb-3">
        {tattooIdea.genre && (
          <p className="truncate">Genre: <span className="text-zinc-200 font-medium">{tattooIdea.genre}</span></p>
        )}
        {tattooIdea.spot && (
          <p className="truncate">Spot: <span className="text-zinc-200 font-medium">{tattooIdea.spot}</span></p>
        )}
        {tattooIdea.artist && (
          <p className="truncate">Artist: <span className="text-zinc-200 font-medium">{tattooIdea.artist}</span></p>
        )}
        {tattooIdea.social && (
          <p className="truncate">Social: <span className="text-zinc-200">{tattooIdea.social}</span></p>
        )}
      </div>

      <Link
        to={`/ideas/${tattooIdea.id}`}
        className="mt-auto block w-full text-center py-2 text-xs font-semibold rounded-xl bg-zinc-200 text-zinc-900 hover:bg-white transition-all"
      >
        View details
      </Link>
    </div>
  </div>
);
}

export default IdeaCard;