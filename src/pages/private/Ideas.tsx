import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import type { TattooIdea } from "../../types";
import { getIdeas } from "../../services/ideas.services";
import IdeaCard from "../../components/IdeaCard";
import Loading from "../../components/Loading";

function Ideas() {
  const [ideas, setIdeas] = useState<TattooIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    getIdeas()
      .then(setIdeas)
      .catch(() => setLoadError(true))
      .then(() => setIsLoading(false));
  }, []);

  return (
    <main className="page">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="page-title">My tattoo ideas</h1>
          {!isLoading && !loadError && (
            <p className="muted mt-1 tabular-nums">
              {ideas.length} {ideas.length === 1 ? "idea" : "ideas"}
            </p>
          )}
        </div>
        <Link to="/ideas/new" className="button-primary">
          <Plus aria-hidden="true" className="size-4" />
          Add an idea
        </Link>
      </div>
      {isLoading && <Loading label="Loading your ideas…" />}
      {loadError && (
        <p role="alert" className="text-red-300">
          Couldn’t load your ideas. Refresh to try again.
        </p>
      )}
      {!isLoading && !loadError && ideas.length === 0 && (
        <p className="muted">No tattoo ideas yet.</p>
      )}
      <div className="idea-grid">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} tattooIdea={idea} />
        ))}
      </div>
    </main>
  );
}

export default Ideas;
