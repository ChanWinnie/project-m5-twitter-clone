import React, { useState, useEffect } from "react";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState();
    const [ status, setStatus ] = useState("loading");
    const [ serverError, setServerError ] = useState(false); 
    const [ tweetsById, setTweetsById ] = useState();
    const [ tweetIds, setTweetIds ] = useState();

    useEffect(() => {
      fetch("/api/me/profile")
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Something went wrong");
          }
        })
        .then((data) => {
          //console.log(data)
          setCurrentUser(data.profile)
         
        })
        .catch((error) => {
          console.log(error)
          setServerError(true)
        })
    }, []);

    useEffect(() => {
      if(currentUser) {
        setStatus("idle")
      }
    }, [currentUser]);

    const getHomeFeed = () => {
        fetch('/api/me/home-feed')
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Something went wrong");
            }
          })
          .then((data) => {
              console.log(data)
              const tweetsData = Object.values(data.tweetsById)    
              setTweetsById(tweetsData)
              setTweetIds(data.tweetIds)
          })
          .catch((error) => {
              console.log(error)
              setServerError(true)
          })
    };

    return (
        <CurrentUserContext.Provider 
          value={{ currentUser, status, serverError, getHomeFeed, tweetsById, tweetIds }}>
            {children}
        </CurrentUserContext.Provider>
      );
};

