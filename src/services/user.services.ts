import service from "./index.services";
import type { User } from "../types";

export const getUser = () =>
  service.get<User>("/users/user").then((res) => res.data);

export const updateUser = (data: Partial<User>) =>
  service.put<User>("/users/user", data).then((res) => res.data);

export const uploadAvatar = (formData: FormData) =>
  service.post<{imageUrl:string}>("/users/upload", formData).then((res) => res.data);
