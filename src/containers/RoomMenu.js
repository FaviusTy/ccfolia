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

const RoomMenu = ({ addObject, scaleUp, scaleDown, setField }) => {
  return (
    <Styled.Container>
      <Styled.Item onClick={() => addObject()} type="button">
        <i>
          <FaChessPawn />
        </i>
        <span>駒追加</span>
      </Styled.Item>
      <Styled.Item onClick={() => setField()} type="button">
        <i>
          <FaImages />
        </i>
        <span>背景・音源変更</span>
      </Styled.Item>
      <Styled.Item className="current" onClick={() => scaleDown()} type="button">
        <i>
          <FaComment />
        </i>
        {/* <span>縮小</span> */}
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
        images: [{ url: "/bg.jpg" }],
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
    };
  },
  scaleDown: () => {
    return {
      type: "SETTING_SCREEN_SCALE_DOWN"
    };
  },
  setField: () => {
    return {
      type: "ROOM_FORM_SET",
      key: "field",
      item: true
    };
    // return {
    //   type: "@ROOM_FIELD_SET",
    //   field: {
    //     images: [
    //       {
    //         url: "/bg.jpg",
    //         size: [1, 1],
    //         position: [0, 0]
    //       }
    //     ],
    //     background: {
    //       url: "/bg.jpg"
    //     }
    //   }
    // };
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
  padding: 8px;
  display: flex;
  justify-content: space-between;
  /* position: absolute;
  right: 8px;
  bottom: -12px;
  z-index: 10; */
`;
Styled.Item = styled.button`
  margin: 8px;
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
  &.current {
    margin-top: 2px;
    width: 42px;
    height: 42px;
    background: #222;
    color: #fff;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  }
  i {
    box-sizing: border-box;
    padding: 24%;
    width: 100%;
    height: 100%;
    line-height: 1;
    /* background: #222; */
    svg {
      /* border: 2px solid #ccc; */
      width: 100%;
      height: 100%;
      /* color: #222; */
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
