import Login from "./login";
import Home from "./home";
import Current from "./profile/current";
import Profile from "./profile";
import Search from "./search";
import Details from "./details";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css"

function Project() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="login"/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="profile" element={<Current/>}/>
        <Route path="profile/:uid" element={<Profile/>}/>
        <Route path="search" element={<Search/>}/>
        <Route path="details/:did" element={<Details/>}/>
        <Route path="*" element={<div><h1>Page not found</h1></div>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Project;
