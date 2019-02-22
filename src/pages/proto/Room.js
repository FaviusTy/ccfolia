import React from "react";
import styled from "styled-components";
import Titlebar from "../../components/Titlebar"
import theme from "../../styles/theme";
import { FaPaperPlane, FaClipboard, FaAngleUp, FaBell } from "react-icons/fa";

const Rooms = () => {
  return (<>
    <Container>
      {/* <Titlebar></Titlebar> */}
      <Map>
        <Plane col="30" row="30"><PlaneImage src="/bg.jpg" /></Plane>
      </Map>
      {/* <Screen>
        <SceneBackgroundImage src="/bg.jpg" />
        <SceneMenu>
          <SceneMenuButton>a</SceneMenuButton>
          <SceneMenuButton>b</SceneMenuButton>
          <SceneMenuButton>c</SceneMenuButton>
        </SceneMenu>
      </Screen> */}
      <Chat>
        <ChatHead>
          <FaBell />
        </ChatHead>
        <Messages>
          {[...Array(100)].map((_, id) => {
            return (<Message key={id}>
              <MessageHead>
                <MessageIcon>
                  <MessageImage src="/bg.jpg" />
                </MessageIcon>
                <MessageName>Lorem.</MessageName>
                <MessageDisplayName>2 hours</MessageDisplayName>
              </MessageHead>
              <MessageBody>
                <MessageText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum atque pariatur quasi, voluptatem facere ipsum quibusdam neque ea rerum qui blanditiis, magni officia velit, fugiat quo praesentium eius et?</MessageText>
              </MessageBody>
            </Message>)
          })}
        </Messages>
        <ChatMenu>
          <TabList>
            <TabItem>Main</TabItem>
            <TabItem>A</TabItem>
            <TabItem>B</TabItem>
            <TabItem>C</TabItem>
            <TabItem>D</TabItem>
            <TabItem>E</TabItem>
            <TabItem>F</TabItem>
            <TabItem>G</TabItem>
            <TabItem>H</TabItem>
            <TabItem>I</TabItem>
            <TabItem>J</TabItem>
          </TabList>
          <ChatMenuButton type="button"><FaClipboard /></ChatMenuButton>
        </ChatMenu>
        <ChatBox>
          <ChatBoxIcon>
            <ChatBoxImage src="/bg.jpg" />
          </ChatBoxIcon>
          <ChatBoxName>
            <ChatBoxNameInput />
            <ChatBoxNameButton type="button"><FaAngleUp /></ChatBoxNameButton>
          </ChatBoxName>
          <ChatBoxText>
            <ChatBoxTextInput />
            <ChatBoxSendButton type="submit"><FaPaperPlane /></ChatBoxSendButton>
          </ChatBoxText>
          {/* <ChatBoxMenu>
            <ChatBoxMenuButton type="button"><FaClipboard /></ChatBoxMenuButton>
          </ChatBoxMenu> */}
        </ChatBox>
      </Chat>
    </Container>
  </>);
};

const Container = styled.div`
  display: flex;
  height: 100%;
  @media (max-width: 720px) {
    flex-direction: column;
  }
`
const Chat = styled.div`
  /* margin: auto; */
  /* outline: 1px solid gray; */
  /* max-height: 100vh; */
  display: flex;
  flex-direction: column;
  position: relative;
  width: 40%;
  max-width: 420px;
  background: ${theme.color.white};
  /* box-shadow: 0 0 12px rgba(0, 0, 0, 0.6); */
  @media (max-width: 720px) {
    width: 100%;
    height: 45%;
  }
`
const Messages = styled.div`
  padding: 16px;
  /* height: 100%; */
  flex: 1;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`
const Message = styled.div`
  padding: 16px 0;
  color: ${theme.color.dark};
`
const MessageHead = styled.div`
  display: flex;
  align-items: center;
`
const MessageIcon = styled.div`
  width: 40px;
  height: 40px;
`
const MessageImage = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const MessageName = styled.h2`
  margin-left: 12px;
  flex: 1;
  font-size: 14px;
  font-weight: 800;
`
const MessageDisplayName = styled.h3`
  justify-self: flex-end;
  font-size: 12px;
  font-weight: 300;
`
const MessageBody = styled.div`
  padding-left: 52px;
  flex: 1;
`
const MessageText = styled.p``
const ChatMenu = styled.div`
  padding: 8px 12px;
  display: flex;
`
const TabList = styled.div`
  margin-right: 5px;
  display: flex;
  flex-wrap: nowrap;
  flex: 1;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`
const TabItem = styled.button`
  border: none;
  border-radius: 4px;
  padding: 4px;
  display: block;
  min-width: 54px;
  background: ${theme.color.base};
  color: ${theme.color.dark};
  font-size: 10px;
  font-weight: 800;
  font-family: sans-serif;
  & + & {
    margin-left: 8px;
  }
`
const ChatBox = styled.div`
  padding: 0 12px 12px;
  min-height: 36px;
  display: flex;
`
const ChatBoxIcon = styled.div`
  width: 36px;
  height: 36px;
`
const ChatBoxImage = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const ChatBoxName = styled.div`
  margin-left: 8px;
  position: relative;
`
const ChatBoxNameInput = styled.input`
  box-sizing: border-box;
  padding: 8px;
  padding-right: 24px;
  border: 1px solid ${theme.color.base};
  width: 90px;
  height: 36px;
  appearance: none;
  color: ${theme.color.black};
`
const ChatBoxNameButton = styled.button`
  display: block;
  border: none;
  background: none;
  position: absolute;
  right: 4px;
  top: 7px;
  width: 20px;
  height: 20px;
  font-size: 8px;
  color: ${theme.color.dark};
`
const ChatBoxText = styled.div`
  margin-left: 8px;
  flex: 1;
  position: relative;
`
const ChatBoxTextInput = styled.textarea`
  box-sizing: border-box;
  padding: 8px;
  padding-right: 28px;
  border: 1px solid ${theme.color.base};
  resize: vertical;
  height: 36px;
  min-height: 36px;
  width: 100%;
  max-width: 100%;
  appearance: none;
  color: ${theme.color.black};
`
const ChatBoxSendButton = styled.button`
  /* outline: 1px solid red; */
  padding: 3px;
  display: block;
  border: none;
  background: none;
  position: absolute;
  right: 7px;
  top: 7px;
  width: 20px;
  height: 20px;
  font-size: 14px;
  color: ${theme.color.base};
`
const ChatHead = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`
const ChatBoxMenu = styled.div`
  /* margin-left: 8px; */
`
const ChatBoxMenuButton = styled.button`
  /* outline: 1px solid red; */
  padding: 11px;
  display: block;
  border: none;
  background: none;
  width: 36px;
  height: 36px;
  font-size: 14px;
  color: ${theme.color.dark};
`
const ChatMenuButton = styled.button`
  /* outline: 1px solid red; */
  padding: 5px;
  display: block;
  border: none;
  background: none;
  width: 24px;
  height: 24px;
  font-size: 14px;
  color: ${theme.color.dark};
`

const Screen = styled.div`
  margin: auto;
  position: relative;
  max-width: 720px;
  width: 100%;
  ::after {
    content: "";
    display: block;
    padding-top: 56.25%;
    width: 100%;
  }
`
const SceneBackgroundImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
const SceneMenu = styled.div``
const SceneMenuButton = styled.button``

const Map = styled.div`
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1; */
  /* width: 60%; */
  flex: 1;
  overflow: scroll;
  @media (max-width: 720px) {
    height: 55%;
  }
`
const Plane = styled.div`
  position: relative;
  width: ${({ col }) => `${col * 30}px`};
  height: ${({ row }) => `${row * 30}px`};
`
const PlaneImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`

export default Rooms;
