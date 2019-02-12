import React, { useCallback } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { withFormik, Form, Field, FieldArray } from "formik";
import { FormStyle, FormGroup, FormItem, FormAction } from "../components/Form";
import Files from "./Files";
import { FaTimes, FaPlus } from "react-icons/fa";
import Spinner from "../components/Spinner";

const CharacterForm = ({ item, values, remove, setFieldValue }) => {
  return (
    <Styled.Container>
      <Form>
        <Files className="files">
          {({ files, open }) => {
            return (
              <Styled.Files>
                <Styled.File>
                  <figure>
                    <FaPlus onClick={() => open()} />
                  </figure>
                </Styled.File>
                {files.map(file => {
                  return (
                    <Styled.File key={file.id}>
                      <figure
                        onClick={() => setFieldValue("url", file.url)}
                        className={values.url === file.url ? "current" : null}
                      >
                        {file.uploaded ? (
                          <img src={file.url} />
                        ) : (
                          <Spinner size={60} />
                        )}
                        <figcaption>{file.name}</figcaption>
                      </figure>
                    </Styled.File>
                  );
                })}
              </Styled.Files>
            );
          }}
        </Files>
        <FormAction>
          <span onClick={() => remove(item.id)}>DELETE</span>
        </FormAction>
        <FormItem>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
        </FormItem>
        <FormItem>
          <label htmlFor="initiative">Initiative</label>
          <Field name="initiative" type="number" />
        </FormItem>
        {/* <FormItem>
          <label htmlFor="status">Status</label>
          <FieldArray name="status" component={StatusField} />
        </FormItem> */}
        <FieldArray name="status" component={StatusField} />
        <FormItem>
          <label>Size</label>
          <Field name="size" component={SizeField} />
        </FormItem>
        <FormAction>
          <button type="submit">SAVE</button>
        </FormAction>
      </Form>
      {/* <Styled.CloseButton onClick={close} /> */}
    </Styled.Container>
  );
};

const SizeField = ({ form: { setFieldValue }, field: { name, value } }) => {
  const handleChange = useCallback(value => {
    setFieldValue(name, value);
  });
  return (
    <Styled.SizeTable>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((x) => [1, 2, 3, 4, 5, 6, 7, 8].map((y) => {
        return <button onClick={() => handleChange([x, y])} type="button">{x}-{y}</button>
      }))}
    </Styled.SizeTable>
  )
};

const StatusField = ({ form, push, remove }) => {
  const { status } = form.values;
  return (
    <Styled.Status>
      {status.map((state, i) => {
        return (
          <FormGroup key={i}>
            <FormItem>
              <Field name={`status[${i}].key`} type="text" />
            </FormItem>
            <FormItem>
              <Field name={`status[${i}].value`} type="number" />
            </FormItem>
            <FormItem>
              <Field name={`status[${i}].max`} type="number" />
            </FormItem>
            {/* <FormItem width={30}>
              <button onClick={() => remove(i)} type="button">
                <FaTimes />
              </button>
            </FormItem> */}
          </FormGroup>
        );
      })}
      {/* <FormItem>
        <button onClick={() => push({ key: "???", value:0, max: 0 })} type="button">
          Add
        </button>
      </FormItem> */}
    </Styled.Status>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    item: state.room.form.character
  };
};

const mapDispatchToProps = {
  submit: (id, item) => {
    return {
      type: "@ROOM_OBJECT_SET",
      itemId: id,
      object: item
    };
  },
  remove: id => {
    return {
      type: "@ROOM_OBJECT_DELETE",
      itemId: id
    };
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
      url: item.url,
      initiative: item.initiative,
      status: item.status,
      tags: item.tags,
      size: item.size || [1, 1],
      position: item.position || [0, 0]
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

Styled.SizeTable = styled.div`
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  width: 240px;
  button {
    padding: 0;
    outline: 1px solid #eee;
    width: 30px;
    height: 30px;
    text-align: center;
  }
`

Styled.Status = styled.div``;
Styled.State = styled.div``;
