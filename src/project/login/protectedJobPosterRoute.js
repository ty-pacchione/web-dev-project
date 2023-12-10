import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedJobPosterRoute({ children }) {
  const { currentUser } = useSelector((state) => state.usersReducer);
  if (currentUser.role === "JOB-POSTER") { //IF IS USER - MAY SHOW ELSE REROUTE
    return children;
  }
  return <Navigate to="../login"/>;
}

export default ProtectedJobPosterRoute;