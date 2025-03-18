import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import About from "./components/about/About";
import Admin from "./components/admin/Admin";
import ArticleDetails from "./components/article-details/ArticleDetails";
import Articles from "./components/articles/Articles";
import Contact from "./components/contact/Contact";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import Publisher from "./components/publisher/Publisher";
import Register from "./components/register/Register";
import UpcomingReleases from "./components/upcoming-releases/UpcomingReleases";
import Footer from "./components/footer/Footer";
import EditRelease from "./components/publisher/EditRelease";
import ArticleDetailsView from "./components/publisher/ArticleDetailsView";
import GamingAPIComponent from "./components/publisher/GamingAPIComponent";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/article-details" element={<ArticleDetails />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/publisher" element={<Publisher />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upcoming-releases" element={<UpcomingReleases />} />
        <Route path="/edit-releases/:id" element={<EditRelease />} />
        <Route path="/games" element={<GamingAPIComponent />} /> 

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
