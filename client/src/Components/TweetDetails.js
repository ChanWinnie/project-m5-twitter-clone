import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from "./CurrentUserContext";
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { styling } from "../GlobalStyles";
import TweetAction from "./TweetActions";
import LoadingContainer from "./LoadingContainer";
import ErrorScreen from "./ErrorScreen";
import Retweeted from "./Retweeted";
import { BsDot } from "react-icons/bs";

const TweetDetails = () => {
    const { currentUser, status } = React.useContext(CurrentUserContext);
    const { tweetId } = useParams();
    const [ singleTweet, getSingleTweet ] = useState();
    const [ tweetError, setTweetError ] = useState(false);
    const [ timeHour, setTimeHour] = useState();
    const [ timeDate, setTimeDate ] = useState()

    const giantcat9Avatar = "../assets/giantcat9-avatar.jpg";
 
    useEffect(() => {
        fetch(`/api/tweet/${tweetId}`)
        .then((res) => res.json())
        .then((data) => {
            //console.log(data)
            getSingleTweet(data.tweet)
        })
        .catch((error) => {
            console.log(error)
            setTweetError(true)
        })
    }, [singleTweet])

    useEffect(() => {
        if(singleTweet) {
            setTimeHour(format(new Date(singleTweet.timestamp), "h:mm a"))
            setTimeDate(format(new Date(singleTweet.timestamp), "MMM d yyyy"))
        }
    }, [singleTweet])
  
    const header = "Uh oh, the tweet you are looking for cannot be found."
    
    if(tweetError) {
        return <Tweet><ErrorScreen errorHeader={header}/></Tweet>
    } else if(!singleTweet || status === "loading") {
        return <Tweet><LoadingContainer/></Tweet>
    }
 
    return (
        <Tweet>
            <>
            {singleTweet.retweetFrom ? (
                    <Header><Retweeted displayName={
                        singleTweet.retweetFrom.handle !== currentUser.handle && singleTweet.isRetweeted ? `${singleTweet.retweetFrom.displayName}, ...`
                        : singleTweet.retweetFrom.handle !== currentUser.handle ? singleTweet.retweetFrom.displayName
                        : singleTweet.retweetFrom.handle === currentUser.handle || singleTweet.isRetweeted ? currentUser.displayName
                        : null      
                    }
                    /></Header>
                ) : singleTweet.isRetweeted ? (
                    <Header><Retweeted displayName={currentUser.displayName}/></Header>
                ) : null}    
                <Author>
                    <Link to={`/${singleTweet.author.handle}`}>
                        <Avatar src={singleTweet.author.handle === "giantcat9" ? giantcat9Avatar : singleTweet.author.avatarSrc} alt="avatar" width="75px"/>
                    </Link>
                    <Names>
                            <DisplayName>{singleTweet.author.displayName}</DisplayName>
                            <Handle>@{singleTweet.author.handle}</Handle>
                    </Names>
                </Author>
                <Info>
                    <Status>{singleTweet.status}</Status>
                    {singleTweet.media[0] !== undefined && <MediaImg src={singleTweet.media[0].url} alt="tweet media" width="400px" />}
                    <Time>{timeHour} <span><BsDot /></span> {timeDate} <span><BsDot/></span> Critter web app</Time>
                </Info>
                <TweetAction tweet={singleTweet} />
            </>
        </Tweet>
        )
}


const Tweet = styled.div`
    padding: 20px;
    border-right: ${styling.border};
    width: 650px;
    min-height: 100vh;
`;

const Header = styled.div`
    width: 100%;
    border-bottom: ${styling.border};
    font-size: 15px;
    padding-bottom: 10px;
`;

const Author = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const Names = styled.div`
    display: inline-block;
`;

const Avatar = styled.img`
    border-radius: 50%;
    width: 65px;
    height: 65px;
    margin-right: 15px; 
`;

const DisplayName = styled.h3`
    margin-bottom: 0;
`;

const Handle = styled.h4`
    margin-top: 4px;
    color: ${styling.darkgrey};
`;

const MediaImg = styled.img`
    border-radius: 15px;
    width: 100%;
    height: 375px;
    object-fit: cover;
`;

const Info = styled.div`
    border-bottom: ${styling.border};
`;

const Status = styled.h3`
    word-break: break-word;
`;

const Time = styled.p`
    color: ${styling.darkgrey};
    font-size: 16px;
    display: flex;
    align-items: center;

    & span {
        margin: 0 5px;
    }

`;
export default TweetDetails;