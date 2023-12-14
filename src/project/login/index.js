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
      <div className="container">
        <div className="row">
          <div className="col-sm">

          </div>
          <div className="col-sm">
          <h1 className="pt-2">Login</h1>
          <form className="">
            <div className="form-group pt-2 form-control-sm">
                <input placeholder="Username" className="form-control" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})} />
            </div>
            <div className=" form-group pt-3  form-control-sm pt-2">
              <input className="form-control" placeholder="Password" type="password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
            </div>
            <div className="pt-3">
              <Link to="/register"><small id="emailHelp" className="form-text text-muted">Not a User? Register Here</small></Link>
            </div>
            <div className="pt-3">
              <button onClick={signin} type="button" className="btn btn-primary ">Sign in</button>
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

export default Login;