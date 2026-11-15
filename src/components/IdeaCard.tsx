import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { TattooIdea } from "../types";

type Props = {
  tattooIdea: TattooIdea;
  to?: string;
  author?: string;
  action?: ReactNode;
};

function IdeaCard({ tattooIdea, to, author, action }: Props) {
  const details = [tattooIdea.genre, tattooIdea.spot]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="panel relative min-w-0 transition-colors hover:border-violet-300">
      <Link to={to || `/ideas/${tattooIdea.id}`} className="block rounded-lg">
        <div className="idea-image relative grid aspect-[4/3] place-items-center">
          {tattooIdea.imageUrl ? (
            <img
              src={tattooIdea.imageUrl}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <p className="muted text-sm">No photo</p>
          )}
        </div>
        <div className="space-y-1 px-1 pt-3 pb-1">
          <h2 className="break-words text-lg font-semibold">
            {tattooIdea.title}
          </h2>
          {details && <p className="muted break-words text-sm">{details}</p>}
          {author && <p className="muted break-words text-sm">By {author}</p>}
        </div>
      </Link>
      {action && <div className="absolute inset-x-3 top-3">{action}</div>}
    </article>
  );
}

export default IdeaCard;
