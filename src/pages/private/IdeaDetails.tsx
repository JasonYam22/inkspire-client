import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    <div className="text-amber-50">
      {tattooIdea.imageUrl && (
        <img src={tattooIdea.imageUrl} alt={tattooIdea.title} />
      )}
      <h1>{tattooIdea.title}</h1>
      {tattooIdea.artist && <p>Artist: {tattooIdea.artist}</p>}
      {tattooIdea.social && <p>Social: {tattooIdea.social}</p>}
      {tattooIdea.genre && <p>Genre: {tattooIdea.genre}</p>}
      {tattooIdea.spot && <p>Spot: {tattooIdea.spot}</p>}
      {tattooIdea.notes && <p>Notes: {tattooIdea.notes}</p>}
    </div>
  );
}

export default IdeaDetails;