import Loading from "../../components/Loading";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getIdea,
  deleteIdea,
  toggleIdeaPublic,
} from "../../services/ideas.services";
import type { TattooIdea } from "../../types";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../../services/comments.services";
import type { Comment } from "../../types";
import { useAuth } from "../../context/auth.context";

function IdeaDetails() {
  const { ideaId } = useParams();
  const { loggedUserId } = useAuth();
  const [tattooIdea, setTattooIdea] = useState<TattooIdea | null>(null);
  const [failedIdeaId, setFailedIdeaId] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newContent, setNewContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editComment, setEditComment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!ideaId) {
      return;
    }
    getIdea(ideaId)
      .then((data) => {
        setTattooIdea(data);
      })
      .catch(() => {
        setFailedIdeaId(ideaId);
      });

    getComments(ideaId)
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ideaId]);

  if (failedIdeaId === ideaId && tattooIdea?.id !== ideaId) {
    return (
      <p role="alert" className="p-6 text-white">
        Couldn’t load this idea.
      </p>
    );
  }

  if (!tattooIdea || tattooIdea.id !== ideaId) {
    return (
      <div className="page">
        <Loading label="Loading tattoo idea…" />
      </div>
    );
  }

  const handleDelete = () => {
    if (!window.confirm("Delete this idea?")) return;

    if (!ideaId) {
      return;
    }

    deleteIdea(ideaId)
      .then(() => {
        navigate("/ideas");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleTogglePublic = () => {
    if (!ideaId) {
      return;
    }

    toggleIdeaPublic(ideaId)
      .then((updatedIdea) => {
        setTattooIdea(updatedIdea);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPosting || !ideaId || !newContent.trim()) return;

    setIsPosting(true);
    setCommentError("");

    createComment(ideaId, { content: newContent })
      .then((createdComment) => {
        setComments((currentComments) => [...currentComments, createdComment]);
        setNewContent("");
      })
      .catch(() => setCommentError("Couldn’t post your comment. Try again."))
      .then(() => setIsPosting(false));
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId)
      .then(() => {
        setComments((currentComments) =>
          currentComments.filter((comment) => comment.id !== commentId),
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateComment = (commentId: string) => {
    updateComment(commentId, { content: editComment })
      .then((updatedComment) => {
        setComments((currentComments) =>
          currentComments.map((comment) =>
            comment.id === commentId ? updatedComment : comment,
          ),
        );
        setEditingId(null);
        setEditComment("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="page">
      <Link to="/ideas" className="muted text-sm hover:underline">
        ← Back to Ideas
      </Link>

      <div className="panel mx-auto mt-4 max-w-3xl">
        <div className="idea-image">
          {tattooIdea.imageUrl && (
            <img
              src={tattooIdea.imageUrl}
              alt={tattooIdea.title}
              className="block max-h-[65vh] w-full object-contain"
            />
          )}
        </div>

        <div className="p-2 pt-4 flex flex-col gap-2">
          <h1 className="page-title">{tattooIdea.title}</h1>

          {(tattooIdea.genre || tattooIdea.spot) && (
            <p className="muted break-words text-sm">
              {[tattooIdea.genre, tattooIdea.spot].filter(Boolean).join(" · ")}
            </p>
          )}

          {tattooIdea.artist && (
            <p className="muted break-words text-sm">
              Artist: {tattooIdea.artist}
            </p>
          )}
          {tattooIdea.social && (
            <p className="muted break-words text-sm">
              Social: {tattooIdea.social}
            </p>
          )}
          {tattooIdea.notes && (
            <p className="muted mt-1 break-words border-t border-zinc-700 pt-2 text-sm">
              {tattooIdea.notes}
            </p>
          )}
          {tattooIdea.userId === loggedUserId && (
            <>
              <Link
                to={`/ideas/${tattooIdea.id}/edit`}
                className="button-primary self-start"
              >
                Edit idea
              </Link>
              <div className="relative grid w-full grid-cols-2 rounded-lg border border-zinc-700 bg-zinc-900 p-1">
                <span
                  className={`absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded motion-safe:transition-transform ${
                    tattooIdea.isPublic
                      ? "translate-x-full bg-violet-300"
                      : "translate-x-0 bg-violet-300"
                  }`}
                />

                <button
                  type="button"
                  aria-pressed={!tattooIdea.isPublic}
                  onClick={() => tattooIdea.isPublic && handleTogglePublic()}
                  className={`relative z-10 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                    !tattooIdea.isPublic
                      ? "text-zinc-950"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  Private
                </button>

                <button
                  type="button"
                  aria-pressed={tattooIdea.isPublic}
                  onClick={() => !tattooIdea.isPublic && handleTogglePublic()}
                  className={`relative z-10 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                    tattooIdea.isPublic
                      ? "text-zinc-950"
                      : "text-zinc-300 hover:text-white"
                  }`}
                >
                  Public
                </button>
              </div>

              <button
                onClick={handleDelete}
                className="block w-full text-center py-2 text-xs font-semibold rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
              >
                Delete idea
              </button>
            </>
          )}
        </div>
      </div>

      <div className="panel mx-auto mt-6 max-w-3xl">
        <h3 className="mb-4 text-lg font-semibold">Comments</h3>

        <form onSubmit={handleCreateComment} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            aria-label="Comment"
            placeholder="Add a comment…"
            disabled={isPosting}
            className="field min-w-0 flex-1"
          />
          <button
            type="submit"
            className="button-primary"
            disabled={isPosting || !newContent.trim()}
          >
            {isPosting ? "Posting…" : "Post"}
          </button>
        </form>

        {commentError && (
          <p role="alert" className="mb-4 text-sm text-red-300">
            {commentError}
          </p>
        )}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border border-zinc-700 p-3"
            >
              {editingId === comment.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="field min-w-0 flex-1"
                  />
                  <button
                    onClick={() => handleUpdateComment(comment.id)}
                    className="button-primary"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="button-secondary"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p className="break-words text-sm">{comment.content}</p>
                  {comment.userId === loggedUserId && (
                    <div className="flex gap-4 mt-2 muted text-xs">
                      <button
                        onClick={() => {
                          setEditingId(comment.id);
                          setEditComment(comment.content);
                        }}
                        className="font-medium hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="hover:text-red-600 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IdeaDetails;
