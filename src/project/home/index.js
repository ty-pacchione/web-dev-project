import { Link } from "react-router-dom";

//IF NOT LOGGED IN -recent/popular jobs!
//if logged in - saved/applied to jobs!
// or jobs posted!

function Home() {
  return (
    <div>
      <h1>Job Search! </h1>

      <Link to="/profile">Profile screen</Link><br/>
      <Link to="/search">Search screen</Link>
    </div>
  )
}

export default Home;