import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Background = ({ background }) => {
  return (
    <Styled.Container>
      {background ? <img src={background.url} /> : null}
    </Styled.Container>
  );
};

const Styled = {};
Styled.Container = styled.div`
  position: fixed;
  top: -12px;
  left: -12px;
  right: -12px;
  bottom: -12px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(8px) brightness(80%);
  }
`;

const mapStateToProps = state => {
  if (state.room.fields[0] && state.room.fields[0].images) {
    return {
      background: state.room.fields[0].images[0]
    };
  } else {
    return {
      background: null
    }
  }
};

const mapDispatchToProps = {};

const BackgroundContainer = ({ ...props }) => {
  return <Background {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundContainer);
