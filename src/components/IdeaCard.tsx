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
  <div className="group relative bg-white border border-zinc-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-zinc-300 hover:shadow-lg transition-all duration-300 w-full max-w-xs mx-auto">
    
    {/* Image Container */}
    <div className="relative h-48 w-full bg-zinc-100 overflow-hidden">
      {tattooIdea.imageUrl ? (
        <img 
          src={tattooIdea.imageUrl} 
          alt={tattooIdea.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-zinc-400 text-xs font-medium uppercase tracking-wider">
          No Image
        </div>
      )}

      {/* High-Contrast Heart Button */}
      <button 
        onClick={handleToggleFavorite}
        className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/80 shadow-md text-zinc-700 hover:scale-110 active:scale-95 transition-all"
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
    <div className="p-4 flex flex-col gap-2">
      <h2 className="text-base font-bold text-zinc-900 truncate">
        {tattooIdea.title}
      </h2>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5">
        {tattooIdea.genre && (
          <span className="px-2 py-0.5 text-[10px] uppercase font-semibold rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200">
            {tattooIdea.genre}
          </span>
        )}
        {tattooIdea.spot && (
          <span className="px-2 py-0.5 text-[10px] uppercase font-semibold rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200">
            {tattooIdea.spot}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="text-xs text-zinc-500 space-y-0.5 mt-1">
        {tattooIdea.artist && (
          <p className="truncate">Artist: <span className="text-zinc-800 font-medium">{tattooIdea.artist}</span></p>
        )}
        {tattooIdea.social && (
          <p className="truncate">Social: <span className="text-zinc-600">{tattooIdea.social}</span></p>
        )}
      </div>

      {/* Action Button */}
      <Link 
        to={`/ideas/${tattooIdea.id}`}
        className="mt-2 block w-full text-center py-2 text-xs font-semibold rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-all shadow-sm"
      >
        View details
      </Link>
    </div>

  </div>
);
}

export default IdeaCard;