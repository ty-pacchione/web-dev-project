import { useParams, Link } from "react-router-dom";
import * as userclient from '../login/client';
import * as jobclient from '../jobs/client';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as followsClient from "../follows/client";

function Profile() {
  const { uid } = useParams();
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [user, setUser] = useState();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [jobsCreated, setJobsCreated] = useState([]);

  const followUser = async (identifier, uid) => {
    const status = await followsClient.createUserFollowsUser(identifier, uid);
  }

  const unfollowUser = async (identifier, uid) => {
    const status = await followsClient.deleteUserFollowsUser(identifier, uid);
  }

  const fetchFollowing = async () => {
    const following = await followsClient.findUsersFollowedByUser(uid);
    setFollowing(following);
  };

  const fetchFollowers = async () => {
    const followers = await followsClient.findUsersFollowingUser(uid);
    setFollowers(followers);
  };

  const alreadyFollowing = () => {
    if (!currentUser) {
      return false;
    }
    return followers.find(
      (follows) => follows.follower._id === currentUser._id
    );
  };
  
  const populateUser = async () => {
    const user = await userclient.findUserById(uid);

    //CHECK IF IS JOB? NULL IF NOT
    console.log(user);
 
    setUser(user);
    if (user && user.role === 'JOB-POSTER') {
      fetchJobsByLocalId();
    }

  }

  const fetchJobsByLocalId = async () => {
    const jobs = await jobclient.findJobsByLocalId(uid);
    console.log(jobs);
    setJobsCreated(jobs);
  }

  const reloadAfterUnFollow = () => {
    unfollowUser(currentUser._id, uid);
    window.location.reload(false);
  }

  const reloadAfterFollow = () => {
    followUser(currentUser._id, uid);
    window.location.reload(false);
  }

  useEffect(() => {
      // if (!user) {
        populateUser();
      // }
      if (user && user.role === 'JOB-POSTER') {
        fetchJobsByLocalId();
        
      }
      fetchFollowing();
      fetchFollowers();
      console.log(following);
    }, [uid]);
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
              className="list-group-item border-0 border-bottom rounded-0"
              to={`/profile/${follows.followed._id}`}
            >
              @{follows.followed.username}
            </Link>
            
          ))}
              </div>
        <br></br>
      </div>
      <div className="col-sm">
      {user && (<h3 className="pb-2">{user.username}</h3>)}
      <div className="clearfix">
        <div className="float-start">Following: {following.length}</div>
        <div className="float-end">Followers: {followers.length}</div>
        {user && (<p>{user.role}</p>)}
      </div>
      {user && (<p>Bio: {user.bio}</p>)}
      {currentUser && currentUser._id !== uid && (
        <> 
        
          {alreadyFollowing() ? (
            <button onClick={reloadAfterUnFollow} className="btn btn-danger">Unfollow</button>
          ) : (
            <button onClick={reloadAfterFollow} className="btn btn-primary">
              Follow
            </button>
          )}
   
          
        </>
    )
    }
      {/* {currentUser &&  (<Link to="/edit"> <button className="btn btn-primary me-2 px-4">Edit</button></Link>)} */}
        {/* {currentUser && (<Link onClick={signout}><button className="btn btn-primary"> Sign Out</button></Link> )} */}
        <br></br>
        <br></br>
  
            {/* {currentUser && currentUser.role === 'JOB-SEEKING' && 
          <div>
            <h4>Jobs Bookmarked</h4>
  
            {jobsBookmarked && jobsBookmarked.map((bookmark) => (
            
            <div key={bookmark._id} className="list-group-item list-group-item-secondary" style={{marginBottom:'5px'}}>
                <Link style={{ textDecoration: 'none', color: 'red' }} to={`/details/${bookmark.job_id}`}>
                  <div>Job ID: {bookmark.job_id}</div>
                </Link>
  
            </div>))}
          </div>} */}
  
          {user && user.role === 'JOB-POSTER' && 
          <div>
            <h4>Jobs Created</h4>
            {jobsCreated && jobsCreated.map((job) => (
          
          <div key={job.job_id} className="list-group-item border rounded">
              <Link style={{ textDecoration: 'none', color: 'black' }} to={`/details/${job.job_id}`}>
      
                  {/* {job.employer_logo && <img className="float-start" style={{width: '150px',
                                                                            height: 'auto'}} src={job.employer_logo} />} */}
                  <h3>{job.job_title}</h3>
                  <p>{job.job_description}</p>                                           
                  <p>{job.job_city}, {job.job_state}, {job.job_country}</p>
              </Link>

          </div>))}
          
          </div>}
        
        
        
      </div>
      <div className="col-sm">
  
          <h4>Followers</h4>
          {user &&  
        <div className="list-group">
       
  {followers.map((follows) => (
            <Link
              key={follows.follower._id}
              className="list-group-item border-0  border-bottom rounded-0"
              to={`/profile/${follows.follower._id}`}
            >
              @{follows.follower.username}
            </Link>
            
          ))}
  
          </div> }
      </div>
    </div>
  </div>
        
      {/* </div>
    <div>
      <h1>{uid}'s profile screen</h1>
      <button onClick={()=>followUser(currentUser._id, uid)} className="btn btn-warning float-end">Follow</button>
      <button onClick={()=>unfollowUser(currentUser._id, uid)} className="btn btn-danger float-end">UnFollow</button>
      {user && user.username && 
      <h1>{user.username}'s Profile Screen</h1>}
      {user && user.role && 
      <div>Role: {user.role}</div>}
      {user && user.bio && 
      <div>Bio: {user.bio}</div>}
      {user && user.role && user.role === 'JOB-POSTER' &&
      <div>
        <h2>Jobs Created by {user.username}</h2>
        <div className="list-group">
          {jobsCreated && jobsCreated.map((job) => (
            
            <div key={job.job_id} className="list-group-item list-group-item-secondary">
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/details/${job.job_id}`}>
                  <h2>{job.employer_name}</h2>
                  <div>
                    {job.employer_logo && <img className="float-start" style={{width: '150px',
  height: 'auto'}} src={job.employer_logo} />}
                    <h3 className="float-start">{job.job_title}</h3>
                    
                    <div className="float-end">{job.job_id}</div>

                    <h3 className="float-end">{job.job_city}</h3>
                    <h3 className="float-end">{job.job_state}</h3>
                    <h3 className="float-end">{job.job_country}</h3>
                  </div>
                </Link>

            </div>))}
          </div>
      </div>
      }


      <Link to="/">Login screen</Link> */}
{/* import * as followsClient from "../follows/client";
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
      )} */}
    </div>
  )
}

export default Profile;