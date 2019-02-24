import React from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { Button } from "../../elements/Buttons";

const Welcome = () => {
  return (
    <Container>
      <Logo>CCFOLIA</Logo>
      <Version>v1.0.0-beta</Version>
      <Actions>
        <LoginButton type="button">Sign in with Twitter</LoginButton>
        <LoginButton type="button">Guest user</LoginButton>
      </Actions>
      <Background />
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  padding: 64px;
  max-width: 375px;
  color: ${theme.color.white};
`;

const Logo = styled.h1`
  margin: 50% 0 4px;
  text-align: center;
  font-size: 40px;
  font-family: serif;
`;

const Version = styled.div`
  margin-bottom: 24px;
  text-align: center;
  font-size: 10px;
`;

const Actions = styled(Container)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const LoginButton = styled(Button)`
  margin-bottom: 12px;
`;

const Background = styled.div`
  /* background-image: url(/bg3.jpg); */
  background-color: ${theme.color.dark};
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
`;

export default Welcome;
