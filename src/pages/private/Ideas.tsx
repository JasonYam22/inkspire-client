/* import { useNavigate } from "react-router-dom" */
import service from "../../services/index.services";
import { useEffect, useState } from "react";
import type { TattooIdea } from "../../types";
import IdeaCard from "../../components/IdeaCard"
import { Link } from "react-router-dom";

function Ideas() {

/*   const navigate = useNavigate() */

  const [ideas, setIdeas] = useState<TattooIdea[]>([])

  useEffect(() => {
    service
      .get("/ideas")
      .then((response) => {
        setIdeas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


return (
  <div>
    <div>
      <h1 className="text-3xl font-bold text-zinc-900 mt-4 mb-1">
        Your Collection
      </h1>
      <p className="text-zinc-500 mb-2">
        Every tattoo idea you've saved, ready whenever you're ready to book.
      </p>
      <p className="text-zinc-400 mb-6">
        {ideas.length} saved · {ideas.filter((i) => i.isFavorite).length} favorited
      </p>
    </div>
    <div className="mb-6">
      <Link
        to="/ideas/new"
        className="inline-block bg-zinc-900 text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-zinc-700"
      >
        + Add New Idea
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} tattooIdea={idea} />
      ))}
    </div>
  </div>
);
}

export default Ideas
