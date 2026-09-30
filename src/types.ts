export type TattooIdea = {
  id: string;
  title: string;
  genre: string | null;
  spot: string | null;
  imageUrl: string | null;
  notes: string | null;
  isFavorite: boolean;
  artist: string | null;
  social: string | null
  userId: string;
  createdAt: string;
  updatedAt: string;
}; 

export type User = {
  id: string;
  email: string;
  username: string;
  imageUrl: string | null;
  role: string;
  createdAt: string;
};