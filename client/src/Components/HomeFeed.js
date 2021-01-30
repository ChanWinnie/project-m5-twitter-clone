import React from "react";
import SmallTweet from "./SmallTweet";

const HomeFeed = ({ tweetsById, tweetIds }) => {

    // Post tweets based on given order: 
    tweetsById.sort(function (a, b) {
        return tweetIds.indexOf(a.id) - tweetIds.indexOf(b.id);
    });

    return (
        <>
            {tweetsById.map((tweet) => {
                return <SmallTweet key={tweet.id} tweet={tweet} />
            })}
        </>
    )
};

export default HomeFeed;