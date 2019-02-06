import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { withFormik, Form, Field } from "formik";
import { FormikEffect } from "../modules/formik-effect";
import Files from "./Files";

const TrackEdit = ({ setFieldValue, values }) => {
  return (
    <Styled.Container>
      <Form>
        <Files accept={["audio/mp3", "audio/wav"]}>
          {({ files }) => {
            return files.map(file => {
              return (
                <button
                  onClick={() => setFieldValue("url", file.url)}
                  type="button"
                >
                  aa{file.name}
                </button>
              );
            });
          }}
        </Files>
        <Field name="url" type="text" />
        <Field name="volume" type="number" step="0.01" />
        <Field name="loop" component={CheckBox} />
        <button type="submit">SAVE</button>
      </Form>
    </Styled.Container>
  );
};

const CheckBox = ({ form: { setFieldValue }, field: { name, value } }) => {
  return (
    <input
      type="checkbox"
      onChange={e => {
        setFieldValue(name, e.currentTarget.checked);
      }}
      checked={value}
    />
  );
};

const Styled = {};
Styled.Container = styled.div``;

const mapStateToProps = state => {
  return {
    track: state.room.tracks[0]
  };
};

const mapDispatchToProps = {
  setTrack: track => {
    return {
      type: "@ROOM_TRACK_SET",
      itemId: "bgm",
      track
    };
  }
};

const mapPropsToValues = ({ track }) => {
  if (track) {
    return {
      loop: track.loop,
      volume: track.volume,
      url: track.url
    };
  } else {
    return {
      loop: true,
      volume: 0.05,
      url: ""
    };
  }
};

const handleSubmit = (values, { props }) => {
  props.setTrack(values);
};

const TrackEditContainer = ({ ...props }) => {
  return <TrackEdit {...props} />;
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
)(TrackEditContainer);
