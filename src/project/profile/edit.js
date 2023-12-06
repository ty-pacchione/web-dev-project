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
      <div class="container">
        <div class="row">
          <div class="col-sm"></div>
          <div class="col-sm">
            
          <h1 class="pt-2">Edit Your Account</h1>
            {account && (
             <form class="form-horizontal">
              <div class="form-group">
                <label class="control-label"> Password </label>
                <input class="form-control" value={account.password}
                  onChange={(e) => setAccount({
                    ...account,
                    password: e.target.value
                  })} />
                <br></br>
                </div>
                <div class="form-group">
                <label class="control-label">First Name </label>
                <input class="form-control" value={account.firstName}
                  onChange={(e) => setAccount({
                    ...account,
                    firstName: e.target.value
                  })} /> <br></br>
                </div>
                <div class="form-group">
                <label class="control-label">Last Name </label>
                <input class="form-control" value={account.lastName}
                  onChange={(e) => setAccount({
                    ...account,
                    lastName: e.target.value
                  })} /> <br></br>
                </div>
                <div class="form-group">
                <label class="control-label">Birthday   </label>
                <input class="form-control" value={account.dob}
                  onChange={(e) => setAccount({
                    ...account,
                    dob: e.target.value
                  })} /><br></br>
                </div>
                <div class="form-group">
                <label class="control-label">Email </label>
                <input class="form-control" value={account.email}
                  onChange={(e) => setAccount({
                    ...account,
                    email: e.target.value
                  })} /> <br></br>
                </div>
                <div class="form-inline">
                <label class="control-inline ">Bio </label>
                <input class="form-control form-inline" value={account.bio}
                  onChange={(e) => setAccount({
                    ...account,
                    bio: e.target.value
                  })} />
                <br></br>
                </div>
                
                <Link to="/profile"><button class="btn btn-primary" onClick={save}>
                  Save
                </button></Link>
                </form>
              )}
            </div>
            
            <div class="col-sm"></div>
          </div>
      </div>

  );
}
export default Account;