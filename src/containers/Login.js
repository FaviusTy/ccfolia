import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Login = ({ loginWithTwitter }) => {
  return <Styled.Container>
    <button onClick={loginWithTwitter} type="button">Login with Twitter</button>
    <button type="button">Guest User</button>
  </Styled.Container>;
};

const Styled = {};
Styled.Container = styled.div``;

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  loginWithTwitter: () => {
    return {
      type: '@hoge'
    };
  }
};

const LoginContainer = ({ ...props }) => {
  return <Login {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
