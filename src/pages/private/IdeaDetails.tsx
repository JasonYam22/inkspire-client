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

function IdeaDetails() {
  const { ideaId } = useParams();
  const [tattooIdea, setTattooIdea] = useState<TattooIdea | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newContent, setNewContent] = useState("");
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
      .catch((error) => {
        console.log(error);
      });

    getComments(ideaId)
      .then((data) => {
        setComments(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ideaId]);

  if (!tattooIdea) return <p className="text-amber-50">Loading...</p>;

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
    if (!ideaId || !newContent.trim()) return;

    createComment(ideaId, { content: newContent })
      .then((createdComment) => {
        setComments([...comments, createdComment]);
        setNewContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId)
      .then(() => {
        setComments(comments.filter((c) => c.id !== commentId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateComment = (commentId: string) => {
    updateComment(commentId, { content: editComment })
      .then((updatedComment) => {
        setComments(
          comments.map((c) => (c.id === commentId ? updatedComment : c)),
        );
        setEditingId(null);
        setEditComment("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen p-6">
      <Link to="/ideas" className="text-zinc-600 hover:text-zinc-900 text-sm">
        ← Back to Ideas
      </Link>

      <div className="mt-4 bg-zinc-300 rounded-2xl overflow-hidden shadow-md w-80 p-3 mx-auto">
        <div className="relative rounded-xl overflow-hidden">
          {tattooIdea.imageUrl && (
            <img
              src={tattooIdea.imageUrl}
              alt={tattooIdea.title}
              className="w-full h-56 object-cover"
            />
          )}
        </div>

        <div className="p-2 pt-4 flex flex-col gap-2">
          <h1 className="text-xl font-bold text-zinc-900">
            {tattooIdea.title}
          </h1>

          <div className="flex gap-2 flex-wrap">
            {tattooIdea.genre && (
              <span className="text-xs font-semibold uppercase tracking-wide bg-zinc-100 text-zinc-600 px-2 py-1 rounded">
                {tattooIdea.genre}
              </span>
            )}
            {tattooIdea.spot && (
              <span className="text-xs font-semibold uppercase tracking-wide bg-zinc-100 text-zinc-600 px-2 py-1 rounded">
                {tattooIdea.spot}
              </span>
            )}
          </div>

          {tattooIdea.artist && (
            <p className="text-zinc-600 text-sm">Artist: {tattooIdea.artist}</p>
          )}
          {tattooIdea.social && (
            <p className="text-zinc-600 text-sm">Social: {tattooIdea.social}</p>
          )}
          {tattooIdea.notes && (
            <p className="text-zinc-500 text-sm mt-1 border-t border-zinc-200 pt-2">
              {tattooIdea.notes}
            </p>
          )}
          <Link
            to={`/ideas/${tattooIdea.id}/edit`}
            className="mt-2 block w-full text-center py-2 text-xs font-semibold rounded-xl bg-zinc-900 text-white hover:bg-zinc-700 transition-all"
          >
            Edit idea
          </Link>

          <button
            onClick={handleTogglePublic}
            className="block w-full text-center py-2 text-xs font-semibold rounded-xl border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all"
          >
            {tattooIdea.isPublic ? "Make private" : "Make public"}
          </button>

          <button
            onClick={handleDelete}
            className="block w-full text-center py-2 text-xs font-semibold rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all"
          >
            Delete idea
          </button>
        </div>
      </div>

      <div className="mt-8 max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-lg font-bold text-zinc-900 mb-4">Comments</h3>

        <form onSubmit={handleCreateComment} className="mb-6 flex gap-2">
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Add a comment..."
            className="border border-zinc-300 p-2 rounded-xl flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <button
            type="submit"
            className="bg-zinc-900 text-white px-4 py-2 text-xs font-semibold rounded-xl hover:bg-zinc-700 transition-all"
          >
            Post
          </button>
        </form>

        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border border-zinc-200 p-3 rounded-xl"
            >
              {editingId === comment.id ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="border border-zinc-300 p-1 rounded-lg flex-1 text-sm"
                  />
                  <button
                    onClick={() => handleUpdateComment(comment.id)}
                    className="bg-emerald-600 text-white px-3 py-1 text-xs font-semibold rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-zinc-400 text-white px-3 py-1 text-xs font-semibold rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-zinc-800 text-sm">{comment.content}</p>
                  <div className="flex gap-4 mt-2 text-xs text-zinc-500">
                    <button
                      onClick={() => {
                        setEditingId(comment.id);
                        setEditComment(comment.content);
                      }}
                      className="hover:text-zinc-900 font-medium"
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
