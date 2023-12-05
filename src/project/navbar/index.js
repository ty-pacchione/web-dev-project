import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";




function Nav() {
    //GET WHETHER U HAVE LOGGED IN OR NOT!
    
    const { currentUser } = useSelector((state) => state.usersReducer);
    const { pathname } = useLocation();

    //Do mandatory links, hide certain pages? hide certain content with role
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link className="navbar-brand" to="home" style={{paddingLeft:'15px'}}>JOBSEARCH</Link>

        <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link
                to="home"
                className={`nav-link ${pathname.includes("home") ? "active" : ""}`}>
                    Home
                </Link>      
            </li>
            <li className="nav-item">
                <Link
                to="login"
                className={`nav-link ${pathname.includes("login") ? "active" : ""}`}
                >
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link
                to="register"
                className={`nav-link ${pathname.includes("register") ? "active" : ""}`}
                >
                    Register
                </Link>
            </li>
            {currentUser && (
            <li className="nav-item">
                <Link
                to="profile"
                className={`nav-link ${pathname.includes("profile") ? "active" : ""}`}
                >
                    Profile
                </Link>
            </li>)}
            <li className="nav-item">
                <Link
                to="search"
                className={`nav-link ${pathname.includes("search") ? "active" : ""}`}
                >
                    Search
                </Link>
            </li>
        </ul>

        <span className="navbar-text ms-auto" style={{paddingRight: '15px'}}>
            {currentUser && `Currently logged in as: ${currentUser.username}`}
        </span>
        
      
    </nav>
  );
}

export default Nav;