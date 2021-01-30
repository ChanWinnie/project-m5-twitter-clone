import React from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router-dom";
import { format } from 'date-fns';
import { styling } from "../GlobalStyles";
import styled from "styled-components";
import TweetAction from "./TweetActions";
import Retweeted from "./Retweeted";
import { BsDot } from "react-icons/bs";

const SmallTweet = ({ tweet }) => {
    const { currentUser, status } = React.useContext(CurrentUserContext);
    const history = useHistory();
    const timeStamp = format(new Date(tweet.timestamp), "MMM do")
    const giantcat9Avatar = "../assets/giantcat9-avatar.jpg";

    const handleTweetClicked = () => {
        history.push(`/tweet/${tweet.id}`);
    };

    const handleTweetEntered = (event) => {
        if(event.key === "Enter") {
            handleTweetClicked()
        }
    };

    const handleNameClicked = (event) => {
        event.stopPropagation();
        history.push(`/${tweet.author.handle}`);
    };

    const handleNameEntered = (event) => {
        if(event.key === "Enter") {
            handleNameClicked(event);
        }
    };

    return (
        <>
        {status === "idle" && (
            <TweetSmall 
            tabIndex="0" 
            aria-label="View tweet" 
            onClick={() => handleTweetClicked()} 
            onKeyPress={(event) => handleTweetEntered(event)} >
                {tweet.retweetFrom ? (
                    <Remeow><Retweeted displayName={
                        tweet.retweetFrom.handle !== currentUser.handle && tweet.isRetweeted ? `${tweet.retweetFrom.displayName}, ...`
                        : tweet.retweetFrom.handle !== currentUser.handle ? tweet.retweetFrom.displayName
                        : tweet.retweetFrom.handle === currentUser.handle || tweet.isRetweeted ? currentUser.displayName
                        : null      
                    }
                    /></Remeow>
                ) : tweet.isRetweeted ? (
                    <Remeow><Retweeted displayName={currentUser.displayName}/></Remeow>
                ) : null}                
                <TweetContent >
                    <Avatar src={tweet.author.handle === "giantcat9" ? giantcat9Avatar : tweet.author.avatarSrc} alt="avatar" width="75px"/>
                    <WrittenContent>
                    <AuthorInfo>
                    <NameTab 
                    tabIndex="0" 
                    aria-label="View profile"
                    onClick={(event) => handleNameClicked(event)} 
                    onKeyPress={(event) => handleNameEntered(event)}>
                        <Name>{tweet.author.displayName}</Name>
                    </NameTab>
                    <Handle>@{tweet.author.handle}</Handle>
                    <span><BsDot /></span>
                    <Time>{timeStamp}</Time>
                    </AuthorInfo>
                    <Status>{tweet.status}</Status>
                    {tweet.media[0] !== undefined && <MediaImg src={tweet.media[0].url} alt="tweet media" width="400px" /> }
                    </WrittenContent>
                </TweetContent>
                <Actions>
                    <TweetAction tweet={tweet} />
                </Actions>
            </TweetSmall>
        )}
        </>
    )
};

const TweetSmall = styled.div`
    border-bottom: ${styling.border};
    padding: 10px;

    &:focus {
      outline: ${styling.focusOutline};;
    }
`;

const Remeow = styled.div`
    margin-left: 35px;
    margin-top: 0;
    font-size: 14px;
`;

const TweetContent = styled.div`
    display: flex;
    margin-top: 5px;
`;

const Avatar = styled.img`
    border-radius: 50%;
    width: 55px;
    height: 55px;
`;

const AuthorInfo = styled.div`
    display: flex;
    align-items: center;
`;

const NameTab = styled.div`
    &:focus {
        outline: ${styling.focusOutline};;
    }
`;

const Name = styled.p`
    margin: 0 0 5px 0;
    font-size: 17px;
    font-weight: bold;
`;

const WrittenContent = styled.div`
    margin-left: 10px;
`;

const Handle = styled.p`
    color: ${styling.darkgrey};
    margin: 0 7px 5px 7px;
`;

const Time = styled.p`
    color: ${styling.darkgrey};
    margin: 0 0 5px 7px;
    font-size: 14px;
`;

const Status = styled.p`
    margin: 0;
    font-size: 15px;
    line-height: 1.5;
    word-break: break-word; // for extra long words
`;

const MediaImg = styled.img`
    margin-top: 10px;
    border-radius: 13px;
    width: 100%;
    height: 325px;
    object-fit: cover;
`;

const Actions = styled.div`
    margin: 0 65px;
`;
export default SmallTweet;