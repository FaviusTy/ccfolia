import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";

import { useAction } from "../hooks/redux-action";
import { useForm } from "../hooks/form";

import SelectFile from "./shared/SelectFile";

const dfiles = [
  { url: "/bg.jpg", contentType: "image/jpeg" },
  { url: "/bg2.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" }
];
const FieldObjectEdit = ({ files = dfiles }) => {
  const { values, setFieldValue, formProps } = useForm(
    {
      name: "HOGE",
      text: "TEXT TEXT TEXT",
      chat: "1d100<=25",
      status: [
        { key: "hp", value: 0, max: 0 },
        { key: "mp", value: 0, max: 0 },
        { key: "san", value: 0, max: 0 }
      ],
      initiative: 0,
      imageUrls: ["/bg.jpg", "/bg2.jpg", "/bg3.jpg"],
      imageUrl: null,
      size: [1, 1],
      position: [0, 0],
      z: 0,
      locked: false,
      listed: true
    },
    console.log
  );
  // callback
  const addStatus = useCallback(() => {
    setFieldValue("status", [...values.status, { key: "", value: 0, max: 0 }]);
  });
  const removeStatus = useCallback(i => {
    setFieldValue("status", values.status.filter((_, j) => j !== i));
  });
  return (
    <Container>
      <Visual>
        <VisualImage src={values.imageUrl} />
      </Visual>
      <ImageList>
        {values.imageUrls.map((url, i) => {
          return (
            <ImageItem
              key={i}
              current={values.imageUrl === url}
              onClick={() => setFieldValue("imageUrl", url)}
            >
              <Image src={url} />
            </ImageItem>
          );
        })}
      </ImageList>
      <SelectFile
        onSelect={urls => setFieldValue("imageUrls", urls)}
        files={dfiles}
        selected={values.imageUrls}
      >
        SELECT FILES
      </SelectFile>

      <Form {...formProps}>
        <FieldTitle>Name (initiative)</FieldTitle>
        <FieldGroup>
          <FieldItem>
            <TextField name="name" type="text" defaultValue={values.name} />
          </FieldItem>
          <FieldItem width={60}>
            <TextField
              name="initiative"
              type="number"
              defaultValue={values.initiative}
            />
          </FieldItem>
        </FieldGroup>

        <FieldTitle>Status</FieldTitle>
        {values.status.map((param, i) => {
          return (
            <FieldGroup key={param.key + i}>
              <FieldItem>
                {i === 0 ? <FieldLabel>Key</FieldLabel> : null}
                <TextField
                  name={`status[${i}].key`}
                  type="text"
                  defaultValue={param.key}
                />
              </FieldItem>
              <FieldItem>
                {i === 0 ? <FieldLabel>Max</FieldLabel> : null}
                <TextField
                  name={`status[${i}].max`}
                  type="number"
                  defaultValue={param.max}
                />
              </FieldItem>
              <FieldItem>
                {i === 0 ? <FieldLabel>Value</FieldLabel> : null}
                <TextField
                  name={`status[${i}].value`}
                  type="number"
                  defaultValue={param.value}
                />
              </FieldItem>
              <FieldItem width={30}>
                {i === 0 ? <FieldLabel>&nbsp;</FieldLabel> : null}
                <RemoveButton onClick={() => removeStatus(i)} type="button">
                  -
                </RemoveButton>
              </FieldItem>
            </FieldGroup>
          );
        })}
        <AddButton onClick={() => addStatus()} type="button">
          + Add new status
        </AddButton>

        <FieldTitle>Memo</FieldTitle>
        <TextAreaField name="text" defaultValue={values.text} />

        <FieldTitle>ChatPalet</FieldTitle>
        <TextAreaField name="text" defaultValue={values.chat} />

        <FieldTitle>Size</FieldTitle>
        <FieldGroup>
          <FieldLabelLeft>X</FieldLabelLeft>
          <TextField
            name="size[0]"
            type="number"
            defaultValue={values.size[0]}
          />
          <FieldLabelLeft>Y</FieldLabelLeft>
          <TextField
            name="size[1]"
            type="number"
            defaultValue={values.size[1]}
          />
          <FieldLabelLeft>z-index</FieldLabelLeft>
          <TextField name="z" type="number" defaultValue={values.z} />
        </FieldGroup>

        <FieldTitle>Flags</FieldTitle>
        <FieldGroup>
          <FieldItem>
            <FieldLabel>Listed</FieldLabel>
            <CheckBox name="listed" defaultChecked={values.listed} />
          </FieldItem>
          <FieldItem>
            <FieldLabel>Secret</FieldLabel>
            <CheckBox name="secret" defaultChecked={values.secret} />
          </FieldItem>
          <FieldItem>
            <FieldLabel>Locked</FieldLabel>
            <CheckBox name="locked" defaultChecked={values.locked} />
          </FieldItem>
        </FieldGroup>

        <SubmitButton>SAVE</SubmitButton>
      </Form>
    </Container>
  );
};

const _CheckBox = ({ name, value, defaultChecked, ...props }) => {
  return (
    <label {...props}>
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        value={value}
      />
      <span />
    </label>
  );
};

const Container = styled.div`
  padding: 12px;
  margin: auto;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.9);
`;
const Visual = styled.div`
  height: 210px;
`;
const VisualImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ImageList = styled.div`
  padding: 8px 0;
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
`;
const ImageItem = styled.div`
  margin-right: 8px;
  width: 80px;
  min-width: 80px;
  height: 60px;
  outline: ${({ current }) => (current ? "2px solid #fff" : "none")};
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`;
const Form = styled.form``;
const FieldTitle = styled.div`
  margin: 12px 0 4px;
  color: #444;
  font-size: 12px;
  font-weight: 800;
`;
const FieldGroup = styled.div`
  display: flex;
`;
const FieldItem = styled.div`
  flex: 1;
  display: flex;
  max-width: ${({ width }) => (width ? `${width}px` : `auto`)};
  flex-direction: column;
  & + & {
    border-left: 1px solid #fff;
  }
`;
const FieldLabel = styled.label`
  padding: 4px 0;
  line-height: 1;
  font-size: 12px;
  color: #888;
  /* background: #888; */
`;
const FieldLabelLeft = styled(FieldLabel)`
  padding: 12px;
  font-size: 10px;
`;
const TextField = styled.input`
  box-sizing: border-box;
  padding: 8px;
  border: none;
  width: 100%;
  flex: 1;
  display: block;
  background: #eee;
  color: #222;
  font-size: 14px;
`;
const CheckBox = styled(_CheckBox)`
  display: block;
  overflow: hidden;
  width: 100%;
  height: 32px;
  background: #eee;
  span {
    box-sizing: border-box;
    padding: 11px 0;
    display: inline-block;
    width: 50%;
    height: 32px;
    background: #ccc;
    color: #222;
    line-height: 1;
    text-align: center;
    font-size: 10px;
    ::before {
      content: "off";
    }
  }
  input {
    display: none;
  }
  input:checked + span {
    margin-left: 50%;
    background: #484;
    ::before {
      content: "on";
      color: #fff;
    }
  }
`;
const TextAreaField = styled.textarea`
  box-sizing: border-box;
  padding: 8px;
  border: none;
  display: block;
  width: 100%;
  background: #eee;
  color: #222;
  font-size: 14px;
`;
const Button = styled.button`
  border: none;
  display: block;
`;
const AddButton = styled(Button)`
  padding: 8px;
  width: 100%;
  background: #fff;
  color: #888;
`;
const RemoveButton = styled(Button)`
  padding: 8px;
  border: 1px solid #eee;
  height: 100%;
  background: #fff;
  color: #888;
`;
const SubmitButton = styled(Button)`
  margin-top: 12px;
  padding: 12px;
  width: 100%;
  background: #444;
  color: #fff;
`;

export default memo(FieldObjectEdit);

// const Status = styled.div``;
// const Param = styled.div`
//   margin-bottom: 1px;
//   display: flex;
// `;
// const ParamData = styled.div`
//   padding: 8px;
//   flex: 1;
//   position: relative;
//   background: #f5f5f5;
// `;
// const ParamText = styled.div`
//   position: relative;
//   z-index: 1;
//   color: #444;
//   font-size: 12px;
// `;
// const Bar = styled.div`
//   position: absolute;
//   left: 0;
//   top: 0;
//   bottom: 0;
//   width: ${({ width = 0 }) => `${width * 100}%`};
//   background-color: ${({ color = "#ccc" }) => color};
// `;
// // const Button = styled.button`
// //   border: none;
// //   width: 36px;
// // `;
// const Minus = styled(Button)`
//   background: #888;
//   color: #fff;
// `;
// const Plus = styled(Button)`
//   background: #444;
//   color: #fff;
// `;
