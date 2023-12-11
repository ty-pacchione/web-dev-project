import Login from "./login";
import Register from "./register";
import Home from "./home";
import Current from "./profile/current";
import Profile from "./profile";
import Search from "./search";
import Details from "./details";
import Edit from "./profile/edit";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css"
import store from "./store";
import { Provider } from "react-redux";
import CurrentUser from "./login/currentUser";
import Nav from "./navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedUserRoute from "./login/protectedUserRoute";
import JSearchSearch from "./search/JSearchSearch";
import CreateJob from "./jobs/CreateJob";
import ProtectedJobPosterRoute from "./login/protectedJobPosterRoute";
import EditJob from "./jobs/EditJob";

function Project() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <CurrentUser>
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="home"/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="profile" element={<ProtectedUserRoute>
                                          <Current/>
                                        </ProtectedUserRoute>}/>
        <Route path="profile/:uid" element={<Profile/>}/>
        <Route path="search" element={<JSearchSearch/>}/>
        <Route path="details/:did" element={<Details/>}/>
        <Route path="/editJob/:jobID" element={<ProtectedJobPosterRoute>
                                            <EditJob/>
                                          </ProtectedJobPosterRoute>}/>
        <Route path="edit" element={<Edit/>}/>
        <Route path="createJob" element={<ProtectedJobPosterRoute>
                                            <CreateJob/>
                                          </ProtectedJobPosterRoute>}/>

        <Route path="*" element={<div><h1>Page not found</h1></div>}/>
      </Routes>
      </CurrentUser>
    </BrowserRouter>
    </Provider>
  );
}

export default Project;
