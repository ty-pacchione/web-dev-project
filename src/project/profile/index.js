import { useParams, Link } from "react-router-dom";
import * as userclient from '../login/client';
import * as jobclient from '../jobs/client';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Profile() {
  const { uid } = useParams();
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [user, setUser] = useState();
  const [jobsCreated, setJobsCreated] = useState([]);

  


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

  useEffect(() => {
      if (!user) {
        populateUser();
      }
      if (user && user.role === 'JOB-POSTER') {
        fetchJobsByLocalId();
      }
      
    }, [uid]);
  return (
    <div>
      <h1>{uid}'s profile screen</h1>

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


      <Link to="/">Login screen</Link>
    </div>
  )
}

export default Profile;