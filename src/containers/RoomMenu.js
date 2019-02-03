import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  FaComment,
  FaChessPawn,
  FaImages,
  FaSearchPlus,
  FaSearchMinus
} from "react-icons/fa";

const RoomMenu = ({ addObject, scaleUp, scaleDown }) => {
  return (
    <Styled.Container>
      <Styled.Item onClick={() => addObject()} type="button">
        <i>
          <FaChessPawn />
        </i>
        <span>駒追加</span>
      </Styled.Item>
      <Styled.Item type="button">
        <i>
          <FaImages />
        </i>
        <span>背景・音源変更</span>
      </Styled.Item>
      <Styled.Item onClick={() => scaleDown()} type="button">
        <i>
          <FaSearchMinus />
        </i>
        {/* <span>縮小</span> */}
      </Styled.Item>
      <Styled.Item onClick={() => scaleUp()} type="button">
        <i>
          <FaSearchPlus />
        </i>
        {/* <span>拡大</span> */}
      </Styled.Item>
      {/* <Styled.ItemB type="button">
        <i><FaComment /></i>
        <span>チャットパレット</span>
      </Styled.ItemB> */}
    </Styled.Container>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  addObject: () => {
    return {
      type: "USER_FORM_SET",
      key: "character",
      item: {
        id: Date.now().toString(34),
        name: "TESTMAN",
        text: "I am a TESTMAN.",
        images: [{ url: "/icon-100x100.png" }],
        initiative: 0,
        status: [
          { key: "HP", value: 0, max: 0 },
          { key: "MP", value: 0, max: 0 },
          { key: "SAN", value: 0, max: 0 }
        ],
        params: [{ key: "DEX", value: 0 }],
        tags: []
      }
    };
  },
  scaleUp: () => {
    return {
      type: "SETTING_SCREEN_SCALE_UP"
    }
  },
  scaleDown: () => {
    return {
      type: "SETTING_SCREEN_SCALE_DOWN"
    }
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
  display: flex;
  position: absolute;
  right: 8px;
  bottom: -12px;
  z-index: 10;
`;
Styled.Item = styled.button`
  margin-left: 8px;
  border: 2px solid #fff;
  border-radius: 14px;
  display: flex;
  align-items: center;
  /* width: 42px; */
  height: 28px;
  background: #fff;
  /* position: absolute; */
  /* bottom: -12px; */
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.6);
  color: #222;
  i {
    padding: 6px;
    width: 12px;
    height: 12px;
    border-radius: 14px;
    line-height: 1;
    background: #222;
    svg {
      /* border: 2px solid #ccc; */
      width: 12px;
      height: 12px;
      color: #fff;
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
