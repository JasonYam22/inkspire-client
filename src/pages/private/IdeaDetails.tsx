import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import service from "../../services/index.services";
import type { TattooIdea } from "../../types";
import { Heart } from "lucide-react";

function IdeaDetails() {
  const { ideaId } = useParams();
  const [tattooIdea, setTattooIdea] = useState<TattooIdea | null>(null);

const navigate = useNavigate()

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

  const handleDelete = () => {
  if (!window.confirm("Delete this idea?")) return;

  service
    .delete(`/ideas/${ideaId}`)
    .then(() => {
      navigate("/ideas");
    })
    .catch((error) => {
      console.log(error);
    });
};

  const handleToggleFavorite = () => {
    service
      .put(`/ideas/${ideaId}`, { isFavorite: !tattooIdea.isFavorite })
      .then(() => {
        setTattooIdea({ ...tattooIdea, isFavorite: !tattooIdea.isFavorite });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen p-6">
      <Link to="/ideas" className="text-zinc-600 hover:text-zinc-900 text-sm">
        ← Back to Ideas
      </Link>

      <div className="mt-4 bg-zinc-300 rounded-2xl overflow-hidden shadow-md w-80 p-3 mx-auto">
        <div className="relative rounded-xl overflow-hidden">
          {tattooIdea.imageUrl && (
            <img
              src={tattooIdea.imageUrl}
              alt={tattooIdea.title}
              className="w-full h-56 object-cover"
            />
          )}

          <button
            onClick={handleToggleFavorite}
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200/80 shadow-md hover:scale-110 active:scale-95 transition-all"
            aria-label="Favorite tattoo idea"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                tattooIdea.isFavorite
                  ? "text-red-500 fill-red-500"
                  : "text-zinc-600 hover:text-red-500"
              }`}
            />
          </button>
        </div>

        <div className="p-2 pt-4 flex flex-col gap-2">
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

          {tattooIdea.artist && (
            <p className="text-zinc-600 text-sm">Artist: {tattooIdea.artist}</p>
          )}
          {tattooIdea.social && (
            <p className="text-zinc-600 text-sm">Social: {tattooIdea.social}</p>
          )}
          {tattooIdea.notes && (
            <p className="text-zinc-500 text-sm mt-1 border-t border-zinc-200 pt-2">
              {tattooIdea.notes}
            </p>
          )}
          <Link
            to={`/ideas/${tattooIdea.id}/edit`}
            className="mt-2 block w-full text-center py-2 text-xs font-semibold rounded-xl bg-zinc-900 text-white hover:bg-zinc-700 transition-all"
          >
            Edit idea
          </Link>
          <button
  onClick={handleDelete}
  className="block w-full text-center py-2 text-xs font-semibold rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
>
  Delete idea
</button>
        </div>
      </div>
    </div>
  );
}

export default IdeaDetails;
