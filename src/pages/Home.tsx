import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import studioPhoto from "../assets/background.png";
import { useAuth } from "../context/auth.context";
import { getIdeas } from "../services/ideas.services";
import type { TattooIdea } from "../types";
import IdeaCard from "../components/IdeaCard";
import Loading from "../components/Loading";

function Home() {
  const { isLoggedIn } = useAuth();
  const [ideas, setIdeas] = useState<TattooIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    getIdeas()
      .then(setIdeas)
      .catch(() => setLoadError(true))
      .then(() => setIsLoading(false));
  }, [isLoggedIn]);

  const recentIdeas = [...ideas]
    .sort(
      (first, second) =>
        Date.parse(second.createdAt) - Date.parse(first.createdAt),
    )
    .slice(0, 3);

  return (
    <main className="page">
      <section className={isLoggedIn ? "py-6" : "home-cover"}>
        <div className="space-y-5">
          <h1 className="cover-title">
            {isLoggedIn
              ? "What are you thinking of getting?"
              : "What’s your next tattoo?"}
          </h1>
          {!isLoggedIn && (
            <p className="muted max-w-xs text-lg">
              Got tattoo screenshots buried in your camera roll? Keep them here.
            </p>
          )}
          <Link
            to={isLoggedIn ? "/ideas/new" : "/signup"}
            className="button-primary"
          >
            {isLoggedIn ? "Add an idea" : "Sign up"}
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        {!isLoggedIn && (
          <img
            className="cover-photo"
            src={studioPhoto}
            alt="Tattoo artist at work"
            width="1280"
            height="1472"
          />
        )}
      </section>

      {isLoggedIn && (
        <section className="mt-8 border-t border-zinc-800 pt-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Your recent ideas</h2>
            <Link to="/ideas" className="muted text-sm underline">
              View all ideas
            </Link>
          </div>
          {isLoading && <Loading label="Loading your ideas…" />}
          {loadError && (
            <p role="alert" className="text-red-300">
              Couldn’t load your ideas.
            </p>
          )}
          {!isLoading && !loadError && recentIdeas.length === 0 && (
            <p className="muted">Nothing saved yet.</p>
          )}
          <div className="idea-grid">
            {recentIdeas.map((idea) => (
              <IdeaCard key={idea.id} tattooIdea={idea} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default Home;
