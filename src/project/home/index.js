import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as jobclient from '../jobs/client';
import { useState, useEffect } from "react";
//IF NOT LOGGED IN -recent/popular jobs!
//if logged in - saved/applied to jobs!
// or jobs posted!

function Home() {
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [anonJobs, setAnonJobs] = useState([]);

  const fetchJobs = async () => {
    const jobs = await jobclient.findAllJobs();
    console.log(jobs);
    setAnonJobs(jobs);
  }


  useEffect(() => {
    
    fetchJobs();

    // if (currentUser && currentUser.role === 'JOB-POSTER') {
    //   fetchJobsByLocalId();
    // }
    // if (currentUser && currentUser.role === 'JOB-SEEKING') {
    //   fetchBookmarksByUser();
    // }
  }, []);



  return (
    <div>
      <h1>Job Search! </h1>
      {currentUser && `USER ONLY CONTENT!!!! current is ${currentUser.username}`}

      {!currentUser && 
      
      <div>
        <h2>Recently Created Jobs:</h2>
        {anonJobs && anonJobs.map((job) => (
          
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
      </div>}
     
      <br/>
      <br/>
      <Link to="/profile">Profile screen</Link><br/>
      <Link to="/search">Search screen</Link>
    </div>
  )
}

export default Home;