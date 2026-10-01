import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import service from "../../services/index.services";
import type { TattooIdea } from "../../types";

function IdeaDetails() {
  const { ideaId } = useParams();
  const [tattooIdea, setTattooIdea] = useState<TattooIdea | null>(null);

  useEffect(() => {
    service
      .get(`/ideas/${ideaId}`)
      .then((response) => {
        setTattooIdea(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ideaId]);

  if (!tattooIdea) return <p className="text-amber-50">Loading...</p>;

 return (
  <div className="min-h-screen p-6">
    <Link to="/ideas" className="text-zinc-600 hover:text-zinc-900 text-sm">
      ← Back to Ideas
    </Link>

    <div className="mt-4 bg-white rounded-2xl overflow-hidden shadow-md w-80">
      {tattooIdea.imageUrl && (
        <img
          src={tattooIdea.imageUrl}
          alt={tattooIdea.title}
          className="w-full h-56 object-cover"
        />
      )}

      <div className="p-4 flex flex-col gap-2">
        <h1 className="text-xl font-bold text-zinc-900">
          {tattooIdea.title}
        </h1>

        <div className="flex gap-2 flex-wrap">
          {tattooIdea.genre && (
            <span className="text-xs font-semibold uppercase tracking-wide bg-zinc-100 text-zinc-600 px-2 py-1 rounded">
              {tattooIdea.genre}
            </span>
          )}
          {tattooIdea.spot && (
            <span className="text-xs font-semibold uppercase tracking-wide bg-zinc-100 text-zinc-600 px-2 py-1 rounded">
              {tattooIdea.spot}
            </span>
          )}
        </div>

        {tattooIdea.artist && <p className="text-zinc-600 text-sm">Artist: {tattooIdea.artist}</p>}
        {tattooIdea.social && <p className="text-zinc-600 text-sm">Social: {tattooIdea.social}</p>}
        {tattooIdea.notes && (
          <p className="text-zinc-500 text-sm mt-1 border-t border-zinc-200 pt-2">
            {tattooIdea.notes}
          </p>
        )}
      </div>
    </div>
  </div>
);
}

export default IdeaDetails;