import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";

import { useAction } from "../hooks/redux-action";
import { useForm } from "../hooks/form";

import {
  Form,
  FieldTitle,
  FieldGroup,
  FieldItem,
  FieldLabel,
  FieldLabelLeft,
  TextField,
  CheckBox,
  TextAreaField,
  AddButton,
  RemoveButton,
  SubmitButton
} from "./shared/Form";
import FileSelect from "./shared/FileSelect";

const dfiles = [
  { url: "/bg.jpg", contentType: "image/jpeg" },
  { url: "/bg2.jpg", contentType: "image/jpeg" },
  { url: "/bg3.jpg", contentType: "image/jpeg" }
];

const dfiles2 = [
  {
    name: "Lorem ipsum dolor sit amet.mp3",
    url: "/dice.mp3",
    contentType: "audio/mp3"
  },
  {
    name: "Lorem ipsum dolor sit amet.mp3",
    url: "/dice2.mp3",
    contentType: "audio/mp3"
  },
  {
    name: "Lorem ipsum dolor sit amet.mp3",
    url: "/dice3.mp3",
    contentType: "audio/mp3"
  }
];

const SceneEdit = ({}) => {
  const { submitScene } = useAction(actions);
  const { formProps, values, setFieldValue } = useForm(
    {
      name: "",
      imageUrls: [],
      bgm: {
        name: "",
        url: "",
        volume: 0.05,
        loop: true
      },
      fieldSize: [8, 6],
      cellSize: [60]
    },
    submitScene
  );
  return (
    <Container>
      <Frame>
        <Background>
          <BackgroundImage src={values.imageUrls[0]} />
        </Background>
        <Screen>
          <Field col={values.fieldSize[0]} row={values.fieldSize[1]}>
            {values.imageUrls.map((url, i) => (
              <FieldImage key={i} src={url} />
            ))}
          </Field>
        </Screen>
      </Frame>
      <Form {...formProps}>
        <FileSelect
          files={dfiles}
          onSelect={urls => setFieldValue("imageUrls", urls)}
          selected={values.imageUrls}
          max={3}
          type="image"
        >
          Select Images
        </FileSelect>

        <FieldTitle>Name</FieldTitle>
        <TextField name="name" type="text" defaultValue={values.name} />

        <FieldTitle>Size</FieldTitle>
        <FieldGroup>
          <FieldLabelLeft>X</FieldLabelLeft>
          <TextField
            name="fieldSize[0]"
            type="number"
            defaultValue={values.fieldSize[0]}
          />
          <FieldLabelLeft>Y</FieldLabelLeft>
          <TextField
            name="fieldSize[1]"
            type="number"
            defaultValue={values.fieldSize[1]}
          />
          <FieldLabelLeft>Cell</FieldLabelLeft>
          <TextField
            name="cellSize[0]"
            type="number"
            defaultValue={values.cellSize[0]}
          />
        </FieldGroup>

        <FieldTitle>BGM</FieldTitle>
        <TextField
          name="bgm.url"
          type="text"
          disabled
          defaultValue={values.bgm.url}
        />
        <FileSelect
          files={dfiles2}
          onSelect={urls => setFieldValue("bgm.url", urls[0] || "")}
          max={1}
          selected={[values.bgm.url]}
          type="audio"
        >
          Select Audio
        </FileSelect>
        <FieldGroup>
          <FieldItem>
            <FieldLabel>Volume</FieldLabel>
            <TextField
              name="volume"
              type="number"
              step="0.01"
              defaultValue={values.bgm.volume}
            />
          </FieldItem>
          <FieldItem>
            <FieldLabel>Loop</FieldLabel>
            <CheckBox name="loop" defaultChecked={values.bgm.loop} />
          </FieldItem>
        </FieldGroup>
        <SubmitButton>Save</SubmitButton>
      </Form>
    </Container>
  );
};

const actions = {
  submitScene: values => {
    return {
      type: "SCEANE_SUBMIT",
      data: values
    };
  }
};

const Container = styled.div`
  padding: 12px;
  background: rgba(255, 255, 255, 0.9);
`;
const Frame = styled.div`
  padding: 12px;
  position: relative;
  overflow: hidden;
  background: #eee;
`;
const Background = styled.div`
  position: absolute;
  top: -12px;
  left: -12px;
  right: -12px;
  bottom: -12px;
`;
const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(8px) brightness(80%);
`;
const Screen = styled.div`
  margin: auto;
  position: relative;
  width: 240px;
  height: 240px;
`;
const Field = styled.div`
  margin: auto;
  height: ${({ col, row }) =>
    col <= row ? "100%" : `${Math.round((row / col) * 100)}%`};
  width: ${({ col, row }) =>
    col >= row ? "100%" : `${Math.round((col / row) * 100)}%`};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #888;
`;
const FieldImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

export default memo(SceneEdit);
