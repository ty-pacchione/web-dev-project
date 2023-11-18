import { Link } from "react-router-dom";

function Current() {
  const user = "user1"
  return (
    <div>
      <h1>Current profile screen</h1>
      <Link to={user}>{user}'s profile screen</Link>
    </div>
  )
}

export default Current;