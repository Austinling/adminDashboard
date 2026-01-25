import { createContext } from "react";

type User = {
  role: "user" | "admin" | null;
};

export const UserContext = createContext<User | null>(null);
