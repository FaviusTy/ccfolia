import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { withFormik, Form, Field } from "formik";
import Files from "./Files";
import Spinner from "../components/Spinner";

const FieldEdit = ({ setFieldValue, updateField }) => {
  return (
    <Styled.Container>
      <Files>
        {({ files, open }) => {
          return (
            <Styled.Files>
              <div>aa</div>
              {files.map(file => {
                return (
                  <figure
                    onClick={() => updateField({ images: [{ url: file.url }] })}
                  >
                    {file.uploaded ? (
                      <img src={file.url} />
                    ) : (
                      <Spinner size={60} />
                    )}
                    <figcaption>{file.name}</figcaption>
                  </figure>
                );
              })}
            </Styled.Files>
          );
        }}
      </Files>
      <Form>
        <h2>Field</h2>
        {/* <Field name="images[0].url" type="text" /> */}
        {/* <Files onSelect={({ url }) => setFieldValue("images[0].url", url)}>
          {({ files, open }) => {
            return <div>
              {files.map((file) => {
                return <p>{file.name}</p>
              })}
            </div>
          }}
        </Files> */}
        <Field name="baseSize" type="number" />
        <Field name="size[0]" type="number" />
        <Field name="size[1]" type="number" />
        <button type="submit">SUBMIT</button>
      </Form>
    </Styled.Container>
  );
};

const Styled = {};
Styled.Container = styled.div``;
Styled.Files = styled.div`
  display: flex;
  figure {
    width: 112px;
    height: 63px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const mapStateToProps = state => {
  return {
    field: state.room.fields[0]
  };
};

const mapDispatchToProps = {
  setField: field => {
    return {
      type: "@ROOM_FIELD_SET",
      field
    };
  },
  updateField: field => {
    return {
      type: "@ROOM_FIELD_UPDATE",
      field
    };
  },
  close: () => {
    return {
      type: "ROOM_FORM_SET",
      key: "field",
      item: null
    };
  }
};

const mapPropsToValues = ({ field }) => {
  if (field) {
    return {
      images: field.images,
      baseSize: field.baseSize,
      size: field.size
    };
  } else {
    return {
      images: [{ url: "/bg.jpg" }],
      baseSize: 30,
      size: [30, 20]
    };
  }
};

const handleSubmit = (values, { props }) => {
  props.setField(values);
};

const FieldEditContainer = ({ ...props }) => {
  return <FieldEdit {...props} />;
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
)(FieldEditContainer);
