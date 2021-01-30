import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//import './App.css';
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Home";
import Notifications from "./Components/Notifications";
import Bookmarks from "./Components/Bookmarks";
import TweetDetails from "./Components/TweetDetails";
import ViewProfile from "./Components/ViewProfile";

const App = () => {

  useEffect(() => {
    document.title = `Critter Web App`;
  }, []);

  return (
    <BrowserRouter>
        <GlobalStyles />
        <Sections>
            <Sidebar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/notifications">
                    <Notifications />
                </Route>
                <Route exact path="/bookmarks">
                    <Bookmarks />
                </Route>
                <Route exact path ="/tweet/:tweetId">
                    <TweetDetails />
                </Route>
                <Route exact path="/:handle">
                    <ViewProfile />
                </Route>
            </Switch>
        </Sections>
    </BrowserRouter>
    )
}

const Sections = styled.div`
  display: flex;
  margin: 0 auto;
`;

export default App;
