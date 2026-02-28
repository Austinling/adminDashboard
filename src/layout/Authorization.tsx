import { createContext, useState } from "react";
import type { ReactNode } from "react";

type Role = {
  role: string | null;
  setRole: (userRole: string | null) => void;
};

export const UserContext = createContext<Role | undefined>(undefined);

export function ContainerContext({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  return <UserContext value={{ role, setRole }}>{children}</UserContext>;
}
