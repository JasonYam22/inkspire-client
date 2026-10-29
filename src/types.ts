export type TattooIdea = {
  id: string;
  title: string;
  genre: string | null;
  spot: string | null;
  imageUrl: string | null;
  notes: string | null;
  isFavorite: boolean;
  isSaved?: boolean;
  isPublic: boolean;
  artist: string | null;
  social: string | null;
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

export type ExploreIdea = TattooIdea & {
  user: { username: string; role: string };
  comments?: Comment[];
};

export type Comment = {
  id: string;
  content: string;
  tattooIdeaId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    username: string;
    imageUrl: string | null;
  };
};
