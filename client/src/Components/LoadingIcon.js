import React from "react";
import styled, { keyframes } from "styled-components";
import { FiLoader } from "react-icons/fi";

const LoadingIcon = () => {
    return <Loader><FiLoader size={50}/></Loader>
};

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
`;

const Loader = styled.div`
    display: inline-block;
    animation: ${rotate} 2000ms infinite ;
    color: lightgray;
`;

export default LoadingIcon;