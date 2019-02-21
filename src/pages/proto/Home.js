import React from "react";
import styled from "styled-components";
import Titlebar from "../../components/Titlebar"
import theme from "../../styles/theme";
import { FaPlusCircle } from "react-icons/fa";

const Home = () => {
  return <Container>
    <Background />
    <Titlebar />
    <Profile>
      <ProfileIcon><ProfileImage src="/bg.jpg" /></ProfileIcon>
      <ProfileText>
        <ProfileName>DISPLAY NAME</ProfileName>
        <ProfileDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, nostrum?</ProfileDescription>
      </ProfileText>
    </Profile>
    <Information>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, rerum dolorem rem quae ratione culpa ipsum cupiditate voluptas iusto ipsa nisi sapiente nam accusantium mollitia commodi? Illo voluptate repudiandae dolorem.</Information>
    <RoomList>
      {[...Array(10)].map((_, i) => {
        return (
          <RoomItem key={i}>
            <RoomVisual><RoomImage src="/bg.jpg" /></RoomVisual>
            <RoomText>
              <RoomName>ROOM NO.{i + 1}</RoomName>
            </RoomText>
          </RoomItem>
        )
      })}
      <RoomItem>
        <RoomAddButton><FaPlusCircle /></RoomAddButton>
      </RoomItem>
    </RoomList>
  </Container>;
};

const Container = styled.div`
  margin-left: auto;
  max-width: 420px;
  background: ${theme.color.white};
`
const Profile = styled.div`
  padding: 24px;
  display: flex;
  background: ${theme.color.light};
  color: ${theme.color.dark};
`
const ProfileIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${theme.color.white};
`
const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`
const ProfileText = styled.div`
  margin-left: 16px;
  flex: 1;
`
const ProfileName = styled.h2`
  font-size: 14px;
  font-weight: 800;
`
const ProfileDescription = styled.div`
  margin-top: 8px;
  font-size: 10px;
`

const Information = styled.p`
  padding: 24px;
  color: ${theme.color.dark};
`

const RoomList = styled.div`
  padding: 16px;
  padding-bottom: 64px;
  background: ${theme.color.light};
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`
const RoomItem = styled.div`
  box-sizing: border-box;
  padding: 8px;
  width: 50%;
  max-width: 240px;
`
const RoomVisual = styled.div`
  padding-top: 75%;
  width: 100%;
  position: relative;
`
const RoomImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const RoomText = styled.div`
  background: ${theme.color.white};
`
const RoomName = styled.h2`
  padding: 20px;
  font-size: 12px;
  font-weight: 800;
`
const RoomAddButton = styled.button`
  border: none;
  width: 100%;
  height: 100%;
  min-height: 160px;
  display: block;
  background: ${theme.color.white};
  color: ${theme.color.dark};
  font-size: 48px;
`
const Background = styled.div`
  background-image: url(/bg.jpg);
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
`

export default Home;
