import { useSelector } from "react-redux";
import { selectIsLoggedin } from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";

export function RestrictedRoute({ component, redirectTo }) {
  const isLoggedin = useSelector(selectIsLoggedin);
  
  return isLoggedin ? <Navigate to={redirectTo} /> : component;
}

export function PrivateRoute({ component, redirectTo }) {
  const isLoggedin = useSelector(selectIsLoggedin);
  return isLoggedin ? component : <Navigate to={redirectTo} />;
}
