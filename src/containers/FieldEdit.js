import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { withFormik, Form, Field } from "formik";
import { FormStyle, FormGroup, FormItem, FormAction } from "../components/Form";
import Files from "./Files";
import Spinner from "../components/Spinner";

const FieldEdit = ({ setFieldValue, setValues, updateField, values }) => {
  const [showAudioFiles, setShowAudioFiles] = useState(false);
  return (
    <Styled.Container>
      <Form>
        <Files className="files">
          {({ files, open }) => {
            return (
              <Styled.Files>
                {files.map(file => {
                  return (
                    <Styled.File key={file.id}>
                      <figure
                        onClick={() => setFieldValue("images[0].url", file.url)}
                        className={
                          values.images[0].url === file.url ? "current" : null
                        }
                      >
                        {file.uploaded ? (
                          <img src={file.url} />
                        ) : (
                          <Spinner size={60} />
                        )}
                        <figcaption>{file.name}</figcaption>
                        {/* <button type="button">DELETE</button> */}
                      </figure>
                    </Styled.File>
                  );
                })}
              </Styled.Files>
            );
          }}
        </Files>
        {showAudioFiles ? (
          <Files className="files" accept={["audio/mp3", "audio/wav"]}>
            {({ files }) => {
              return (
                <Styled.Select>
                  <Styled.SelectButton
                    onClick={() => {
                      setFieldValue("tracks", [
                        {
                          ...values.tracks[0],
                          url: "",
                          name: ""
                        }
                      ]);
                      setShowAudioFiles(false);
                    }}
                    type="button"
                  >
                    --------------
                  </Styled.SelectButton>
                  {files.map(file => {
                    return (
                      <Styled.SelectButton
                        key={file.id}
                        onClick={() => {
                          setFieldValue("tracks", [
                            {
                              ...values.tracks[0],
                              url: file.url,
                              name: file.name
                            }
                          ]);
                          setShowAudioFiles(false);
                        }}
                        type="button"
                      >
                        {file.name}
                      </Styled.SelectButton>
                    );
                  })}
                </Styled.Select>
              );
            }}
          </Files>
        ) : null}
        <FormGroup>
          <FormItem>
            <label>BGM</label>
            <button
              onClick={() => setShowAudioFiles(!showAudioFiles)}
              type="button"
            >
              {values.tracks[0].name}
            </button>
          </FormItem>
          <FormItem>
            <label>Volume</label>
            <Field name="tracks[0].volume" step={0.01} type="number" />
          </FormItem>
          <FormItem>
            <label>Loop</label>
            <button
              onClick={() =>
                setFieldValue("tracks[0].loop", !values.tracks[0].loop)
              }
              type="button"
            >
              {values.tracks[0].loop ? "ON" : "OFF"}
            </button>
          </FormItem>
        </FormGroup>
        <FormItem>
          <label>Cell size</label>
          <Field name="baseSize" type="number" />
        </FormItem>
        <FormGroup>
          <FormItem>
            <label htmlFor="size[0]">X</label>
            <Field name="size[0]" type="number" />
          </FormItem>
          <FormItem>
            <label htmlFor="size[1]">Y</label>
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
    overflow: auto;
  }
`;
Styled.Select = styled.div`
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;
Styled.Files = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  /* justify-content: flex-start; */
  overflow: auto;
  -webkit-overflow-scrolling: touch;
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
Styled.SelectButton = styled.button`
  box-sizing: border-box;
  padding: 8px;
  border: none;
  border-bottom: 1px solid #ccc;
  display: block;
  width: 100%;
  background: #eee;
  color: #888;
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
      type: "ROOM_VIEW_CLOSE"
    };
  }
};

const mapPropsToValues = ({ field }) => {
  if (field) {
    return {
      images: field.images || [{ url: "" }],
      tracks: field.tracks || [{ url: "", volume: 0.05, loop: true }],
      baseSize: field.baseSize,
      size: field.size
    };
  } else {
    return {
      images: [{ url: "" }],
      tracks: [{ url: "", volume: 0.05, loop: true }],
      baseSize: 60,
      size: [8, 6]
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
