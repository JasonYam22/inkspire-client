import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import IdeaCard from "../../components/IdeaCard";
import Loading from "../../components/Loading";
import type { ExploreIdea } from "../../types";
import { getExploreIdeas, toggleSaveIdea } from "../../services/ideas.services";

function Explore() {
  const [ideas, setIdeas] = useState<ExploreIdea[]>([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [spot, setSpot] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [savingIds, setSavingIds] = useState<string[]>([]);

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        const data = await getExploreIdeas();
        setIdeas(data);
      } catch {
        setLoadError(true);
      }

      setIsLoading(false);
    };

    loadIdeas();
  }, []);

  const genres = [
    ...new Set(
      ideas
        .map((idea) => idea.genre)
        .filter((value): value is string => Boolean(value)),
    ),
  ].sort();
  const spots = [
    ...new Set(
      ideas
        .map((idea) => idea.spot)
        .filter((value): value is string => Boolean(value)),
    ),
  ].sort();
  const query = search.trim().toLowerCase();

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch = [
      idea.title,
      idea.genre,
      idea.spot,
      idea.user.username,
    ].some((value) => value?.toLowerCase().includes(query));

    return (
      matchesSearch &&
      (!genre || idea.genre === genre) &&
      (!spot || idea.spot === spot)
    );
  });

  const setSaved = (ideaId: string, isSaved: boolean) => {
    setIdeas((currentIdeas) =>
      currentIdeas.map((idea) =>
        idea.id === ideaId ? { ...idea, isSaved } : idea,
      ),
    );
  };

  const handleToggleSave = async (idea: ExploreIdea) => {
    const wasSaved = idea.isSaved === true;
    setSaveError("");
    setSavingIds((ids) => [...ids, idea.id]);

    // Update the heart right away, then check what the server saved.
    setSaved(idea.id, !wasSaved);

    try {
      const { isSaved } = await toggleSaveIdea(idea.id);
      setSaved(idea.id, isSaved);
    } catch {
      setSaved(idea.id, wasSaved);
      setSaveError(
        `Couldn’t update “${idea.title}” in your Collection. Try again.`,
      );
    }

    setSavingIds((ids) => ids.filter((id) => id !== idea.id));
  };

  return (
    <main className="page">
      <h1 className="page-title mb-6">Explore tattoos</h1>
      <div className="grid items-start gap-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <div
          role="group"
          aria-label="Search and filters"
          className="grid gap-3 border-l-2 border-violet-300 pl-4 sm:grid-cols-[2fr_1fr_1fr] lg:sticky lg:top-24 lg:grid-cols-1"
        >
          <input
            type="search"
            aria-label="Search tattoo ideas"
            placeholder="Try snake or fine line"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="field w-full"
          />
          <select
            aria-label="Filter by style"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            className="field w-full"
          >
            <option value="">All styles</option>
            {genres.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select
            aria-label="Filter by placement"
            value={spot}
            onChange={(event) => setSpot(event.target.value)}
            className="field w-full"
          >
            <option value="">All placements</option>
            {spots.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="min-w-0">
          {isLoading && <Loading label="Loading tattoo ideas…" />}
          {loadError && (
            <p role="alert" className="text-red-300">
              Couldn’t load ideas. Refresh to try again.
            </p>
          )}
          {saveError && (
            <p role="alert" className="mb-4 text-red-300">
              {saveError}
            </p>
          )}
          {!isLoading && !loadError && filteredIdeas.length === 0 && (
            <p role="status" className="muted">
              {ideas.length === 0
                ? "No public tattoos yet."
                : "No matches. Try a different search or filter."}
            </p>
          )}

          {!isLoading && !loadError && filteredIdeas.length > 0 && (
            <p role="status" className="muted mb-3 text-sm tabular-nums">
              {filteredIdeas.length}{" "}
              {filteredIdeas.length === 1 ? "result" : "results"}
            </p>
          )}

          <div className="idea-grid">
            {filteredIdeas.map((idea) => (
              <IdeaCard
                key={idea.id}
                tattooIdea={idea}
                to={`/explore/${idea.id}`}
                author={idea.user.username}
                action={
                  <button
                    type="button"
                    onClick={() => handleToggleSave(idea)}
                    disabled={savingIds.includes(idea.id)}
                    aria-label={`Save ${idea.title} to Collection`}
                    aria-pressed={idea.isSaved === true}
                    className="heart-button motion-safe:transition-transform motion-safe:active:scale-90"
                  >
                    <Heart aria-hidden="true" className="size-5" />
                  </button>
                }
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Explore;
