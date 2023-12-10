import { useParams, Link } from "react-router-dom";
import * as followsClient from "../follows/client";
import { setCurrentUser } from "../login/reducer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function Profile() {
  const { uid } = useParams();
  const [followers, setFollowers] = useState([]);
  const { currentUser } = useSelector((state) => state.usersReducer);

  const fetchFollowers = async (id) => {
    const followers = await followsClient.findUsersFollowingUser(id);
    setFollowers(followers);
  };

  const alreadyFollowing = () => {
    fetchFollowers(currentUser._id);
    return followers.find(
      (follows) => follows.follower._id === currentUser._id
    );
  };
  console.log("alreadyFollowing" + alreadyFollowing())
  const followUser = async (identifier, uid) => {
    const status = await followsClient.createUserFollowsUser(identifier, uid);
  }
  return (
    <div>
      <h1>{uid}'s profile screen</h1>
      <Link to="/">reen</Link>
      <button onClick={()=>followUser(currentUser._id, uid)} className="btn btn-warning float-end">Follow</button>

      {currentUser?._id !== uid && (
        <>
          {alreadyFollowing() ? (
            <button className="btn btn-danger float-end">Unfollow</button>
          ) : (
            <button onClick={()=>followUser(currentUser._id, uid)} className="btn btn-primary float-end">
              Follow
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Profile;