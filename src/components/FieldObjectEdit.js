import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";

import { useAction } from "../hooks/redux-action";
import { useForm } from "../hooks/form";

const dfiles = ["/bg.jpg", "/bg2.jpg", "/bg3.jpg"];
const FieldObjectEdit = ({ files = dfiles }) => {
  const { values, setFieldValue, formProps } = useForm(
    {
      name: "HOGE",
      text: "TEXT TEXT TEXT",
      status: [],
      initiative: 0,
      imageUrls: ["/bg.jpg", "/bg2.jpg", "/bg3.jpg"],
      imageUrl: null,
      size: [1, 1],
      position: [0, 0],
      locked: false
    },
    console.log
  );
  return (
    <Container>
      <Visual>
        <VisualImage src={values.imageUrl} />
      </Visual>
      <ImageList>
        {values.imageUrls.map(url => {
          return (
            <ImageItem current={values.imageUrl === url} onClick={() => setFieldValue("imageUrl", url)}>
              <Image src={url} />
            </ImageItem>
          );
        })}
      </ImageList>
      <button onClick={() => setFieldValue("imageUrls", ["/bg.jpg", ...values.imageUrls])} type="button">
        ADD
      </button>
      <Form {...formProps}>
        <FieldTitle>Name</FieldTitle>
        <TextField name="name" type="text" defaultValue={values.name} />
        <FieldTitle>Text</FieldTitle>
        <TextAreaField name="text" defaultValue={values.text} />
        <FieldTitle>Size</FieldTitle>
        <TextField name="size[0]" type="number" defaultValue={values.size[0]} />
        <TextField name="size[1]" type="number" defaultValue={values.size[1]} />
        <button>SAVE</button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 12px;
  /* background: rgba(255, 255, 255, 0.9); */
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
  outline: ${({ current }) => current ? "2px solid #fff" : "none"};
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
  color: #888;
  font-size: 12px;
  font-weight: 800;
`
const TextField = styled.input`
  box-sizing: border-box;
  padding: 8px;
  width: 100%;
  display: block;
  font-size: 14px;
  color: #444;
`;
const TextAreaField = styled.textarea`
  box-sizing: border-box;
  padding: 8px;
  display: block;
  width: 100%;
  font-size: 14px;
  color: #444;
`;

export default memo(FieldObjectEdit);

const Status = styled.div``;
const Param = styled.div`
  margin-bottom: 1px;
  display: flex;
`;
const ParamData = styled.div`
  padding: 8px;
  flex: 1;
  position: relative;
  background: #f5f5f5;
`;
const ParamText = styled.div`
  position: relative;
  z-index: 1;
  color: #444;
  font-size: 12px;
`;
const Bar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ width = 0 }) => `${width * 100}%`};
  background-color: ${({ color = "#ccc" }) => color};
`;
const Button = styled.button`
  border: none;
  width: 36px;
`;
const Minus = styled(Button)`
  background: #888;
  color: #fff;
`;
const Plus = styled(Button)`
  background: #444;
  color: #fff;
`;
