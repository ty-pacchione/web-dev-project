import { Link } from "react-router-dom";
import * as userclient from "../login/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../login/reducer";
import 'bootstrap/dist/css/bootstrap.min.css';


function Current() {

  const { id } = useParams();


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.usersReducer);


  //functions
  const fetchAccount = async () => {
    const account = await userclient.account();
    dispatch(setCurrentUser(account));
  };

  const findUserById = async (id) => {
    const user = await userclient.findUserById(id);
    dispatch(setCurrentUser(user));
  };

  const signout = async () => {
    await userclient.signout();
    dispatch(setCurrentUser(null));
    navigate("/"); //todo go home?? whatever we want ig
  };


  //use effect

  useEffect(() => {
    if (id) {
        findUserById(id);
      } else {
        fetchAccount();
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
        <h4>Jobs Interested</h4>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
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