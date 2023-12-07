import * as client from "../login/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../login/reducer";
function Account() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [editAccount, setEditAccount] = useState(currentUser);


  
  const fetchAccount = async () => {
    const account = await client.account();
    dispatch(setCurrentUser(account));
  };

  const updateAccount = async (acc) => {
    const account = await client.updateUser(acc);
    dispatch(setCurrentUser(account));
  };


  useEffect(() => {
    fetchAccount();
  }, []);


  const save = async () => {
    updateAccount(editAccount);
  };

  return (
      <div className="container">
        <div className="row">
          <div className="col-sm"></div>
          <div className="col-sm">
            
          <h1 className="pt-2">Edit Your Account</h1>
            {currentUser && (
             <form className="form-horizontal">
              <div className="form-group">
                <label className="control-label"> Password </label>
                <input className="form-control" value={editAccount.password}
                  onChange={(e) => setEditAccount({
                    ...editAccount,
                    password: e.target.value
                  })} />
                <br></br>
                </div>
                <div className="form-group">
                <label className="control-label">First Name </label>
                <input className="form-control" value={editAccount.firstName}
                  onChange={(e) => setEditAccount({
                    ...editAccount,
                    firstName: e.target.value
                  })} /> <br></br>
                </div>
                <div className="form-group">
                <label className="control-label">Last Name </label>
                <input className="form-control" value={editAccount.lastName}
                  onChange={(e) => setEditAccount({
                    ...editAccount,
                    lastName: e.target.value
                  })} /> <br></br>
                </div>
                <div className="form-group">
                <label className="control-label">Birthday   </label>
                <input className="form-control" value={editAccount.dob}
                  onChange={(e) => setEditAccount({
                    ...editAccount,
                    dob: e.target.value
                  })} /><br></br>
                </div>
                <div className="form-group">
                <label className="control-label">Email </label>
                <input className="form-control" value={editAccount.email}
                  onChange={(e) => setEditAccount({
                    ...editAccount,
                    email: e.target.value
                  })} /> <br></br>
                </div>
                <div className="form-inline">
                <label className="control-inline ">Bio </label>
                <input className="form-control form-inline" value={editAccount.bio}
                  onChange={(e) => setEditAccount({
                    ...editAccount,
                    bio: e.target.value
                  })} />
                <br></br>
                </div>
                
                <Link to="/profile"><button className="btn btn-primary" onClick={save}>
                  Save
                </button></Link>
                </form>
              )}
            </div>
            
            <div className="col-sm"></div>
          </div>
      </div>

  );
}
export default Account;