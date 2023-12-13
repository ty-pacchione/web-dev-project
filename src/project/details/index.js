import { useParams, Link } from "react-router-dom";
import { JobDetails } from "../JSearchService";
import * as bookmarkclient from '../bookmarks/client';
import * as jobclient from '../jobs/client';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark, FaMapMarkerAlt } from "react-icons/fa";
import * as loginclient from '../login/client';

//use id to search for details OR - if created here -  use database details
//TODO SHOULD HAVE EDIT POSSIBILITY FOR POSTER!
function Details() {
  const { did } = useParams();
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [job, setJob] = useState();
  const [bookmarked, setBookmarked] = useState();
  const [numBookmarked, setNumBookmarked] = useState(0);
  const [jobBookmarkList, setJobBookmarkList] = useState([]);
  const [bookmarkUsers, setBookmarkUsers] = useState(jobBookmarkList);

  const populateJob = async () => {
    var job = await jobclient.findJobById(did);
    //CHECK IF IS JOB? NULL IF NOT
    console.log(job);
    if (!job) {
      //must populate from remote api
      const jobArr = await JobDetails(did);
      job = jobArr.data[0];
      console.log(job);
    }
    setJob(job);
  }

  const populateBookmarked = async () => {
    if (currentUser && currentUser.role && currentUser.role === 'JOB-SEEKING') {
      const bookmark = await bookmarkclient.findBookmark(did, currentUser._id);
      setBookmarked(!!bookmark); //truthy - will be true if exists, false otherwise
    }
  }

  const populateNumBookmarked = async () => {
    const bookmarks = await bookmarkclient.findBookmarksByJob(did);
    console.log(bookmarks);
    setNumBookmarked(bookmarks.length);
    setJobBookmarkList(bookmarks);
    populateBookmarkedUsers(bookmarks);
  }

  // Couldn't figure out how to do this with Array.map
  const populateBookmarkedUsers = async (bookmarks) => {
    let users = [];
    for (let i = 0; i < bookmarks.length; i++) {
      users = [...users, await loginclient.findUserById(bookmarks[i].user_id)]
    }
    setBookmarkUsers(users);
  }

  const handleBookmark = async () => {
    console.log(bookmarked);
    if (bookmarked) {
      //delete bookmark
      //set local to false
      const response = await bookmarkclient.deleteBookmark(did, currentUser._id);
      console.log(response);
      setBookmarked(false);
    } else {
      //create bookmark
      //set local to true
      const bookmark = await bookmarkclient.createBookmark(did, currentUser._id);
      console.log(bookmark);
      setBookmarked(!!bookmark); //truthy, sets to response - true
    }
    populateNumBookmarked();
    //set as opposite in db (delete or create this bookmark based on users id and jobs id)

    //set local as opposite
  }

  //check if bookmarked on click of bookmark - 

  //fetch details - check whether id exists in local jobs, otherwise request
  //to make local ids for new posts - add field local? and switch color of bookmark based on it

  //get crud ready for local jobs - include JOBID JOB DESCRIPTION
  //city, country, state, employer name

  useEffect(() => {
    if (!job) {
      populateJob();
    }
    //check for bookmark details if seeker
    //set bookmark based on that
    if (currentUser && currentUser.role && currentUser.role === 'JOB-SEEKING') {
      populateBookmarked();
    }
    populateNumBookmarked();
  }, [did]);

  return (
    <div>
      {job &&
        <div class="container" style={{ marginTop: '50px' }}>
          <div class="row">
            <div class="col-8">
              {job.employer_logo && <img style={{
                width: '150px',
                height: 'auto',
                float: "left"
              }} src={job.employer_logo} />}
              <h2>{job.job_title}</h2>
              <div>
                {job.local_poster_id && job.local_poster_username &&
                  <h3>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/profile/${job.local_poster_id}`}>
                      {job.local_poster_username}
                    </Link>
                  </h3>
                }
              </div>
              <div style={{ margin: '10px' }}>
                {job.local_poster_id && currentUser && job.local_poster_username && job.local_poster_id === currentUser._id &&
                  <Link to={`/editJob/${job.job_id}`} style={{ textDecoration: 'none', color: 'red' }}>
                    Edit This Posting
                  </Link>
                }
              </div>
              <h5>{job.job_city}, {job.job_state}, {job.job_country} <FaMapMarkerAlt style={{ color: 'red' }} /></h5>
              <div style={{ marginTop: '5px', backgroundColor: "lightgray", borderStyle: "solid", borderColor: "gray", borderRadius: "5px", float: "left", width: "100%" }}>
                <h6 style={{ margin: '8px' }}>Description</h6>
                <hr style={{ margin: '0px' }} />
                <p style={{ margin: '12px', textAlign: 'left' }}>
                  {job.job_description}
                </p>
              </div>
            </div>
            <div class="col-4">
              {currentUser && currentUser.role && currentUser.role === 'JOB-SEEKING' &&
                <button type="button" className="btn" onClick={handleBookmark}>
                  <h4><div style={{ float: "left", marginRight: "5px" }}>Bookmark</div>
                    {bookmarked && <FaBookmark style={{ color: "blue" }} />}
                    {!bookmarked && <FaRegBookmark style={{ color: "black" }} />}
                  </h4>
                </button>
              }
              <h6>Bookmarks ({numBookmarked}):</h6>
              <div class="list-group">
                {bookmarkUsers.map((user) => (
                  <div key={user._id} className="list-group-item list-group-item-secondary" style={{ marginBottom: '5px' }}>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/profile/${user._id}`}>
                      <div>@{user.username}</div>
                    </Link>
                  </div>))}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Details;