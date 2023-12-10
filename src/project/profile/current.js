import { Link } from "react-router-dom";
import * as userclient from "../login/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../login/reducer";
import * as followsClient from "../follows/client";
import 'bootstrap/dist/css/bootstrap.min.css';


function Current() {

  const { id } = useParams();

  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.usersReducer);


  //functions
  const fetchAccount = async () => {
    const account = await userclient.account();
    dispatch(setCurrentUser(account));
  };

  const findUserById = async (id) => {
    const user = await userclient.findUserById(id);
    dispatch(setCurrentUser(user));
  };

  const signout = async () => {
    await userclient.signout();
    dispatch(setCurrentUser(null));
    navigate("/"); //todo go home?? whatever we want ig
  };

  const allUsers = async() => {
    const users = await userclient.findAllUsers();
  }

  const fetchFollowing = async (id) => {
    const following = await followsClient.findUsersFollowedByUser(id);
    setFollowing(following);
  };

  const fetchFollowers = async (id) => {
    const followers = await followsClient.findUsersFollowingUser(id);
    setFollowers(followers);
  };
  //use effect

  useEffect(() => {
    if (id) {
        findUserById(id);
        
       
      } else {
        fetchAccount();
        fetchFollowing(currentUser._id);
        fetchFollowers(currentUser._id);
      }
      
    }, [id]);


    //console.log("followers" + followers.follows.follower.username);
  return (
    <div>
  <br></br>
  <div className="container">
  <div className="row">
    <div className="col-sm">
      <h4>Following</h4>
      <div className="list-group">

{following.map((follows) => (
          <Link
            key={follows.followed._id}
            className="list-group-item"
            to={`/profile/${follows.followed._id}`}
          >
            (@{follows.followed.username})
          </Link>
          
        ))}
            </div>
      <br></br>
    </div>
    <div className="col-sm">
    {currentUser && (<h3 className="pb-2">{currentUser.username}</h3>)}
    <div className="clearfix">
      <div className="float-start">Following: {following.length}</div>
      <div className="float-end">Followers: {followers.length}</div>
      {currentUser && (<p>{currentUser.role}</p>)}
    </div>
    {currentUser && (<p>Bio: {currentUser.bio}</p>)}
  
    {currentUser &&  (<Link to="/edit"> <button className="btn btn-primary me-2 px-4">Edit</button></Link>)}
      {currentUser && (<Link onClick={signout}><button className="btn btn-primary"> Sign Out</button></Link> )}
      <br></br>
      <br></br>
      {currentUser && 
      <><h3>Job Bookmarked</h3>

            </>
      }
      
    </div>
    <div className="col-sm">
      <div className="row">
        <h4>Followers</h4>
              
      <div className="list-group">

{followers.map((follows) => (
          <Link
            key={follows.follower._id}
            className="list-group-item"
            to={`/profile/${follows.follower._id}`}
          >
            (@{follows.follower.username})
          </Link>
          
        ))}
            </div>
        </div>
    </div>
  </div>
</div>
      
    </div>
  )
}

export default Current;