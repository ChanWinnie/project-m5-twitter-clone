import React, { useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { styling } from "../GlobalStyles";
import styled from "styled-components";
import PostStatus from "./PostStatus";
import HomeFeed from "./HomeFeed";
import ErrorScreen from "./ErrorScreen";
import LoadingContainer from "./LoadingContainer"

const Home = () => {
    const { status, tweetsById, tweetIds, serverError, getHomeFeed } = React.useContext(CurrentUserContext);

    useEffect(() => {
        getHomeFeed();
    }, [])

    const header ="An unknown error has occured."
    const text = "Please try refreshing the page, or contact support if the problem persists."

    return (
        <Homepage>
            { serverError
            ? <ErrorScreen errorHeader={header} errorText={text}/> 
            : status === "loading" 
                ? <LoadingContainer />
                : (
                    <Section>
                        <h2>Home</h2>
                        <PostStatus />
                        {tweetsById && tweetIds                                 
                        ? <HomeFeed tweetsById={tweetsById} tweetIds={tweetIds}/> 
                        : <LoadingContainer />
                        }     
                    </Section>
                )
            }
        </Homepage>
    )
}

const Homepage = styled.div`
    border-right: ${styling.border};
    width: 650px;
    min-height: 100vh;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;

    & h2 {
        margin: 20px 15px;
    }
`;

export default Home;