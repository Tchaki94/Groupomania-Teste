import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from './img/logo.png';

import { BrowserRouter as Router } from "react-router-dom";
import AuthService from "./services/auth.service";

import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Post"

import BoardUser from "./components/Users/BoardUser";

import EventBus from "./common/EventBus";

const App = () => {

    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        setCurrentUser(user);
      }
  
      EventBus.on("logout", () => {
        logOut();
      });
  
      return () => {
        EventBus.remove("logout");
      };
    }, []);
  
    const logOut = () => {
      AuthService.logout();
      setCurrentUser(undefined);
    };


    return (
      <Router>
        <header className="home-header">
          <img className="img-groupo" alt="logo" src={logo}
              ></img>
          {currentUser && (
              <div className="header-navbar">
              <Link to={"/home"} className="header-navbar-links">
                Accueil
              </Link>
  
          
              <div className="header-user">
                <Link to={"/user"} className="header-navbar-links">
                  Profil
                </Link>
                <Link to={"/post"} className="header-navbar-links">
                Post
                </Link>
              </div>
          </div>
          )}
  
          {currentUser ? (
            <div className="header-navbar">
                <Link to={"/profile"} className="header-navbar-links">
                  {currentUser.name}
                </Link>
                <a href="/login" className="header-navbar-links" onClick={logOut}>
                  Déconnexion
                </a>
            </div>
          ) : (
            <div className="header-navbar">
                <Link to={"/login"} className="header-navbar-links">
                  Connexion
                </Link>
                <Link to={"/register"} className="header-navbar-links">
                  S'inscrire
                </Link>
            </div>
          )}
        </header>

  
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" render={(props) => <Login  {...props} set={setCurrentUser} /> } />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/post" component={Posts} />
            <Route path="/user" render={(props) => <BoardUser {...props} logOut={logOut} />}  />
          </Switch>
        </div>
  
        {/* <AuthVerify logOut={logOut}/> */}
      </Router>
    );
}

export default App;
