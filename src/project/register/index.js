import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
  
function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form class=" d-flex flex-column justify-content-center ">
      <div class="form-group pt-3  col-md-6">
        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username"/>
      </div>
      <div class="form-group pt-3 col-md-6">
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
      </div>
      <div class="form-group pt-3 col-md-6">
        <input type="text" class="form-control" id="firstName" aria-describedby="emailHelp" placeholder="First Name"/>
      </div>
      <div class="form-group pt-3 col-md-6">
        <input type="text" class="form-control" id="firstName" aria-describedby="emailHelp" placeholder="Last Name"/>
      </div>
      <div class="form-group pt-3 col-md-6">
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email"/>
      </div>
      <div class="container">
</div>
      <div class="pt-2 col-md-6">
        <label for="exampleInputEmail1">Which account type do you want?</label>
        <br/>
        <div class="form-check form-check-inline pt-2">
            <input class="form-check-input" type="radio" name="role" id="inlineCheckbox1" value="option1"/>
            <label class="form-check-label" for="inlineCheckbox1">Job Seeker</label>
        </div>
        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="role" id="inlineCheckbox1" value="option2"/>
            <label class="form-check-label" for="inlineCheckbox2">Job Poster</label>
        </div>
      </div>
      <div class="form-group pt-1 col-md-6">
      <Link to="/login">
      <small id="emailHelp" class="form-text text-muted">Already a User? Sign-in Here</small></Link>
      <br/>
      </div>
      <div class="pt-2  col-md-6">
      <Link to="/home"><button type="submit" class="btn btn-primary">Register</button></Link>
      </div>
    </form>
    </div>
  )
}

export default Register;