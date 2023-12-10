import { Link } from "react-router-dom";
import * as userclient from "../login/client";
import * as jobclient from "../jobs/client";
import * as bookmarkclient from "../bookmarks/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../login/reducer";
import 'bootstrap/dist/css/bootstrap.min.css';


function Current() {

  //const { id } = useParams();


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

  // const findUserById = async (id) => {
  //   const user = await userclient.findUserById(id);
  //   dispatch(setCurrentUser(user));
  // };

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

  //use effect

  useEffect(() => {
 
      fetchAccount();
      if (currentUser && currentUser.role === 'JOB-POSTER') {
        fetchJobsByLocalId();
      }
      if (currentUser && currentUser.role === 'JOB-SEEKING') {
        fetchBookmarksByUser();
      }
    }, []);



  return (
    <div>
  <br></br>
  <div className="container">
  <div className="row">
    <div className="col-sm">
      <h4>Your Comments</h4>
      <br></br>
    </div>
    <div className="col-sm">
    {currentUser && (<h3 className="pb-2">{currentUser.username}</h3>)}
    <div className="clearfix">
      <div className="float-start">Followers: 0</div>
      <div className="float-end">Following: 0</div>
      {currentUser && (<p>{currentUser.role}</p>)}
    </div>
    {currentUser && (<p>Bio: {currentUser.bio}</p>)}
  
    {currentUser &&  (<Link to="/edit"> <button className="btn btn-primary me-2 px-4">Edit</button></Link>)}
      {currentUser && (<Link onClick={signout}><button className="btn btn-primary"> Sign Out</button></Link> )}
      
    </div>
    <div className="col-sm">
      <div className="row">
        {currentUser && currentUser.role === 'JOB-SEEKING' && 
        <div>
          <h4>Jobs Bookmarked</h4>

          {jobsBookmarked && jobsBookmarked.map((bookmark) => (
          
          <div key={bookmark._id} className="list-group-item list-group-item-secondary" style={{marginBottom:'5px'}}>
              <Link style={{ textDecoration: 'none', color: 'red' }} to={`/details/${bookmark.job_id}`}>
                <div>Job ID: {bookmark.job_id}</div>
              </Link>

          </div>))}




        </div>}
        {currentUser && currentUser.role === 'JOB-POSTER' && 
        <div>
          <h4>Jobs Created</h4>
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
        
        </div>}



        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {currentUser && currentUser.role === 'JOB-POSTER' && 
        <Link to="/createJob"><button className="btn btn-success" type="button">Create New Job</button></Link>}
        <br/>
        <br/>
        </div>
        <div className="row">
          <h4>Jobs You Applied For</h4>
        </div>
    </div>
  </div>
</div>
      
    </div>
  )
}

export default Current;