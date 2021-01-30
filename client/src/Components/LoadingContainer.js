import React from "react";
import styled from "styled-components";
import LoadingIcon from "./LoadingIcon";

const LoadingContainer = () => {
    return <Container><LoadingIcon /></Container>
}

const Container = styled.div`
    margin: 75px 50%;
`;

export default LoadingContainer;