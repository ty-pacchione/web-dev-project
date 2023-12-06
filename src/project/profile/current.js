import { Link } from "react-router-dom";
import * as userclient from "../login/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../login/reducer";
import 'bootstrap/dist/css/bootstrap.min.css';


function Current() {
  const user = "user1" //todo remove
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.usersReducer);


  //functions
  const fetchAccount = async () => {
    const account = await userclient.account();
    setAccount(account);
  };

  const findUserById = async (id) => {
    const user = await userclient.findUserById(id);
    setAccount(user);
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
      {/* <h1>Current profile screen</h1>
      {account && (<h2>{account.username}'s profile screen!!</h2>)}
      {account && (<h3>{account.role} Account</h3>)}
      {currentUser && (<h3>Through reducer.. {currentUser.username}</h3>)}
      <Link to={user}>{user}'s profile screen</Link>
      <br/> */}
  <br></br>
  <div class="container">
  <div class="row">
    <div class="col-sm">
      <h4>Your Comments</h4>
      <br></br>
    </div>
    <div class="col-sm">
    {account && (<h3 class="pb-2">{account.username}</h3>)}
    <div class="clearfix">
      <div class="float-start">Followers: 0</div>
      <div class="float-end">Following: 0</div>
      {account && (<p>{account.role}</p>)}
    </div>
    {account && (<p>Bio: {account.bio}</p>)}
  
    {account &&  (<Link to="/edit"> <button class="btn btn-primary me-2 px-4">Edit</button></Link>)}
      {account && (<Link onClick={signout}><button class="btn btn-primary"> Sign Out</button></Link> )}
      
    </div>
    <div class="col-sm">
      <div class="row">
        <h4>Jobs Interested</h4>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        </div>
        <div class="row">
          <h4>Jobs You Applied For</h4>
        </div>
    </div>
  </div>
</div>
      
    </div>
  )
}

export default Current;