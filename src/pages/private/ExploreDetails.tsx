import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getExploreIdea } from "../../services/ideas.services";
import { createComment } from "../../services/comments.services";
import type { ExploreIdea, Comment } from "../../types";

function ExploreDetails() {
  const { ideaId } = useParams();
  const [idea, setIdea] = useState<ExploreIdea | null>(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!ideaId) return;
    getExploreIdea(ideaId)
      .then((data) => setIdea(data))
      .catch((error) => console.log(error));
  }, [ideaId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !idea?.id) return;

    try {
      const savedComment: Comment = await createComment(idea.id, {
        content: newComment,
      });
      setIdea((prev) =>
        prev
          ? { ...prev, comments: [savedComment, ...(prev.comments || [])] }
          : prev,
      );
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!idea) return <p className="text-white p-6">Loading...</p>;

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Link to="/explore" className="text-zinc-400 hover:text-white text-sm">
          ← Back to Explore
        </Link>

        <div className="mt-4 bg-zinc-800/70 backdrop-blur-md border border-zinc-700 rounded-3xl p-3 shadow-lg">
          <div className="h-64 rounded-2xl overflow-hidden bg-zinc-700">
            {idea.imageUrl ? (
              <img
                src={idea.imageUrl}
                alt={idea.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs font-medium uppercase tracking-wider">
                No Image
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 px-2 pt-4 pb-2">
            <h1 className="text-xl font-bold text-zinc-100">{idea.title}</h1>

            <div className="text-xs text-zinc-400 space-y-0.5">
              {idea.genre && (
                <p>
                  Genre:{" "}
                  <span className="text-zinc-200 font-medium">
                    {idea.genre}
                  </span>
                </p>
              )}
              {idea.spot && (
                <p>
                  Spot:{" "}
                  <span className="text-zinc-200 font-medium">{idea.spot}</span>
                </p>
              )}
              {idea.artist && (
                <p>
                  Role:{" "}
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

            <p className="text-xs text-zinc-500 mt-2">
              by{" "}
              <span className="text-zinc-300 font-medium">
                {idea.user.username}
              </span>
            </p>

            <div className="mt-4 border-t border-zinc-700/80 pt-3">
              <h2 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2 px-1">
                Comments ({idea.comments?.length || 0})
              </h2>

              <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 bg-zinc-900/80 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition"
                />
                <button
                  type="submit"
                  className="bg-zinc-100 text-zinc-900 font-medium px-3 py-1.5 rounded-xl text-xs hover:bg-white transition"
                >
                  Post
                </button>
              </form>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
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
                  <p className="text-xs text-zinc-500 text-center py-2 italic">
                    No comments yet.
                  </p>
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
