import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Settings = ({ resetFiles, resetMessages }) => {
  return (
    <Styled.Container>
      <button onClick={() => resetMessages()} type="button">
        RESET MESSAGES
      </button>
      <button onClick={() => resetFiles()} type="button">
        RESET FILES
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
  resetMessages: () => {
    return {
      type: "@ROOM_MESSAGE_DELETE_ALL"
    };
  },
  resetFiles: () => {
    return {
      type: "@FILES_DELETE_ALL"
    };
  }
};

const SettingsContainer = ({ ...props }) => {
  return <Settings {...props} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsContainer);
