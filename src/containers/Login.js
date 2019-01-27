import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Login = ({ signInWithTwitter, signInGuest }) => {
  return (
    <Styled.Container>
      <button onClick={signInWithTwitter} type="button">
        Login with Twitter
      </button>
      <button onClick={signInGuest} type="button">
        Guest User
      </button>
    </Styled.Container>
  );
};

const Styled = {};
Styled.Container = styled.div``;

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = {
  signInWithTwitter: () => {
    return {
      type: "@SIGN_IN_WITH_TWITTER"
    };
  },
  signInGuest: () => {
    return {
      type: "@SIGN_IN_GUEST"
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
