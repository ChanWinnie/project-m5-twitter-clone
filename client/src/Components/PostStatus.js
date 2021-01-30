import React, { useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { styling } from "../GlobalStyles";
import styled from "styled-components";
import LoadingContainer from "./LoadingContainer";
import ErrorScreen from "./ErrorScreen";

const PostStatus = () => {
    const { currentUser, status, getHomeFeed } = React.useContext(CurrentUserContext);
    const [ tweetStatus, setTweetStatus ] = useState("");
    const [ statusLength, setStatusLength ] = useState("gray");
    const [ inputClicked, setInputClicked ] = useState(false);
    const [ postError, setPostError ] = useState(false);

    const handlePosting = (event) => {
        const currentPosting = event.target.value;
        if(currentPosting.length > 225 && currentPosting.length <= 280) {
            setStatusLength("yellow")
        } else if (currentPosting.length > 280) {
            setStatusLength("red")
        }
        setTweetStatus(currentPosting)
        setInputClicked(true);
    };
    
    const handleMeowClicked = (event) => {
        event.preventDefault();
        if(tweetStatus.length <= 280) {
            fetch("/api/tweet", {
                method: "POST", 
                body: JSON.stringify({ status: tweetStatus }),
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
              .then((res) => res.json())
              .then((json) => {
                console.log(json);
                setTweetStatus("");
                setInputClicked(false);
                getHomeFeed();
            })
            .catch((error) => {
                console.log(error)
                setPostError(true)
            })
        }  
    }

    const maxLength = 280;
    const header = "Uh oh, Tweet not sent."
    const text = "Please try refreshing the page, or contact support if the problem persists."

    return (
        <>
        { postError 
        ? <ErrorScreen errorHeader={header} errorText={text}/> : status === "loading" 
        ? <LoadingContainer /> : 
            (
                <PostBox>
                    <Avatar src={currentUser.avatarSrc} alt="avatar" />
                    <Form>
                        <Input 
                        value={tweetStatus}
                        placeholder="What's happening?"
                        onChange={(event) => handlePosting(event)}
                        minLength="1"
                        />
                        <MeowSubmission>
                            <p style={{ color: statusLength === "red" ? "#FF0000" : statusLength === "yellow" ? "#F7B400" : "lightgray"}}>{maxLength - tweetStatus.length}</p>
                            <MeowButton 
                            tabIndex="0"
                            onClick={(event) => handleMeowClicked(event)}
                            style={{ backgroundColor: inputClicked ? styling.violet : styling.lightviolet }}
                            >Meow</MeowButton>
                        </MeowSubmission> 
                    </Form>
                </PostBox>
            )
        }
        </>
    )
};

const PostBox = styled.div`
    display: flex;
    border-top: ${ styling.border};
    border-bottom: 10px solid lightgray; 
    padding: 10px;
`;

const Form = styled.div`
    width: 100%;
`;

const Avatar = styled.img`
    border-radius: 50%;
    width: 55px;
    height: 55px;
`;

const Input = styled.textarea`
    margin-left: 10px;
    width: 500px;
    height: 150px;
    font-size: 18px;
    border: none;
    resize: none;
`;

const MeowSubmission = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & p {
        font-size: 14px;
        margin-right: 10px;
    }
`;

const MeowButton = styled.button`
    border-radius: 25px;
    padding: 12px 17px;
    border: none;
    color: white; 
    font-size: 17px;
    font-weight: bold;

    &:focus{
      outline: ${styling.focusOutline};
    }
`;

export default PostStatus;