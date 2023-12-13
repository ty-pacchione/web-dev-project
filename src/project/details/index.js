import { useParams, Link } from "react-router-dom";
import { JobDetails } from "../JSearchService";
import * as bookmarkclient from '../bookmarks/client';
import * as jobclient from '../jobs/client';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";



//use id to search for details OR - if created here -  use database details
//TODO SHOULD HAVE EDIT POSSIBILITY FOR POSTER!
function Details() {
  const { did } = useParams();
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [job, setJob] = useState();
  const [bookmarked, setBookmarked] = useState();
  const [numBookmarked, setNumBookmarked] = useState(0);
  const [jobBookmarkList, setJobBookmarkList] = useState([]);
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
      <div>
        <h2>{job.employer_name}</h2>
        <div>
          
          {job.local_poster_id && job.local_poster_username &&
          <Link style={{ textDecoration: 'none', color: 'red' }} to={`/profile/${job.local_poster_id}`}>Job Poster: {job.local_poster_username}</Link>
          }
          <br/>
          {job.local_poster_id && currentUser && job.local_poster_username && job.local_poster_id === currentUser._id && 
          <Link to={`/editJob/${job.job_id}`}><button type="button" className="btn btn-warning">Edit this Posting</button></Link>
          }
          {currentUser && currentUser.role && currentUser.role === 'JOB-SEEKING' &&
          <button type="button" className="btn" onClick={handleBookmark}>{bookmarked && <FaBookmark></FaBookmark>}{!bookmarked && <FaRegBookmark></FaRegBookmark>}</button>
          }
        
        </div>
        
        
        <div>
          {job.employer_logo && <img style={{width: '150px',
  height: 'auto'}} src={job.employer_logo} />}
          <h3>{job.job_title}</h3>
          <h3>Number of Bookmarks: {numBookmarked}</h3>
          <div>Bookmarked by:</div>
          <div>
          {jobBookmarkList.map((bookmark) => (
          
          <div key={bookmark._id} className="list-group-item list-group-item-secondary" style={{marginBottom:'5px'}}>
              <Link style={{ textDecoration: 'none', color: 'red' }} to={`/profile/${bookmark.user_id}`}>
                <div>User ID: {bookmark.user_id}</div>
              </Link>

          </div>))}
          </div>
          <p>{job.job_description}</p>

          <h3 >{job.job_city} {job.job_state} {job.job_country}</h3>
    
        </div>
        <div>Job ID: {job.job_id}</div>
        
        
        </div>}

    </div>
  )
}

export default Details;