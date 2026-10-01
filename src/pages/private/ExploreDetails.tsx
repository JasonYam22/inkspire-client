import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import service from "../../services/index.services";
import type { ExploreIdea } from "../../types";
import type { User } from "../../types";


function ExploreDetails() {
  const { ideaId } = useParams();
  const [idea, setIdea] = useState<ExploreIdea | null>(null);

  useEffect(() => {
    service
      .get(`/ideas/explore/${ideaId}`)
      .then((response) => {
        setIdea(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ideaId]);

  if (!idea) return <p className="text-white p-6">Loading...</p>;

 return (
  <div className="min-h-[85vh] flex flex-col items-center justify-center p-6">
    <div className="w-full max-w-sm">
      <Link to="/explore" className="text-zinc-400 hover:text-white text-sm">
        ← Back to Explore
      </Link>

      <div className="mt-4 bg-zinc-800/70 backdrop-blur-md border border-zinc-700 rounded-3xl p-3 shadow-lg">
        <div className="h-64 rounded-2xl overflow-hidden bg-zinc-700">
          {idea.imageUrl ? (
            <img
              src={idea.imageUrl}
              alt={idea.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs font-medium uppercase tracking-wider">
              No Image
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 px-2 pt-4 pb-2">
          <h1 className="text-xl font-bold text-zinc-100">{idea.title}</h1>

          <div className="text-xs text-zinc-400 space-y-0.5">
            {idea.genre && (
              <p>Genre: <span className="text-zinc-200 font-medium">{idea.genre}</span></p>
            )}
            {idea.spot && (
              <p>Spot: <span className="text-zinc-200 font-medium">{idea.spot}</span></p>
            )}
            {idea.artist && (
              <p>Role: <span className="text-zinc-200 font-medium">{idea.artist}</span></p>
            )}
            {idea.social && (
              <p>Social: <span className="text-zinc-200">{idea.social}</span></p>
            )}
          </div>

          {idea.notes && (
     <p className="text-sm text-zinc-400 border-t border-zinc-700 pt-2 mt-1 wrap-break-word">
  {idea.notes}
</p>
          )}

          <p className="text-xs text-zinc-500 mt-2">
            by <span className="text-zinc-300 font-medium">{idea.user.username}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
);
}

export default ExploreDetails;