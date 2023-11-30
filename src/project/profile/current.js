import { Link } from "react-router-dom";
import * as userclient from "../login/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


function Current() {
  const user = "user1" //todo remove
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();



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
      <h1>Current profile screen</h1>
      {account && (<h2>{account.username}'s profile screen!!</h2>)}
      {account && (<h3>{account.role} Account</h3>)}
      <Link to={user}>{user}'s profile screen</Link>
      <br/>
      {account && (<button onClick={signout}> Sign Out </button>)}
    </div>
  )
}

export default Current;