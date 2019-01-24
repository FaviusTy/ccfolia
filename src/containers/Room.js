import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Room = () => {
  return <Styled.Container />;
};

const Styled = {};
Styled.Container = styled.div``;

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {};

const RoomContainer = ({ ...props }) => {
  return <Room {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomContainer);
