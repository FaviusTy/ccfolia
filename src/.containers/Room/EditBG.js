import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { withFormik, Form, Field } from "formik";
import { FormikEffect } from "../../modules/formik-effect";

import Files from "./Files";

const EditBG = ({ values, setFieldValue, submitForm }) => {
  return (
    <StyledContainer>
      <Files
        tags={["bg"]}
        accept={["image/png", "image/jpeg", "image/gif"]}
        onSelect={file => setFieldValue("url", file.url)}
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
    background: state.room.table.background
  };
};

const mapDispatchToProps = {
  setBG: background => {
    return {
      type: "@TABLE_SET",
      item: {
        background
      }
    };
  }
};

const mapPropsToValues = ({ background }) => {
  return background;
};

const handleSubmit = (values, { props }) => {
  const { setBG } = props;
  setBG(values);
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
)(EditBG);
