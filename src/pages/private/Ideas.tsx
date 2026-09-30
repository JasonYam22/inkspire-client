/* import { useNavigate } from "react-router-dom" */
import service from "../../services/index.services";
import { useEffect, useState } from "react";
import type { TattooIdea } from "../../types";
import IdeaCard from "../../components/IdeaCard"

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
  {ideas.map((idea) => (
    <IdeaCard key={idea.id} tattooIdea={idea} />
  ))}
</div>
    </div>
  )
}

export default Ideas
