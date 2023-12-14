import { Link } from "react-router-dom";
import * as client from "../login/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../login/reducer";
  
function Register() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "", firstName: "", email: "", lastName: ""});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signin = async () => {
    console.log(credentials);
    const user = await client.signin(credentials);
    dispatch(setCurrentUser(user));
    navigate("/profile"); //could go to profile - id ?
  };

  const signup = async () => {
    try {
      console.log(credentials);
      const user = await client.signup(credentials);
      dispatch(setCurrentUser(user));
      navigate("/profile"); // could navigate to profile-id as well
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  async function posterOrUser() {
    if (document.querySelector('input[id="inlineCheckbox1"]:checked') !== null) {
        try {
          console.log(credentials);
          const user = await client.signup(credentials);
          dispatch(setCurrentUser(user));
          navigate("/profile"); // could navigate to profile-id as well
        } catch (err) {
          setError(err.response.data.message);
        }
    }
    if (document.querySelector('input[id="inlineCheckbox2"]:checked') !== null) {
        try {
          console.log(credentials);
          credentials.role = 'JOB-POSTER';
          const user = await client.signup(credentials);
          dispatch(setCurrentUser(user));
          navigate("/profile"); // could navigate to profile-id as well
        } catch (err) {
          setError(err.response.data.message);
        }
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
          <h1 className="pt-2"> Register</h1>
            <form className=" d-flex flex-column justify-content-center ">
      
      <div className="form-group pt-2">
        <input placeholder="Username" className="form-control" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})} />
      </div>
      <div className="form-group pt-3">
        <input className="form-control" placeholder="Password" type="password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
      </div>
      <div className="form-group pt-3">
        <input type="text" className="form-control" id="firstName" aria-describedby="emailHelp" placeholder="First Name" value={credentials.firstName} onChange={(e) => setCredentials({...credentials, firstName: e.target.value})}/>
      </div>
      <div className="form-group pt-3">
        <input type="text" className="form-control" id="firstName" aria-describedby="emailHelp" placeholder="Last Name" value={credentials.lastName} onChange={(e) => setCredentials({...credentials, lastName: e.target.value})}/>
      </div>
      <div className="form-group pt-3">
        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})}/>
      </div>
      <div className="container">
</div>
      <div className="pt-2">
        <label>Which account type do you want?</label>
        <br/>
        <div className="form-check form-check-inline pt-2">
            <input className="form-check-input" type="radio" name="role" id="inlineCheckbox1" />
            <label className="form-check-label" htmlFor="inlineCheckbox1">Job Seeker</label>
        </div>
        <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="role" id="inlineCheckbox2" />
            <label className="form-check-label" htmlFor="inlineCheckbox2">Job Poster</label>
        </div>
      </div>
      <div className="form-group pt-1">
      <Link to="/login">
      <small id="emailHelp" className="form-text text-muted">Already a User? Sign-in Here</small></Link>
      <br/>
      </div>
      <div className="pt-2 ">
      <Link to="/profile"><button type="button" onClick={posterOrUser} className="btn btn-primary">Register</button></Link>
      </div>
      </form>
      </div>
      <div className="col-sm">
          </div>
    
    </div>
    </div>
    </div>
  )
}

export default Register;