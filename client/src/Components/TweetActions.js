import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { styling } from "../GlobalStyles";
import styled from "styled-components";
import TweetActionButton from "./TweetActionButton";
import { IoChatbubbleOutline } from "react-icons/io5";
import { AiOutlineRetweet } from "react-icons/ai";
import {FiShare} from "react-icons/fi";
import { TiHeartOutline, TiHeartFullOutline } from "react-icons/ti";

const TweetAction = ({ tweet }) => { 
    const [ liked, setLiked ] = useState(tweet.isLiked);
    const [ reTweeted, setRetweeted] = useState(tweet.isRetweeted);
    const [ commented, setCommented] = useState(false);
    const [ shared, setShared ] = useState(false);
    const { currentUser, status, getHomeFeed } = React.useContext(CurrentUserContext);
    
    // If retweetfrom is current user, retweet button should be changed
    useEffect(() => {
        if(status === "idle" && tweet.retweetFrom && tweet.retweetFrom.handle === currentUser.handle) {
            setRetweeted(true)
        }
    }, [])

    const handleRetweetEntered = (event) => {
        if(event.key === "Enter") {
            handleRetweetClick(event)
        }
    };

    const handleRetweetClick = (event) => {
        event.stopPropagation();
        fetch(`/api/tweet/${tweet.id}/retweet`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ retweet: !reTweeted})
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setRetweeted(!reTweeted)
                getHomeFeed()
            }) 
            .catch((error) => console.log(error))
    };

    const handleToggleLikeEntered = (event) => {
        event.stopPropagation()
        if(event.key === "Enter") {
            handleToggleLikeClick(event);
        }
    };

    const handleToggleLikeClick = (event) => {
        event.stopPropagation();
        fetch(`/api/tweet/${tweet.id}/like`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ like: !liked} ),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setLiked(!liked)   
                getHomeFeed()
            })
    };
        
    const handleCommentClick = (event) => {
        event.stopPropagation();
        setCommented(!commented)
    };

    const handleShareClick = (event) => {
        event.stopPropagation();
        setShared(!shared);
    };

    return (
        <ButtonBar tabIndex="-1">
            <div>
                <TweetActionButton  
                tabIndex="0" 
                aria-label="Comment" 
                color="#A9CDF1" 
                onClick={(event) => handleCommentClick(event)} 
                isClicked={commented}>
                    <IoChatbubbleOutline 
                    size={20} 
                    color={commented ? "#0541AA" : undefined}/>
                </TweetActionButton>
            </div>
            <ActionBox onKeyPress={(event) => handleRetweetEntered(event)}>
                <TweetActionButton 
                tabIndex="0" 
                aria-label="Retweet" 
                color="#C1EEB0" 
                onClick={(event) => handleRetweetClick(event)} 
                isClicked={reTweeted}>
                    <AiOutlineRetweet 
                    size={20} 
                    color={reTweeted ? "#1CAD73" : undefined}/>
                </TweetActionButton>
                <Num>{reTweeted ? "1" : null }</Num>
            </ActionBox>
            <ActionBox onKeyPress={(event) => handleToggleLikeEntered(event)}>
                <TweetActionButton 
                tabIndex="0" 
                aria-label="Like" 
                color="#F79494" 
                onClick={(event) => handleToggleLikeClick(event)} 
                isClicked={liked}>
                    {liked ? ( <TiHeartFullOutline size={20} color={ "#DF3F78"} /> ) 
                           : ( <TiHeartOutline size={20} /> )} 
                </TweetActionButton>
                <Num>{liked ? "1" : null}</Num>
            </ActionBox>
            <div>
                <TweetActionButton 
                tabIndex="0" 
                aria-label="Share"
                color="#A9CDF1" 
                onClick={(event) => handleShareClick(event)} 
                isClicked={shared}>
                    <FiShare 
                    size={20} 
                    color={shared ? "#0541AA" : undefined}/>
                </TweetActionButton>
            </div>  
        </ButtonBar>
    )
};

const ButtonBar = styled.div`
    display: flex;
    justify-content:space-between;
    margin: 10px 20px;
`;

const ActionBox = styled.div`
    display: flex;
    align-items: center;
    width: 50px;
`;

const Num = styled.div`
    position: relative;
    right: 0;
    margin-left: 5px;
    color: ${styling.darkgrey};
    font-size: 12px;
`;


export default TweetAction;