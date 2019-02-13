import React, { memo, useState } from "react";
import { useAction } from "../hooks/redux-action";
import { useForm } from "../hooks/form";
import styled from "styled-components";

const defaultSentences = ["hoge", "fuga", "moge"];
const defaultImages = ["/bg.jpg", "/bg2.jpg"];
const ChatBox = ({
  name = "hoge",
  images = defaultImages,
  sentences = defaultSentences
}) => {
  const [control, setControl] = useState(null);
  const { onSubmit } = useAction(actions);
  const { values, setFieldValue, handleChange, handleSubmit } = useForm(
    { name, image: images[0], text: "" },
    onSubmit
  );
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Profile>
          <ProfileImage src={values.image} />
        </Profile>
        <TextField name="name" onChange={handleChange} value={values.name} />
        <TextAreaField
          name="text"
          onChange={handleChange}
          value={values.text}
        />
        <SendButton type="submit">SEND</SendButton>
      </Form>
      <TextSelectButton onClick={() => setControl("text")} type="button">
        ChatPalet
      </TextSelectButton>
      <ImageSelectButton onClick={() => setControl("image")} type="button">
        ImagePalet
      </ImageSelectButton>
      {control === "image" ? (
        <ImagePalet items={images} name="image" onChange={setFieldValue} />
      ) : null}
      {control === "text" ? (
        <ChatPalet items={sentences} name="text" onChange={setFieldValue} />
      ) : null}
    </Container>
  );
};

const ChatPalet = memo(({ items, name, onChange }) => {
  return (
    <TextList>
      {items.map(item => {
        return <TextItem onClick={() => onChange(name, item)}>{item}</TextItem>;
      })}
    </TextList>
  );
});

const ImagePalet = memo(({ items, name, onChange }) => {
  return (
    <TextList>
      {items.map(item => {
        return <TextItem onClick={() => onChange(name, item)}>{item}</TextItem>;
      })}
    </TextList>
  );
});

const actions = {
  onSubmit: (values, { setFieldValue }) => {
    setFieldValue("text", "");
    return {
      type: "CHAT_BOX_SEND",
      data: values
    };
  }
};

const Container = styled.div``;
const Form = styled.form``;
const Profile = styled.div`
  width: 36px;
  height: 36px;
`;
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`;
const TextField = styled.input``;
const TextAreaField = styled.textarea``;
const TextSelectButton = styled.button``;
const ImageSelectButton = styled.button``;
const SendButton = styled.button``;
const TextList = styled.div``;
const TextItem = styled.div``;

export default memo(ChatBox);
