import { useParams, Link } from "react-router-dom";

function Profile() {
  const { uid } = useParams();
  return (
    <div>
      <h1>{uid}'s profile screen</h1>
      <Link to="/">Login screen</Link>
    </div>
  )
}

export default Profile;