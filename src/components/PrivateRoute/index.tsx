import { Route, useHistory } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

export function PrivateRoute({ children, ...rest }: any) {
  const { user } = useAuth();
  const history = useHistory();

  if (!user) {
    history.push("/login");
  }

  return <Route {...rest} />;
}
