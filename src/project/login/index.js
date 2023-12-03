import { Link } from "react-router-dom";
import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";


function Login() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
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

  const signupAsBusiness = async () => {
    try {
      console.log(credentials);
      credentials.role = 'JOB-POSTER';
      const user = await client.signup(credentials);
      dispatch(setCurrentUser(user));
      navigate("/profile"); // could navigate to profile-id as well
    } catch (err) {
      setError(err.response.data.message);
    }
  };


  return (
    <div>
      <h1>Login screen</h1>
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