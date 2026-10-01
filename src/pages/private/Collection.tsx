import service from "../../services/index.services";
import { useEffect, useState } from "react";
import type { TattooIdea } from "../../types";
import IdeaCard from "../../components/IdeaCard";
import { Link } from "react-router-dom";

function Collection() {
  const [ideas, setIdeas] = useState<TattooIdea[]>([]);

  useEffect(() => {
    service
      .get("/ideas")
      .then((response) => {
        setIdeas(response.data.filter((idea: TattooIdea) => idea.isSaved));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mt-4 mb-1 px-6">
        Your Collection
      </h1>
      <p className="text-white/70 mb-6 px-6">
        Ideas you saved from Explore.
      </p>

      {ideas.length === 0 ? (
        <div className="px-6">
          <p className="text-sm text-white/70 mb-3">Nothing saved yet.</p>
          <Link
            to="/explore"
            className="text-sm font-semibold text-white hover:underline"
          >
            Browse Explore
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-5xl mx-auto">
 {ideas.map((idea) => (
  <IdeaCard
    key={idea.id}
    tattooIdea={idea}
    onRemove={(ideaId) =>
      setIdeas((prev) => prev.filter((i) => i.id !== ideaId))
    }
  />
))}
        </div>
      )}
    </div>
  );
}

export default Collection;