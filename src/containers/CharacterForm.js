import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { withFormik, Form, Field, FieldArray } from "formik";
import { FormikEffect } from "../modules/formik-effect";

const CharacterForm = ({}) => {
  return (
    <Styled.Container>
      <Form>
        <h2>Name</h2>
        <Field name="name" />
        <h2>Images</h2>
        <FieldArray name="images" component={ImagesField} />
        <h2>Profile</h2>
        <Field name="text" component="textarea" />
        <h2>Status</h2>
        <Field name="status" component="textarea" />
        <h2>Params</h2>
        <Field name="params" component="textarea" />
        <button>SUBIMT</button>
      </Form>
    </Styled.Container>
  );
};

const ImagesField = ({ form, push }) => {
  const { values } = form;
  return (
    <Styled.StatusField>
      {values.images.map((state, i) => {
        return (
          <div key={i}>
            <Field name={`images.${i}.url`} />
          </div>
        );
      })}
      <button onClick={() => push({ url: "/bg.jpg" })} type="button">
        Add
      </button>
    </Styled.StatusField>
  );
};

const Styled = {};
Styled.Container = styled.div``;
Styled.StatusField = styled.div``;

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = {};

const mapPropsToValues = ({}) => {
  return {
    name: "",
    text: "",
    images: [],
    status: `HP:10/10\nMP:10/10\nSAN:50/50`,
    params: `DEX:15`,
    tags: []
  };
};

const handleSubmit = (values, { props }) => {
  console.log(values);
};

const CharacterFormContainer = ({ ...props }) => {
  return <CharacterForm {...props} />;
};

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
)(CharacterFormContainer);
