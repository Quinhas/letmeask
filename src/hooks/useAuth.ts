import { useContext } from "react";
import { AuthContext } from "src/contexts/AuthContext";

export function useAuth() {
  const value = useContext(AuthContext);
  return value;
}
