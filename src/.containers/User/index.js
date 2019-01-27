import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { useFirestore, useAuth } from "../../firebase/hooks";

import Auth from "./Auth";

const selectFiles = uid => db =>
  db.collection(`users/${uid}/files`).orderBy("t");

const User = ({ user, fileChanges, initUser }) => {
  const auth = useAuth(initUser);
  useFirestore(selectFiles(user.uid), fileChanges, [user.uid]);

  return (
    <Container>
      <Auth />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user.auth
  };
};

const mapDispatchToProps = {
  fileChanges: changes => {
    return {
      type: "FILE_CHANGES",
      changes
    };
  },
  initUser: user => {
    return {
      type: "USER_INIT",
      user
    };
  }
};

const Container = styled.div``;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
