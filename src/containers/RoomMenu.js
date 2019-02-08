import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  FaComment,
  FaChessPawn,
  FaImages,
  FaSearchPlus,
  FaSearchMinus,
  FaMusic,
  FaCog,
  FaTable,
  FaDAndD,
  FaDiceD6,
  FaDiceD20
} from "react-icons/fa";

const RoomMenu = ({
  addObject,
  scaleUp,
  scaleDown,
  setControl,
  rollDice,
  setMessage
}) => {
  return (
    <Styled.Container>
      <Styled.Item onClick={() => addObject("objects")} type="button">
        <i>
          <FaChessPawn />
        </i>
      </Styled.Item>
      {/* <Styled.Item onClick={() => setControl("status")} type="button">
        <i>
          <FaTable />
        </i>
      </Styled.Item> */}
      <Styled.Item onClick={() => setControl("fields")} type="button">
        <i>
          <FaImages />
        </i>
      </Styled.Item>
      <Styled.Item onClick={() => setControl("settings")} type="button">
        <i>
          <FaCog />
        </i>
      </Styled.Item>
      {/* <Styled.Item
        onClick={() => rollDice("1d6")}
        type="button"
      >
        <i>
          <FaDiceD6 />
        </i>
      </Styled.Item>
      <Styled.Item
        onClick={() => rollDice("1d20")}
        type="button"
      >
        <i>
          <FaDiceD20 />
        </i>
      </Styled.Item>
      <Styled.Item
        // className="current"
        onClick={() => rollDice("1d100")}
        type="button"
      >
        <i>
          <FaDAndD />
        </i>
      </Styled.Item> */}
    </Styled.Container>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  addObject: () => {
    return {
      type: "ROOM_FORM_SET",
      key: "character",
      item: {
        id: Date.now().toString(34),
        name: "TESTMAN",
        text: "I am a TESTMAN.",
        // images: [{ url: "/bg.jpg" }],
        url: "bg.jpg",
        initiative: 0,
        status: [
          { key: "HP", value: 0, max: 0 },
          { key: "MP", value: 0, max: 0 },
          { key: "SAN", value: 0, max: 0 }
        ],
        // params: [{ key: "DEX", value: 0 }],
        tags: []
      }
    };
  },
  scaleUp: () => {
    return {
      type: "SETTING_SCREEN_SCALE_UP"
    };
  },
  scaleDown: () => {
    return {
      type: "SETTING_SCREEN_SCALE_DOWN"
    };
  },
  setField: () => {
    return {
      type: "ROOM_VIEW_SET",
      key: "controls",
      value: "fields"
    };
  },
  setControl: value => {
    return {
      type: "ROOM_VIEW_SET",
      key: "controls",
      value
    };
  },
  setMessage: () => {
    return {
      type: "ROOM_VIEW_SET",
      key: "controls",
      value: "messages"
    };
  },
  rollDice: notation => {
    return {
      type: "@ROOM_MESSAGE_ADD",
      message: {
        name: "sys",
        text: notation
      }
    };
  }
  // showObjects: () => {
  //   return {
  //     type: "USER_VIEW_SET",
  //     key: "character"
  //   }
  // }
};

const RoomMenuContainer = ({ ...props }) => {
  return <RoomMenu {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomMenuContainer);

const Styled = {};
Styled.Container = styled.div`
  padding: 16px 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  /* position: absolute;
  right: 8px;
  bottom: -12px;
  z-index: 10; */
`;
Styled.Item = styled.button`
  margin: 0 8px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  width: 36px;
  height: 36px;
  background: #fff;
  overflow: hidden;
  /* position: absolute; */
  /* bottom: -12px; */
  color: #222;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
  &.current {
    width: 56px;
    height: 56px;
    background: #222;
    color: #fff;
  }
  i {
    box-sizing: border-box;
    padding: 8px;
    width: 100%;
    height: 100%;
    line-height: 1;
    display: block;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  span {
    padding: 4px;
    padding-right: 8px;
    line-height: 1;
    display: block;
    font-size: 10px;
    font-weight: 800;
  }
  @media (max-width: 780px) {
    span {
      display: none;
    }
  }
`;
Styled.ItemA = styled(Styled.Item)`
  right: 8px;
`;
Styled.ItemB = styled(Styled.Item)`
  right: 128px;
`;
