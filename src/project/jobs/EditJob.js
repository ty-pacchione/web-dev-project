import { Link, useNavigate, useParams } from "react-router-dom";
import * as jobclient from "./client";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";



function EditJob() {
    const { jobID } = useParams();
    //get jobs info, edit then call update in jobclient
    //save button sends to details page and calls update
    //delete button sends to profile and calls delete
    //cancel sends to profile
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.usersReducer);
    const [error, setError] = useState("");
    const [jobCredentials, setJobCredentials] = useState();
    //check that userid lines up with job localid
       
    
    async function populateJobAndFilter() {
        const job = await jobclient.findJobById(jobID);
        
        console.log(job);
        
        setJobCredentials(job);

        if (currentUser && job && currentUser._id === job.local_poster_id) {
            //continue
            console.log('match');
        }
        else {
            console.log('KICKED-id didnt match or job credentials did not load');
            navigate('/login');
        }
    }
 
  
    async function editJob() {
      
      try {
            console.log(jobCredentials);
            const job = await jobclient.updateJob(jobCredentials);

            //dont need to dispatch - maybe show success? go to details page?
            navigate(`/details/${job.job_id}`);
        } catch (err) {
            //setError(err.response)
            console.log('error occurred');
        }
        
    }


    async function deleteJob() {
      
        try {
              console.log(jobCredentials);
              const response = await jobclient.deleteJob(jobCredentials);
  
              //dont need to dispatch - maybe show success? go to details page?
              navigate(`/profile`);
          } catch (err) {
              //setError(err.response)
              console.log('error occurred');
          }
          
      }
    

    useEffect(() => {
        if (!jobCredentials) {
            populateJobAndFilter();
        }
        //should have filled job now, check if NOT (job exists && job local id matches user), kick if doesnt
        
        
      }, [jobID]);

  
    return (
      <div>
        
        {error && <div>{error}</div>}
        {jobCredentials &&
        <div className="container">
          <div className="row">
            <div className="col-sm">
            </div>
            <div className="col-sm">
            <h1 className="pt-2"> Edit this Existing Job Posting</h1>
              <form className=" d-flex flex-column justify-content-center ">
        
        <div className="form-group pt-2">
          <input placeholder="Employer Name" className="form-control" value={jobCredentials.employer_name} onChange={(e) => setJobCredentials({...jobCredentials, employer_name: e.target.value})} />
        </div>
        <div className="form-group pt-3">
          <input className="form-control" placeholder="Job Title" value={jobCredentials.job_title} onChange={(e) => setJobCredentials({...jobCredentials, job_title: e.target.value})} />
        </div>
        <div className="form-group pt-3">
          <input type="text" className="form-control" placeholder="Job Description" value={jobCredentials.job_description} onChange={(e) => setJobCredentials({...jobCredentials, job_description: e.target.value})}/>
        </div>
        <div className="form-group pt-3">
          <input type="text" className="form-control" placeholder="City" value={jobCredentials.job_city} onChange={(e) => setJobCredentials({...jobCredentials, job_city: e.target.value})}/>
        </div>
        <div className="form-group pt-3">
          <input type="text" className="form-control" placeholder="State" value={jobCredentials.job_state} onChange={(e) => setJobCredentials({...jobCredentials, job_state: e.target.value})}/>
        </div>
        <div className="form-group pt-3">
          <input type="text" className="form-control" placeholder="Country" value={jobCredentials.job_country} onChange={(e) => setJobCredentials({...jobCredentials, job_country: e.target.value})}/>
        </div>
        <div className="form-group pt-3">
         
          <input type="checkbox" checked={jobCredentials.job_is_remote} id="remote" onChange={(e) => setJobCredentials({...jobCredentials, job_is_remote: e.target.checked})}/>
          <label htmlFor="remote" style={{paddingLeft: '10px'}}>Is this job remote?</label>
        </div>
        <div className="container"></div>
        
        <div className="pt-2 ">
        <button type="button" onClick={editJob} className="btn btn-primary">Save Changes</button>
        <Link to="/profile" style={{paddingLeft: '10px'}}><button className="btn btn-danger">Cancel</button></Link>
        </div>
        <br/>
        <button type="button" onClick={deleteJob} className="btn btn-danger">Delete This Job Posting</button>

        </form>
        </div>
        <div className="col-sm"></div>
      
          </div>
        </div>}
      </div>
    )
  }
  
  export default EditJob;