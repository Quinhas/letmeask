import { useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useAuth } from "src/hooks/useAuth";

export function PrivateRoute({ children, ...rest }: any) {
  const { user } = useAuth();
  const history = useHistory();
  useEffect(() => {
    console.log(user);
  }, [user]);

  if (!user) {
    history.push("/login");
  }

  return <Route {...rest} render={() => children} />;
}
