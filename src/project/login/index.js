import { Link } from "react-router-dom";
import * as client from "./client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
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



  return (
    <div>
      
      {error && <div>{error}</div>}
      <div class="container">
        <div class="row">
          <div class="col-sm">

          </div>
          <div class="col-sm">
          <h1 class="pt-2">Login</h1>
          <form class="">
            <div class="form-group pt-2 form-control-sm">
                <input placeholder="Username" class="form-control" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})} />
            </div>
            <div class=" form-group pt-3  form-control-sm pt-2">
              <input class="form-control" placeholder="Password" type="password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
            </div>
            <div class="pt-3">
              <Link to="/register"><small id="emailHelp" class="form-text text-muted">Not a User? Register Here</small></Link>
            </div>
            <div class="pt-3">
              <Link to="/home"><button onClick={signin} type="submit" class="btn btn-primary ">Sign in</button></Link>
            </div>
          </form>
          </div>
          <div class="col-sm">

          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Login;