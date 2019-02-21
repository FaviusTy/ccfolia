import React from "react";
import styled from "styled-components";
import Titlebar from "../../components/Titlebar"
import theme from "../../styles/theme";

const Home = () => {
  return <Container>
    <Titlebar />
    <Profile>
      <Icon><Image src="/bg.jpg" /></Icon>
      <Text>
        <Name>DISPLAY NAME</Name>
        <Description>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, nostrum?</Description>
      </Text>
    </Profile>
  </Container>;
};

const Container = styled.div`
  margin-left: auto;
  max-width: 375px;
  height: 100vh;
  background: ${theme.color.white};
`
const Profile = styled.div`
  padding: 24px;
  display: flex;
  background: ${theme.color.light};
  color: ${theme.color.dark};
`
const Icon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${theme.color.white};
`
const Image = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`
const Text = styled.div`
  margin-left: 16px;
  flex: 1;
`
const Name = styled.h1`
  font-size: 14px;
  font-weight: 800;
`
const Description = styled.div`
  margin-top: 8px;
  font-size: 10px;
`

export default Home;
