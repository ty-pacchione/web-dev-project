import { Link, useNavigate } from "react-router-dom";
import * as jobClient from "./client";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";



function CreateJob() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.usersReducer);
    const [error, setError] = useState("");
    const [jobCredentials, setJobCredentials] = useState(
        { job_id: String(Date.now()),
            local_poster_id: currentUser._id,
            local_poster_username: currentUser.username,
            employer_name: "",
            job_title: "",
            job_is_remote: false,
            job_description: "",
            job_city: "",
            job_state: "",
            job_country: "",});

    /* TO FILL IN FORM
    employer_name: String,
    job_title: String,
    job_is_remote: Boolean,
    job_description: String,
    job_city: String,
    job_state: String,
    job_country: String,
    */        
    
    
 
  
    async function create() {
      
      try {
        //document.getElementById('remote').checked
            //setJobCredentials({ ...jobCredentials, job_is_remote: document.getElementById('remote').checked});
            
            console.log(jobCredentials);
            const job = await jobClient.createJob(jobCredentials);

            //dont need to dispatch - maybe show success? go to details page?
            navigate(`/search/${job.job_id}`);
        } catch (err) {
            //setError(err.response)
        }
        
    }
    
  
    return (
      <div>
        
        {error && <div>{error}</div>}
        <div className="container">
          <div className="row">
            <div className="col-sm">
            </div>
            <div className="col-sm">
            <h1 className="pt-2"> Create a new Job Posting</h1>
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
         
          <input type="checkbox" id="remote" onChange={(e) => setJobCredentials({...jobCredentials, job_is_remote: e.target.checked})}/>
          <label htmlFor="remote" style={{paddingLeft: '10px'}}>Is this job remote?</label>
        </div>
        <div className="container"></div>
        
        <div className="pt-2 ">
        <button type="button" onClick={create} className="btn btn-primary">Create</button>
        <Link to="/profile" style={{paddingLeft: '10px'}}><button className="btn btn-danger">Cancel</button></Link>
        </div>
        </form>
        </div>
        <div className="col-sm"></div>
      
        </div>
        </div>
        </div>
    )
  }
  
  export default CreateJob;