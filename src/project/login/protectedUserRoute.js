import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedUserRoute({ children }) {
  const { currentUser } = useSelector((state) => state.usersReducer);
  if (currentUser) { //IF IS USER - MAY SHOW ELSE REROUTE
    return children;
  }
  return <Navigate to="../login"/>;
}

export default ProtectedUserRoute;