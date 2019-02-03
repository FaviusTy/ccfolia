import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { withFormik, Form, Field, FieldArray } from "formik";
import { FaTimesCircle } from "react-icons/fa";

const CharacterForm = ({ values, close }) => {
  return (
    <Styled.Container>
      <Form>
        <FieldArray name="images" component={ImagesField} />
        <Styled.InputArea>
          <h2>Name</h2>
          <Field name="name" type="text" />
          <h2>Initiative</h2>
          <Field name="name" type="text" />
          <h2>Status</h2>
          <FieldArray name="status" component={StatusField} />
          {/* <h2>Profile</h2> */}
          {/* <Field name="text" component="textarea" /> */}
          {/* <Field name="status" component="textarea" /> */}
          {/* <h2>Params</h2> */}
          {/* <Field name="params" component="textarea" /> */}
        </Styled.InputArea>
        <button type="submit">SUBIMT</button>
      </Form>
      <Styled.CloseButton onClick={close} />
    </Styled.Container>
  );
};

const ImagesField = ({ form, push, remove }) => {
  const { images } = form.values;
  return (
    <Styled.Images>
      {images.map((image, i) => {
        return (
          <div key={i}>
            <figure>{image.url ? <img src={image.url} /> : null}</figure>
            <Field name={`images.${i}.url`} type="text" />
            {/* <button onClick={() => remove(i)}>remove</button> */}
          </div>
        );
      })}
      {/* <button onClick={() => push({ url: "/bg.jpg" })} type="button">
        Add
      </button> */}
    </Styled.Images>
  );
};

const StatusField = ({ form, push, remove }) => {
  const { status } = form.values;
  return (
    <Styled.Status>
      {status.map((state, i) => {
        return (
          <Styled.State key={i}>
            <Field name={`status[${i}].key`} type="text" />
            <Field name={`status[${i}].value`} type="number" />
            <Field name={`status[${i}].max`} type="number" />
            <button onClick={() => remove(i)} type="button">
              remove
            </button>
          </Styled.State>
        );
      })}
      <button onClick={() => push({ url: "/bg.jpg" })} type="button">
        Add
      </button>
    </Styled.Status>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    item: state.user.form.character
  };
};

const mapDispatchToProps = {
  submit: (id, item) => {
    return {
      type: "@ROOM_OBJECT_SET",
      itemId: id,
      object: item
    };
    // return {
    //   type: "@CHARACTER_SET",
    //   id: id,
    //   character: item
    // };
  },
  close: () => {
    return {
      type: "USER_FORM_SET",
      key: "character",
      item: null
    };
  }
};

const mapPropsToValues = ({ item }) => {
  if (item) {
    return {
      name: item.name,
      text: item.text,
      images: item.images,
      status: item.status,
      tags: item.tags,
      size: [1, 1],
      position: [0, 0]
    };
  } else {
    return {
      err: true
    };
  }
};

const handleSubmit = (values, { props }) => {
  props.submit(props.item.id, values);
  props.close();
};

const CharacterFormContainer = ({ ...props }) => {
  if (props.values.err) return null;
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

const Styled = {};
Styled.Container = styled.div`
  margin-top: -240px;
  margin-left: -160px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10;
  width: 320px;
  height: 480px;
  background: #fff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.6);
  form {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  button[type="submit"] {
    padding: 12px;
    border: none;
    background: #eee;
    color: #888;
  }
  input[type="text"],
  input[type="number"],
  textarea {
    box-sizing: border-box;
    padding: 8px;
    border: 2px solid #eee;
    /* border-radius: 12px; */
    display: block;
    width: 100%;
  }
  textarea {
    min-width: 100%;
    max-width: 100%;
  }
  h2 {
    margin: 4px;
    color: #888;
    font-size: 12px;
    :first-child {
      margin-top: 0;
    }
  }
`;
Styled.InputArea = styled.div`
  padding: 12px;
  flex: 1;
  overflow: auto;
`;
Styled.Images = styled.div`
  border-bottom: 1px solid #eee;
  position: relative;
  figure {
    width: 100%;
    height: 210px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top;
    }
  }
  input[type="text"] {
    position: absolute;
    left: 5%;
    right: 5%;
    bottom: 8px;
    width: 90%;
  }
`;
Styled.Status = styled.div``;
Styled.State = styled.div`
  display: flex;
  width: 100%;
  input[type="text"],
  input[type="number"] {
    border-radius: 0;
    width: 20%;
    flex: 1;
  }
`;

Styled.CloseButton = styled(FaTimesCircle)`
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  position: absolute;
  top: -8px;
  right: -8px;
  border-radius: 50%;
  background: #fff;
  color: #444;
  cursor: pointer;
`;

Styled.Image = styled.figure`
  width: 100%;
  height: 240px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }
`;
