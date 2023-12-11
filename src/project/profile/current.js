import { Link } from "react-router-dom";
import * as userclient from "../login/client";
import * as jobclient from "../jobs/client";
import * as bookmarkclient from "../bookmarks/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../login/reducer";
import * as followsClient from "../follows/client";
import 'bootstrap/dist/css/bootstrap.min.css';


function Current() {

  //const { id } = useParams();

  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [jobsCreated, setJobsCreated] = useState([]);
  const [jobsBookmarked, setJobsBookmarked] = useState([]);


  //functions
  const fetchAccount = async () => {
    const account = await userclient.account();
    dispatch(setCurrentUser(account));
  };


  const signout = async () => {
    await userclient.signout();
    dispatch(setCurrentUser(null));
    navigate("/"); //todo go home?? whatever we want ig
  };

  const fetchJobsByLocalId = async () => {
    const jobs = await jobclient.findJobsByLocalId(currentUser._id);
    console.log(jobs);
    setJobsCreated(jobs);
  }

  const fetchBookmarksByUser = async () => {
    const bookmarks = await bookmarkclient.findBookmarksByUser(currentUser._id);
    console.log(bookmarks);
    setJobsBookmarked(bookmarks);
    console.log(currentUser._id);
  }
  // const allUsers = async() => {
  //   const users = await userclient.findAllUsers();
  // }

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
 
      fetchAccount();
      if (currentUser && currentUser.role === 'JOB-POSTER') {
        fetchJobsByLocalId();
        fetchFollowing(currentUser._id);
        fetchFollowers(currentUser._id);
      }
      if (currentUser && currentUser.role === 'JOB-SEEKING') {
        fetchBookmarksByUser();
        fetchFollowing(currentUser._id);
        fetchFollowers(currentUser._id);
      }
      
    }, [currentUser._id]);


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

          {currentUser && currentUser.role === 'JOB-SEEKING' && 
        <div>
          <h4>Jobs Bookmarked</h4>
        
          {jobsBookmarked && jobsBookmarked.map((bookmark) => (
          
          <div key={bookmark._id} className="list-group-item border-0 border-bottom border-top" style={{marginBottom:'5px'}}>
              <Link style={{ textDecoration: 'none' }} to={`/details/${bookmark.job_id}`}>
                <div>Job ID: {bookmark.job_id}</div>
              </Link>

          </div>))}
        </div>}

        {currentUser && currentUser.role === 'JOB-POSTER' && 
        <div>
          <h4>Jobs Created</h4>
          {currentUser && currentUser.role === 'JOB-POSTER' && 
        <Link to="/createJob"><button className="btn btn-success" type="button">Create New Job</button></Link>}
        <br></br>
        <br></br>
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
        {currentUser &&  
      <div className="list-group">
     
{followers.map((follows) => (
          <Link
            key={follows.follower._id}
            className="list-group-item border-0 border-bottom rounded-0"
            to={`/profile/${follows.follower._id}`}
          >
            @{follows.follower.username}
          </Link>
          
        ))}

        </div> }
    </div>
  </div>
</div>
      
    </div>
  )
}

export default Current;