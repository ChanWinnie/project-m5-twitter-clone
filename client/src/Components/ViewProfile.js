import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { styling } from "../GlobalStyles";
import styled from "styled-components";
import Feed from "./Feed";
import LoadingContainer from "./LoadingContainer";
import ErrorScreen from "./ErrorScreen";
import { GrLocation } from "react-icons/gr";
import { FiCalendar } from "react-icons/fi";

const ViewProfile = () => {
    const { currentUser, status, serverError  } = React.useContext(CurrentUserContext);
    const { handle } = useParams();
    const [ profile, setProfile ] = useState(null);
    const [ profileError, setProfileError ] = useState(false);
    const [ isFollowing, setIsFollowing ] = useState(false);
    const [ tab, setTab ] = useState("Tweets");
    
    const giantcat9Avatar = "../assets/giantcat9-avatar.jpg";
    const giantcat9Banner = "../assets/giantcat9-banner.jpeg";

    const getHandleProfile = () => {
        fetch(`/api/${handle}/profile`)
        .then((res) => res.json())
        .then((data) => {
            setProfile(data.profile)
            setIsFollowing(data.profile.isBeingFollowedByYou)
        })
        .catch((error) => {
            console.log(error)
            setProfileError(true)
        })  
    };


    useEffect(() => {
        getHandleProfile();
    }, [handle]);

    const handleFollowButtonClicked = () => {
        fetch(`/api/${handle}/${isFollowing ? "unfollow" : "follow"}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if(data.success) {
                    setIsFollowing(!isFollowing)
                }
            })
    };

    const handleTweetsTabClicked = () => {
        setTab("Tweets")
    };

    const handleMediaTabClicked = () => {
        // console.log(isCurrentUser)
        setTab("Media")
    };

    const handleLikedTabClicked = () => {
        setTab("Likes")
    };

    //const timeJoined = format(new Date(profile.joined), "MMMM yyyy")
    const headerError = "An unknown error has occured."
    const textError = "Please try refreshing the page, or contact support if the problem persists."
    const headerProfile = "Uh oh, the profile you are looking for cannot be found."

    return (
            <ProfileBox>
                {serverError
                ? <ErrorScreen errorHeader={headerError} errorText={textError}/> 
                : profileError 
                ? <ErrorScreen errorHeader={headerProfile}/>
                : profile && status === "idle" ? ( 
                    <>
                < TopBox>                
                    <Banner src={profile.handle === "giantcat9" ? giantcat9Banner : profile.bannerSrc} alt="banner" />
                    <Avatar src={profile.handle === "giantcat9" ? giantcat9Avatar : profile.avatarSrc} alt="avatar" />
                    {currentUser.handle === profile.handle ? null : isFollowing ? (
                        <FollowingButton 
                        style={{ backgroundColor: styling.violet, color: "white" }}
                        onClick={()  => handleFollowButtonClicked() }>
                        Following
                        </FollowingButton>
                        ) : (
                        <FollowingButton 
                        style={{ backgroundColor:" transparent", color: styling.violet }}
                        onClick={()  => handleFollowButtonClicked() }>
                        Follow
                        </FollowingButton>
                        )
                    }
                </TopBox>
                <AuthorInfo>
                    <h2>{profile.displayName}</h2> 
                    <Section>
                        <Handle>@ {profile.handle}</Handle>
                        {currentUser.handle === handle ? null : profile.isFollowingYou && <Follower>Follows you</Follower>}
                    </Section>
                    <Bio>{profile.bio}</Bio>
                <LocationJoined>
                    {profile.location && 
                        <Location>
                            <GrLocation />
                            <p>{profile.location}</p>
                        </Location>
                    }
                    <Joined>
                        <FiCalendar />
                        <p>Joined {format(new Date(profile.joined), "MMMM yyyy")}</p>
                    </Joined>
                </LocationJoined>
                <FollowInfo>
                    <p>{profile.numFollowing} <span>Following</span></p>
                    <p>{profile.numFollowers} <span>Followers</span></p>
                </FollowInfo>
                </AuthorInfo>
                <div>
                    <Button onClick={() => handleTweetsTabClicked()}>Tweets</Button>
                    <Button onClick={() => handleMediaTabClicked()}>Media</Button>
                    <Button onClick={() => handleLikedTabClicked()}>Likes</Button>
                </div>
                <Feed tab={tab}/>
                    </>
                ) : (<LoadingContainer />) }
                
            </ProfileBox>
    )
}

const ProfileBox = styled.div`
    display: flex;
    flex-direction: column;
    border: ${styling.border};
    width: 55vw;
`;

const TopBox = styled.div`
    position: relative;
`;

const Banner = styled.img`
    width: 100%;
    height: 225px;
    object-fit: cover;
`;

const Avatar = styled.img`
    position: absolute;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    border: 4px solid white;
    left: 20px;
    bottom: -75px;
`;

const FollowingButton = styled.button`
    border: 2px solid ${styling.violet};
    border-radius: 25px;
    padding: 15px 25px;
    position: absolute;
    bottom: -75px;
    right: 15px;
    font-weight: bold;

    &:hover {
        background-color: ${styling.lavender};
        color: white;
	}
`;

const AuthorInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 65px;
    padding-left: 20px;
    & h2 {
        margin-bottom: 0;
    }
`;

const Section = styled.div`
    padding-left: 0;
    display: flex;
    align-items: center;
`;

const Handle = styled.p`
    font-size: 15px;
    color: ${styling.darkgrey};
    margin: 0 5px 0 0;
`;

const Follower = styled.div`
    background-color: #EAEAEA;
    border-radius: 5px;
    padding: 3px;
    color: ${styling.darkgrey};
    margin-top: 0;
`;

const Bio = styled.p`
    font-size: 17px;
    margin: 18px 0 3px 0;
`;

const LocationJoined = styled.div`
    display: flex;
    align-items: center;
    color: ${styling.darkgrey};
    margin-top: 0;
    padding: 0;
`;

const Location = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;

    & p {
        margin-left: 5px;
    }
`;

const Joined = styled.div`
    display: flex;
    align-items: center;
    & p {
        margin-left: 5px;
    }
`;

const FollowInfo = styled.div` 
    display: flex;
    line-height: 0;

    & p {
        margin-right: 10px; 
    }

    & span {
        color: ${styling.darkgrey};
    }
`;

const Button = styled.button`
    border: transparent;
    border-bottom: ${styling.border};
    font-size: 14px;
    font-weight: bold;
    padding: 15px;
    color: ${styling.darkgrey};
    width: 33.33%;
    background-color: transparent;

    &:hover, :focus {
        color: ${styling.violet};
        border-bottom: 2px solid ${styling.violet};
    }
`;


export default ViewProfile;