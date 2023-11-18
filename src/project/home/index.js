import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home screen</h1>
      <Link to="/profile">Profile screen</Link><br/>
      <Link to="/search">Search screen</Link>
    </div>
  )
}

export default Home;