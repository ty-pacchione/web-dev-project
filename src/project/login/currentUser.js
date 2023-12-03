import { useEffect, useState } from "react";
import * as client from "./client";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

function CurrentUser({ children }) {
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const res = await client.account();
      dispatch(setCurrentUser(res));
      setLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return <>{!loading && children}</>;
}

export default CurrentUser;