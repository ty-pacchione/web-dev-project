import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as jobclient from '../jobs/client';
import { useState, useEffect } from "react";
import * as bookmarkclient from "../bookmarks/client";
import { FaBookmark } from "react-icons/fa";


//IF NOT LOGGED IN -recent/popular jobs!
//if logged in - saved/applied to jobs!
// or jobs posted!

function Home() {
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [anonJobs, setAnonJobs] = useState([]);
  const [jobsCreated, setJobsCreated] = useState([]);
  const [jobsBookmarked, setJobsBookmarked] = useState([]);


  const fetchJobs = async () => {
    const jobs = await jobclient.findAllJobs();
    console.log(jobs);
    setAnonJobs(jobs);
  }

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

  useEffect(() => {
    
    
    fetchJobs();
    
    
    if (currentUser && currentUser.role === 'JOB-POSTER') {
      fetchJobsByLocalId();
    }
    if (currentUser && currentUser.role === 'JOB-SEEKING') {
      fetchBookmarksByUser();
    }
  }, []);



  return (
    <div>
      <h1 style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif', marginTop: '20px'}}>JobSearch! </h1>
      <br/>
      {currentUser && currentUser.role === 'JOB-POSTER' && 
      <div>
        <h3 style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}>Jobs You've Posted:</h3>
        <div className="d-flex flex-row flex-wrap justify-content-center" style={{margin: '30px'}}>
        {jobsCreated && jobsCreated.map((job) => (
          
          <div key={job.job_id} className="card" style={{"width": "250px", "margin-bottom": "30px",
           "margin-right": "30px", 'background-color': 'lightcyan'}}>
            <div className="card-body" >
              <Link style={{ textDecoration: 'none', color: 'black' }} to={`/details/${job.job_id}`}>
                <h3 style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}>{job.employer_name}</h3>
                <div>
                  <h4 className="" style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}>{job.job_title}</h4>

                  <div>{job.job_country} {job.job_state} {job.job_city}</div>
                  <div>Job ID: {job.job_id}</div>
                </div>
              </Link>
            </div>
          </div>))}
        </div>
      </div>
      }




      {currentUser && currentUser.role === 'JOB-SEEKING' &&
      <div>
        <h3 style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}>Jobs You've Bookmarked:</h3>
        <div style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}>Click Bookmark to Jump to Job Details!</div>
        <div className="list-group w-50" style={{margin: 'auto'}}>
          {jobsBookmarked && jobsBookmarked.map((bookmark) => (
          
          
          <Link key={bookmark._id} style={{ textDecoration: 'none', color: 'red' }} to={`/details/${bookmark.job_id}`}>
            <div className="list-group-item list-group-item-secondary" style={{marginBottom:'1px' }}>
                <div style={{ textDecoration: 'none', color: 'red' }}><FaBookmark></FaBookmark> Job ID: {bookmark.job_id}</div>
              </div>
          </Link>))}
        </div>
      </div>
      }




      {
      
      <div>
        <h3 style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}>Recently Created Jobs:</h3>
        <div className="d-flex flex-row flex-wrap justify-content-center" style={{margin: '30px'}}>

        {anonJobs && anonJobs.map((job) => (
          
          <div key={job.job_id} className="card" style={{"width": "250px", "margin-bottom": "30px",
           "margin-right": "30px", 'background-color': 'lightgrey'}}>
            <div className="card-body" >
              <Link style={{ textDecoration: 'none', color: 'black' }} to={`/details/${job.job_id}`}>
                <h3 style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}>{job.employer_name}</h3>
                <div>
                  <h4 className="" style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}>{job.job_title}</h4>

                  <div>{job.job_country} {job.job_state} {job.job_city}</div>
                  <div>Job ID: {job.job_id}</div>
                </div>
              </Link>
            </div>
          </div>))}
        </div>
      </div>}

      <br/>
      <br/>
      {!currentUser && 
      <div>
        <Link to="/register">
      <small id="emailHelp" className="form-text text-muted">JobSearch is best when you have an account! Click here to sign up.</small></Link>
      
        </div>}
     
      <br/>
      <br/>
      
    </div>
  )
}

export default Home;