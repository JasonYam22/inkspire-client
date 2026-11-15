import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { deleteIdea, getExploreIdea } from "../../services/ideas.services";
import { createComment } from "../../services/comments.services";
import { useAuth } from "../../context/auth.context";
import type { ExploreIdea, Comment } from "../../types";

function ExploreDetails() {
  const { ideaId } = useParams();
  const navigate = useNavigate();
  const { loggedUserRole } = useAuth();
  const [idea, setIdea] = useState<ExploreIdea | null>(null);
  const [failedIdeaId, setFailedIdeaId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (!ideaId) return;
    getExploreIdea(ideaId)
      .then((data) => setIdea(data))
      .catch(() => setFailedIdeaId(ideaId));
  }, [ideaId]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this public idea?")) return;

    setIsDeleting(true);
    setDeleteError("");

    try {
      await deleteIdea(id);
      navigate("/explore", { replace: true });
    } catch {
      setDeleteError("Couldn’t delete this idea.");
      setIsDeleting(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPosting || !newComment.trim() || !idea?.id) return;

    setIsPosting(true);
    setCommentError("");

    try {
      const savedComment: Comment = await createComment(idea.id, {
        content: newComment,
      });
      setIdea((currentIdea) => {
        if (!currentIdea || currentIdea.id !== savedComment.tattooIdeaId) {
          return currentIdea;
        }

        const existingComments = currentIdea.comments || [];
        return {
          ...currentIdea,
          comments: [savedComment, ...existingComments],
        };
      });
      setNewComment("");
    } catch {
      setCommentError("Couldn’t post your comment. Try again.");
    }

    setIsPosting(false);
  };

  if (failedIdeaId === ideaId && idea?.id !== ideaId) {
    return (
      <p role="alert" className="text-white p-6">
        Couldn’t load this idea.
      </p>
    );
  }

  if (!idea || idea.id !== ideaId)
    return (
      <div className="page">
        <Loading label="Loading tattoo idea…" />
      </div>
    );

  return (
    <div className="page">
      <div className="mx-auto max-w-3xl">
        <Link to="/explore" className="text-zinc-400 hover:text-white text-sm">
          ← Back to Explore
        </Link>

        <div className="panel mt-4">
          <div className="idea-image">
            {idea.imageUrl ? (
              <img
                src={idea.imageUrl}
                alt={idea.title}
                className="block max-h-[65vh] w-full object-contain"
              />
            ) : (
              <div className="muted grid min-h-36 place-items-center text-sm">
                No photo
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 px-2 py-5 sm:px-5">
            <h1 className="page-title">{idea.title}</h1>

            {loggedUserRole === "ADMIN" && idea.isPublic && (
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Link
                  to={`/ideas/${idea.id}/edit`}
                  state={{ fromExplore: true }}
                  className="text-zinc-200 hover:underline"
                >
                  Edit idea
                </Link>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => handleDelete(idea.id)}
                  className="text-red-300 hover:underline disabled:opacity-50"
                >
                  {isDeleting ? "Deleting…" : "Delete idea"}
                </button>
                {deleteError && (
                  <p role="alert" className="text-red-300">
                    {deleteError}
                  </p>
                )}
              </div>
            )}

            <div className="muted space-y-1 break-words text-sm">
              {(idea.genre || idea.spot) && (
                <p>{[idea.genre, idea.spot].filter(Boolean).join(" · ")}</p>
              )}{" "}
              {idea.artist && (
                <p>
                  Artist:{" "}
                  <span className="text-zinc-200 font-medium">
                    {idea.artist}
                  </span>
                </p>
              )}
              {idea.social && (
                <p>
                  Social: <span className="text-zinc-200">{idea.social}</span>
                </p>
              )}
            </div>

            {idea.notes && (
              <p className="text-sm text-zinc-400 border-t border-zinc-700 pt-2 mt-1 wrap-break-word">
                {idea.notes}
              </p>
            )}

            <p className="muted text-sm">
              by{" "}
              <span className="text-zinc-300 font-medium">
                {idea.user.username}
              </span>
            </p>

            <div className="mt-4 border-t border-zinc-700/80 pt-3">
              <h2 className="mb-3 text-lg font-semibold tabular-nums">
                Comments ({idea.comments?.length || 0})
              </h2>

              <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-3">
                <input
                  type="text"
                  aria-label="Comment"
                  placeholder="Add a comment…"
                  disabled={isPosting}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="field min-w-0 flex-1"
                />
                <button
                  type="submit"
                  className="button-primary"
                  disabled={isPosting || !newComment.trim()}
                >
                  {isPosting ? "Posting…" : "Post"}
                </button>
              </form>

              {commentError && (
                <p role="alert" className="mb-3 text-sm text-red-300">
                  {commentError}
                </p>
              )}
              <div className="space-y-2">
                {idea.comments && idea.comments.length > 0 ? (
                  idea.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-zinc-900/50 border border-zinc-700/50 rounded-xl p-2 text-xs"
                    >
                      <span className="font-semibold text-zinc-200">
                        {comment.user?.username || "Anonymous"}
                      </span>
                      <p className="text-zinc-400 break-words">
                        {comment.content}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="muted py-2 text-sm">No comments yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreDetails;
