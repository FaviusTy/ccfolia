import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Login = ({ signInWithTwitter, signInGuest }) => {
  return (
    <Styled.Container>
      {/* <h1><img src="/icon-400x400.png" width="200" height="200" alt="ccfolia"/></h1> */}
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
Styled.Container = styled.div`
  box-sizing: border-box;
  padding-top: 60px;
  h1 {
    margin: 0 auto;
    padding: 30px;
    width: 200px;
    height: 200px;
  }
  button {
    margin: 12px auto;
    padding: 24px;
    border: none;
    display: block;
    background: #fff;
    width: 300px;
    /* box-shadow: 0 0 12px rgba(0, 0, 0, 0.6); */
    color: #888;
    font-size: 20px;
  }
`;

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
