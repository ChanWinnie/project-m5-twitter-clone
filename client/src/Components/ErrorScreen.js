import React from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { u1F4A3 as bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";

const ErrorScreen = ({ errorHeader, errorText }) => {
    
    return (
        <Error>
            <Icon size={55} icon={bomb}/>
            <h3>{errorHeader}</h3>
            <Text>{errorText}</Text>
        </Error>
    )
};

const Error = styled.div`
    display: flex;
    margin: 75px auto;
    flex-direction: column;
    align-items: center;
    width: 400px;
`;

const Text = styled.p`
    font-size: 15px;
`;

export default ErrorScreen;