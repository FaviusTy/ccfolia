import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { FaPaperPlane, FaClipboardList } from 'react-icons/fa'

import CharacterForm from "../containers/CharacterForm";
import Screen from "../containers/Screen";
import ChatBox from "../containers/ChatBox";
import Messages from "../containers/Messages";
import Tracks from "../containers/Tracks";
import RoomMenu from "../containers/RoomMenu";
import Background from "../containers/Background";
import FieldEdit from "../containers/FieldEdit";
import Settings from "../containers/Settings";

const sentences = ["1d100", "1d6", "1d8", "1d10", "1d20", "1d100", "1d3", "1d6", "1d8", "1d10", "1d20", "1d100"]

const Room = ({ init, id }) => {
  useEffect(() => {
    init(id);
    return () => init(null);
  }, [id]);
  return (<Styled.Container>
    <Background />
    <Styled.Screen>
      <Screen />
      {/* <img className="bg" src="/bg.jpg" alt="" /> */}
    </Styled.Screen>
    {/* <Styled.Layer>
      <FieldEdit />
    </Styled.Layer> */}
    <Styled.Chat>
      <Styled.Messages>
        <Messages />
        <p><strong>name:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, corrupti.</p>
        <p><strong>name:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, corrupti.</p>
        <p><strong>name:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, corrupti.</p>
        <p><strong>name:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, corrupti.</p>
        <p><strong>name:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, corrupti.</p>
        <p><strong>name:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, corrupti.</p>
        <p><strong>name:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, corrupti.</p>
        <p><strong>name:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, corrupti.</p>
        <p><strong>name:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, corrupti.</p>
        <p><strong>name:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, corrupti.</p>
        <p><strong>name:</strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, corrupti.</p>
      </Styled.Messages>
      <Styled.ChatBox>
        <nav>
          <div className="menu">
            <button type="button"><FaClipboardList /></button>
          </div>
          <div className="sentences">
            {
              sentences.map((text) => {
                return (<div className="sentence"><button type="button">{text}</button></div>)
              })
            }
          </div>
        </nav>
        <form>
          <figure><img src="/bg.jpg" alt=""/></figure>
          <textarea type="text" placeholder="Input text..."></textarea>
          <button type="button"><FaPaperPlane /></button>
          {/* <button type="button">SAVE</button> */}
        </form>
      </Styled.ChatBox>
    </Styled.Chat>
  </Styled.Container>)
}

const Styled = {}
Styled.Container = styled.div`
  height: 100vh;
`
Styled.Screen = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  .bg {
    position: absolute;
    top: -12px;
    left: -12px;
    right: -12px;
    bottom: -12px;
    width: calc(100% + 24px);
    height: calc(100% + 24px);
    object-fit: cover;
    filter: blur(8px) brightness(80%);
  }
`
Styled.Chat = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 50%;
  display: flex;
  flex-direction: column;
`
Styled.Messages = styled.div`
  box-sizing: border-box;
  margin-bottom: -1px;
  padding: 4px;
  flex: 1;
  overflow: scroll;
  /* background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) 10%, rgba(0, 0, 0, 0)); */
  /* background: #fff; */
  /* background: rgba(255, 255, 255, 0.9); */
  p {
    padding: 4px 8px;
    /* color: #fff; */
    font-size: 14px;
    strong {
      margin-right: 4px;
      color: #888;
    }
  }
`
Styled.Layer = styled.div`
  border-radius: 24px 24px 0 0;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  max-height: 94%;
  padding-top: 32px;
  background: rgba(255, 255, 255, 0.74);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
`
Styled.ChatBox = styled.div`
  padding: 12px;
  background: rgba(0, 0, 0, 0.6);
  nav {
    display: flex;
  }
  .menu {
    margin-right: 4px;
    padding-right: 4px;
    button {
      box-sizing: border-box;
      padding: 8px;
      border: none;
      /* border-radius: 30px; */
      width: 28px;
      height: 28px;
      background: #000;
      color: #fff;
      svg {
        width: 12px;
        height: 12px;
      }
    }
  }
  .sentences {
    margin-bottom: 12px;
    display: flex;
    flex: 1;
    flex-wrap: nowrap;
    overflow: auto;
    .sentence {
      width: 100px;
    }
    button {
      box-sizing: border-box;
      padding: 8px;
      border: none;
      width: 100%;
      background: rgba(255, 255, 255, 0.2);
      display: block;
      border-radius: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 1;
      font-size: 12px;
      color: #fff;
    }
    > * + * {
      margin-left: 8px;
    }
  }
  form {
    display: flex;
    /* align-items: flex-end; */
    figure {
      box-sizing: border-box;
      /* border: 1px solid rgba(255, 255, 255, 0.74); */
      margin-right: 8px;
      border-radius: 32px;
      /* align-self: flex-start; */
      width: 36px;
      height: 36px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
      }
    }
    textarea {
      box-sizing: border-box;
      margin-right: 4px;
      padding: 8px 12px;
      border: 1px solid rgba(255, 255, 255, 0.74);
      border-radius: 32px;
      flex: 1;
      background: transparent;
      font-size: 14px;
      color: #fff;
      height: 36px;
      ::placeholder {
        color: rgba(255, 255, 255, 0.2);
        font-size: 14px;
      }
    }
    button {
      padding: 8px;
      background: transparent;
      border: none;
      border-radius: 30px;
      font-size: 12px;
      color: #fff;
      width: 36px;
      height: 36px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`
Styled.ChatPalet = styled.div`
`

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    id
  }
}

const mapDispatchToProps = {
  init: (id) => {
    return {
      type: "@ROOM_INIT",
      id
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)