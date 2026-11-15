import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { getCollection, toggleSaveIdea } from "../../services/ideas.services";
import type { ExploreIdea } from "../../types";
import IdeaCard from "../../components/IdeaCard";
import Loading from "../../components/Loading";

function Collection() {
  const [collection, setCollection] = useState<ExploreIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [removeError, setRemoveError] = useState("");
  const [removingId, setRemovingId] = useState("");

  useEffect(() => {
    getCollection()
      .then(setCollection)
      .catch(() => setLoadError(true))
      .then(() => setIsLoading(false));
  }, []);

  const handleRemove = async (idea: ExploreIdea) => {
    setRemovingId(idea.id);
    setRemoveError("");

    try {
      const { isSaved } = await toggleSaveIdea(idea.id);
      if (!isSaved) {
        setCollection((current) =>
          current.filter((item) => item.id !== idea.id),
        );
      }
    } catch {
      setRemoveError(`Couldn’t remove “${idea.title}”. Try again.`);
    }

    setRemovingId("");
  };

  return (
    <main className="page">
      <h1 className="page-title mb-6">Saved tattoo ideas</h1>
      {isLoading && <Loading label="Loading saved ideas…" />}
      {loadError && (
        <p role="alert" className="text-red-300">
          Couldn’t load your Collection. Refresh to try again.
        </p>
      )}
      {removeError && (
        <p role="alert" className="mb-4 text-red-300">
          {removeError}
        </p>
      )}
      {!isLoading && !loadError && collection.length === 0 && (
        <div className="space-y-4">
          <p className="muted">
            Nothing saved yet. See something you like in Explore? Tap the heart.
          </p>
          <Link to="/explore" className="button-primary">
            Explore tattoo ideas
          </Link>
        </div>
      )}
      <div className="idea-grid">
        {collection.map((idea) => (
          <IdeaCard
            key={idea.id}
            tattooIdea={idea}
            to={`/explore/${idea.id}`}
            author={idea.user?.username}
            action={
              <button
                type="button"
                onClick={() => handleRemove(idea)}
                disabled={Boolean(removingId)}
                aria-busy={removingId === idea.id}
                aria-label={`Remove ${idea.title} from Collection`}
                aria-pressed="true"
                className="heart-button"
              >
                <Heart aria-hidden="true" className="size-5" />
              </button>
            }
          />
        ))}
      </div>
    </main>
  );
}

export default Collection;
