import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import ErrorScreen from "./ErrorScreen";
import LoadingContainer from "./LoadingContainer";
import SmallTweet from "./SmallTweet";

const Feed = ({ tab }) => {
    const { handle } = useParams();
    const [ feed, setFeed ] = useState();
    const [ feedError, setFeedError ] = useState(false);

    const getHandleFeed = () => {
        fetch(`/api/${handle}/feed`)
            .then((res) => res.json())
            .then((data) => {
                const feedData = Object.values(data.tweetsById)
                setFeed(feedData.reverse())
            })
            .catch((error) => {
                console.log(error)
                setFeedError(true)
            })
    }

    useEffect(() => {
        getHandleFeed();
    }, [feed])
 
    const header = "Critter feed is not available";
    const text = "Please try refreshing the page, or contact support if the problem persists."

    return (
        <>
            {feedError 
            ? <ErrorScreen errorHeader={header} errorText={text} /> : !feed ? <LoadingContainer />: (
                <>
                    {tab === "Tweets" && 
                        <FeedBox>
                            {feed.map((singleFeed) => {
                                return <SmallTweet key={singleFeed.id} tweet={singleFeed} /> 
                            })}
                        </FeedBox>}
                    {tab === "Media" && <div>media</div>}
                    {tab === "Likes" && <div>likes</div>}

                </> 
            )}
    </>
    )
}

const FeedBox = styled.div`
    padding: 15px;
`;


export default Feed;