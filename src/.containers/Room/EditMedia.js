import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { withFormik, Form, Field } from "formik";
import { FormikEffect } from "../../modules/formik-effect";

import Files from "./Files";

const EditMedia = ({ media, values, setValues, submitForm }) => {
  return (
    <StyledContainer>
      <Files
        tags={["bg"]}
        accept={["audio/mp3", "audio/wav"]}
        onSelect={file =>
          setValues({
            name: file.name,
            url: file.url,
            volume: 0.1,
            loop: true
          })
        }
        size={42}
      />
      <Form>
        <FormikEffect onChange={() => submitForm()} />
      </Form>
    </StyledContainer>
  );
};

const mapStateToProps = state => {
  return {
    media: state.room.table.media
  };
};

const mapDispatchToProps = {
  setMedia: media => {
    return {
      type: "@TABLE_SET",
      item: {
        media: {
          ...media,
          muted: false
        }
      }
    };
  }
};

const mapPropsToValues = ({ background }) => {
  return background;
};

const handleSubmit = (values, { props }) => {
  const { setMedia } = props;
  setMedia(values);
};

const StyledContainer = styled.div``;

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFormik({
    mapPropsToValues,
    handleSubmit,
    enableReinitialize: true
  })
)(EditMedia);
