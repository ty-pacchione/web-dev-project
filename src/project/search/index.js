import { Link } from "react-router-dom";
import JSearchSearch from './JSearchSearch';

function Search() {

  const item = "item1";
  const details_route = "/details/" + item;
  return (
    <div>
      <h1>Search screen</h1>
      <Link to={details_route}>Details screen for {item}</Link>
      <JSearchSearch/>
    </div>
  )
}

export default Search;