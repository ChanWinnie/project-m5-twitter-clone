import React from "react";
import { styling } from "../GlobalStyles";
import styled from "styled-components";
import { AiOutlineRetweet } from "react-icons/ai";

const Retweeted = ({ displayName }) => {
    return (
        <RemeowBox><AiOutlineRetweet size={18} /><Text>{displayName}   Remeowed</Text></RemeowBox>
    )
}

const RemeowBox = styled.div`
    display: flex;
    align-items: center;
`;

const Text = styled.p`
    margin-left: 10px;
    color: ${styling.darkgrey};
    line-height: 1px;
`;

export default Retweeted;