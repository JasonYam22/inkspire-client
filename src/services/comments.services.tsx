import service from "./index.services";
import type { Comment } from "../types";

// Get comments
export const getComments = (ideaId: string) => {
  return service
    .get<Comment[]>(`/ideas/${ideaId}/comments`)
    .then((res) => res.data);
};

// Create comment
export const createComment = (
  ideaId: string,
  commentData: { content: string },
) => {
  return service
    .post<Comment>(`/comments/${ideaId}`, commentData)
    .then((res) => res.data);
};

// Update comment
export const updateComment = (
  commentId: string,
  commentData: { content: string },
) => {
  return service
    .put<Comment>(`/comments/${commentId}`, commentData)
    .then((res) => res.data);
};

// Delete comment
export const deleteComment = (commentId: string) => {
  return service
    .delete<Comment>(`/comments/${commentId}`)
    .then((res) => res.data);
};
