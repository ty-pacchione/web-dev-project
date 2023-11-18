import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Login screen</h1>
      <Link to="/home">Home screen</Link><br/>
      <Link to="http://localhost:4000">Server</Link>
    </div>
  )
}

export default Login;