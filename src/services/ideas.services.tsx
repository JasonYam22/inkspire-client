import service from "./index.services";
import type { TattooIdea, ExploreIdea } from "../types";

export const getIdeas = () =>
  service.get<TattooIdea[]>("/ideas").then((res) => res.data);

export const getIdea = (ideaId: string) =>
  service.get<TattooIdea>(`/ideas/${ideaId}`).then((res) => res.data);

export const createIdea = (formData: FormData) =>
  service.post<TattooIdea>("/ideas", formData).then((res) => res.data);

export const updateIdea = (ideaId: string, formData: FormData) =>
  service.put<TattooIdea>(`/ideas/${ideaId}`, formData).then((res) => res.data);

export const toggleFavorite = (ideaId: string, isFavorite: boolean) =>
  service
    .put<TattooIdea>(`/ideas/${ideaId}`, { isFavorite })
    .then((res) => res.data);

export const toggleIdeaPublic = (ideaId: string) =>
  service
    .patch<TattooIdea>(`/ideas/${ideaId}/toggle-public`)
    .then((res) => res.data);

export const deleteIdea = (ideaId: string) =>
  service.delete(`/ideas/${ideaId}`).then((res) => res.data);

export const getExploreIdeas = () =>
  service.get<ExploreIdea[]>("/ideas/explore").then((res) => res.data);

export const getExploreIdea = (ideaId: string) =>
  service.get<ExploreIdea>(`/ideas/${ideaId}`).then((res) => res.data);

export const getCollection = () =>
  service.get<ExploreIdea[]>("/ideas/collection").then((res) => res.data);

export const toggleSaveIdea = (ideaId: string) =>
  service
    .post<{ isSaved: boolean }>(`/ideas/explore/${ideaId}/save`)
    .then((res) => res.data);
