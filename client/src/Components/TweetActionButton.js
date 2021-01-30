import React, { useState } from "react";
import styled from "styled-components";

const TweetActionButton = ({ color, children, onClick, isClicked }) => {
    const [ isHovered, setIsHovered ] = useState(false);

    return (
        <ButtonWrapper 
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        color={color}
        style={{ backgroundColor: isClicked || isHovered ? color : null }}
        >
            {children}
        </ButtonWrapper>
    )
};

const ButtonWrapper = styled.button`
    display: flex;
    border: none;
    border-radius: 50%;
    padding: 6px;
    background: transparent;
    &:focus {
        background-color: ${p => p.color};
    }
`;

export default TweetActionButton;