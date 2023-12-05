import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Account() {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };
  useEffect(() => {
    fetchAccount();
  }, []);
  const save = async () => {
    await client.updateUser(account);
  };

  return (
    <div className="w-50">
      <h1>Account</h1>
      {account && (
        <div>
          <label>Password: </label>
          <input value={account.password}
            onChange={(e) => setAccount({ ...account,
              password: e.target.value })}/>
              <br></br>
          
          <label>First Name: </label>
          <input value={account.firstName}
            onChange={(e) => setAccount({ ...account,
              firstName: e.target.value })}/> <br></br>

          <label>Last Name: </label>
          <input value={account.lastName}
            onChange={(e) => setAccount({ ...account,
              lastName: e.target.value })}/> <br></br>

          <label>Birthday:   </label>
          <input value={account.dob}
            onChange={(e) => setAccount({ ...account,
              dob: e.target.value })}/><br></br>
          <label>Email: </label>
          <input value={account.email}
            onChange={(e) => setAccount({ ...account,
              email: e.target.value })}/> <br></br>
          <label>Bio: </label>
          <input value={account.bio}
            onChange={(e) => setAccount({ ...account,
              bio: e.target.value })}/>
              <br></br>
          <Link to="/profile"><button onClick={save}>
            Save
          </button></Link>
        </div>
      )}
    </div>
  );
}
export default Account;