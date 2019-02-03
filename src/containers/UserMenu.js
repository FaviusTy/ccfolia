import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";

const UserMenu = ({ showList }) => {
  return (
    <Styled.Container onClick={() => showList()}>
      <img src="/bg2.jpg" />
    </Styled.Container>
  );
};

const Styled = {};
Styled.Container = styled.div`
  /* border-radius: 0 0 0 12px; */
  border-radius: 12px;
  position: fixed;
  top: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background: #fff;
  width: 90px;
  height: 60px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;
const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  showList: () => {
    return {
      type: "USER_VIEW_SET",
      key: "character"
    };
  }
};

const UserMenuContainer = ({ ...props }) => {
  return <UserMenu {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMenuContainer);
