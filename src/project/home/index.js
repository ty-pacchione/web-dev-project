import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//IF NOT LOGGED IN -recent/popular jobs!
//if logged in - saved/applied to jobs!
// or jobs posted!

function Home() {
  const { currentUser } = useSelector((state) => state.usersReducer);

  return (
    <div>
      <h1>Job Search! </h1>
      {!currentUser && 'ANONYMOUS CONTENT!!!!'}
      {currentUser && `USER ONLY CONTENT!!!! current is ${currentUser.username}`}
      <br/>
      <Link to="/profile">Profile screen</Link><br/>
      <Link to="/search">Search screen</Link>
    </div>
  )
}

export default Home;