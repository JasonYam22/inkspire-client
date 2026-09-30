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
    <div>
      <div>
        <button onClick={handleToggleFavorite}>
  <Heart fill={isFavorite ? "currentColor" : "none"}/>
</button>
      </div>
      {tattooIdea.imageUrl && (
        <img src={tattooIdea.imageUrl} alt={tattooIdea.title} />
      )}
      <h2>{tattooIdea.title}</h2>
      {tattooIdea.genre && <p>{tattooIdea.genre}</p>}
      {tattooIdea.spot && <p>{tattooIdea.spot}</p>}
      {tattooIdea.artist && <p>{tattooIdea.artist}</p>}
{tattooIdea.social && <p>{tattooIdea.social}</p>}

   <div>
    <Link to={`/ideas/${tattooIdea.id}`}>View details</Link>
    </div>
    </div>
 
  );
}

export default IdeaCard;