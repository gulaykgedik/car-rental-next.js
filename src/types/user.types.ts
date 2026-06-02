export type AuthProvider = "credentials" | "google";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password?: string;
  image?: string;
  provider: AuthProvider;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PublicUser = Omit<IUser, "password"> & { _id: string };