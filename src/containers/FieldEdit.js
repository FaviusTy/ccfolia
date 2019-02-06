import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { withFormik, Form, Field } from "formik";
import { FormStyle, FormGroup, FormItem, FormAction } from "../components/Form";
import Files from "./Files";
import Spinner from "../components/Spinner";

const FieldEdit = ({ setFieldValue, updateField, values }) => {
  return (
    <Styled.Container>
      <Form>
        <Files className="files">
          {({ files, open }) => {
            return (
              <Styled.Files>
                {files.map(file => {
                  return (
                    <Styled.File>
                      <figure
                        onClick={() => setFieldValue("images[0].url", file.url)}
                        className={
                          values.images[0].url === file.url ? "current" : false
                        }
                      >
                        {file.uploaded ? (
                          <img src={file.url} />
                        ) : (
                          <Spinner size={60} />
                        )}
                        <figcaption>{file.name}</figcaption>
                        <button type="button">DELETE</button>
                      </figure>
                    </Styled.File>
                  );
                })}
              </Styled.Files>
            );
          }}
        </Files>
        <FormItem>
          <label>baseSize</label>
          <Field name="baseSize" type="number" />
        </FormItem>
        <FormGroup>
          <FormItem>
            <label for="size[0]">X</label>
            <Field name="size[0]" type="number" />
          </FormItem>
          <FormItem>
            <label for="size[1]">Y</label>
            <Field name="size[1]" type="number" />
          </FormItem>
        </FormGroup>
        <FormAction>
          <button type="submit">SAVE</button>
        </FormAction>
      </Form>
    </Styled.Container>
  );
};

const Styled = {};
Styled.Container = styled(FormStyle)`
  height: 100%;
  form {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .files {
    flex: 1;
  }
`;
Styled.Files = styled.div`
  padding-top: 8px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-wrap: wrap;
  &::-webkit-scrollbar {
    display: none;
  }
  figure {
    box-sizing: border-box;
    margin: 8px;
    position: relative;
    max-width: 112px;
    height: 63px;
    background: #fff;
    &.current {
      outline: 2px solid #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
    figcaption {
      padding: 4px;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      line-height: 1;
      font-size: 10px;
      color: #fff;
      opacity: 0.4;
    }
  }
`;
Styled.File = styled.div`
  width: 25%;
  max-width: 112px;
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
      baseSize: 60,
      size: [15, 12]
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
