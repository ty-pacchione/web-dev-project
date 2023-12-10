import { useParams, Link } from "react-router-dom";

function Details() {
  const { did } = useParams();


  return (
    <div>
      <h1>Details screen for {did}</h1>
      <Link to="/">Login screen</Link>
  
    </div>
  )
}

export default Details;