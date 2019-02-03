import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Background = ({ background }) => {
  return (
    <Styled.Container>
      {background.url ? <img src={background.url} /> : null}
    </Styled.Container>
  );
};

const Styled = {};
Styled.Container = styled.div`
  position: absolute;
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
  return {
    background: {
      url: "/bg.jpg"
    }
  };
};

const mapDispatchToProps = {};

const BackgroundContainer = ({ ...props }) => {
  return <Background {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackgroundContainer);
