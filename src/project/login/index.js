import { Link } from "react-router-dom";
import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
  
// function Login() {
//   const [credentials, setCredentials] = useState({ username: "", password: "" });
//   const navigate = useNavigate();
//   const signin = async () => {
//     await client.signin(credentials);
//     navigate("/project/account");
//   };
//   return (
//     <div>


function Login() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signin = async () => {
    console.log(credentials);
    await client.signin(credentials);
    navigate("/profile"); //could go to profile - id ?
  };
  const signup = async () => {
    try {
      console.log(credentials);
      await client.signup(credentials);
      navigate("/profile"); // could navigate to profile-id as well
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const signupAsBusiness = async () => {
    try {
      console.log(credentials);
      credentials.role = 'JOB-POSTER';
      await client.signup(credentials);
      navigate("/profile"); // could navigate to profile-id as well
    } catch (err) {
      setError(err.response.data.message);
    }
  };


  return (
    <div>
      <h1>Login</h1>
      {/* <input value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
      <br/>
      <input value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
      <button onClick={signin}> Signin </button> */}
      <form class="">
      <div class="form-group pt-3 form-control-sm col-md-6">
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"/>
      </div>
      <div class=" form-group pt-3  form-control-sm col-md-6 pt-2">
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
      </div>
      <div class="col-md-6 pt-3">
      <Link to="/register"><small id="emailHelp" class="form-text text-muted">Not a User? Register Here</small></Link>
      </div>
      <div class="col-md-6 pt-3">
       <Link to="/home"><button type="submit" class="btn btn-primary ">Sign in</button></Link>
      </div>
    </form>
      {error && <div>{error}</div>}
      <input placeholder="Username" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
      <br/>
      <input placeholder="Password" type="password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
      <br/>
      <button onClick={signin}> Sign in </button>
      <button onClick={signup}> Sign up </button>
      <h3>To Post Positions...</h3>
      <button onClick={signupAsBusiness}> Sign up as Business</button>
      <br/>
      <br/>
      <Link to="/home">Home screen</Link><br/>
      <Link to="http://localhost:4000">Server</Link>
    </div>
  )
}

export default Login;