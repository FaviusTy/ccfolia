import React from "react";
import styled from "styled-components";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

import theme from "../styles/theme";

const Titlebar = ({ onClick }) => {
  return (
    <Container>
      <LeftButton>
        <FaArrowLeft />
      </LeftButton>
      <Title>Title</Title>
      <RightButton>
        <FaPlus />
      </RightButton>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;
const Title = styled.h1`
  font-size: 14px;
  color: ${theme.color.dark};
`;
const LeftButton = styled.button`
  margin-top: 1px;
  padding: 2px;
  line-height: 1;
  color: ${theme.color.dark};
  font-size: 14px;
`;
const RightButton = styled.button`
  padding: 2px;
  line-height: 1;
  color: ${theme.color.dark};
  font-size: 14px;
`;

export default Titlebar;
