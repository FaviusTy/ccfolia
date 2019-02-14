import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";

import { useAction } from "../hooks/redux-action";
import { useForm } from "../hooks/form";

import { FaThList, FaPaperPlane } from "react-icons/fa";

const defaultSentences = ["hoge", "fuga", "moge"];
const defaultImages = ["/bg.jpg", "/bg2.jpg"];
const ChatBox = ({
  name = "hoge",
  images = defaultImages,
  sentences = defaultSentences
}) => {
  // action
  const { sendMessage } = useAction(actions);
  // state
  const [control, setControl] = useState(null);
  // callback
  const onSubmit = (values, { setFieldValue }) => {
    setFieldValue("text", "");
    setControl(null);
    sendMessage(values);
  };
  const handleKeyPress = useCallback(e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  });
  const onSelecImage = useCallback(url => {
    setControl(null);
    setFieldValue("imageUrl", url);
  });
  const onSelecText = useCallback(text => {
    if (text === values.text) {
      setControl(null);
      submit();
    } else {
      setFieldValue("text", text);
    }
  });
  // form
  const { values, submit, setFieldValue, handleChange, handleSubmit } = useForm(
    { name, imageUrl: images[0], text: "" },
    onSubmit
  );
  return (
    <Container>
      {control === "image" ? (
        <ImagePalet items={images} onSelect={onSelecImage} />
      ) : null}
      {control === "text" ? (
        <ChatPalet items={sentences} onSelect={onSelecText} />
      ) : null}
      <Form onSubmit={handleSubmit}>
        <Profile
          onClick={() =>
            setControl(state => (state === "image" ? null : "image"))
          }
        >
          <ProfileImage src={values.imageUrl} />
        </Profile>
        <TextAreaField
          name="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={values.text}
        />
        <SendButton type="submit">
          <SendIcon />
        </SendButton>
        <TextSelectButton
          onClick={() =>
            setControl(state => (state === "text" ? null : "text"))
          }
          type="button"
        >
          <TextSelectIcon />
        </TextSelectButton>
      </Form>
    </Container>
  );
};

const ChatPalet = memo(({ items, onSelect }) => {
  return (
    <TextList>
      {items.map((item, i) => {
        return (
          <TextItem key={i} onClick={() => onSelect(item)}>
            {item}
          </TextItem>
        );
      })}
    </TextList>
  );
});

const ImagePalet = memo(({ items, onSelect }) => {
  return (
    <ImageList>
      {items.map((item, i) => {
        return (
          <ImageItem key={i} onClick={() => onSelect(item)}>
            <Image src={item} />
          </ImageItem>
        );
      })}
    </ImageList>
  );
});

export const actions = {
  sendMessage: values => {
    return {
      type: "CHAT_BOX_SEND",
      data: values
    };
  }
};

const Container = styled.div`
  background: rgba(255, 255, 255, 0.74);
`;
const Form = styled.form`
  border-top: 1px solid #eee;
  display: flex;
  align-items: flex-start;
`;
const Profile = styled.div`
  box-sizing: border-box;
  padding: 8px;
  width: 48px;
  height: 48px;
`;
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`;
const TextAreaField = styled.textarea`
  box-sizing: border-box;
  margin: 4px 0;
  padding: 8px;
  border: none;
  border-radius: 2px;
  flex: 1;
  min-height: 40px;
  height: 40px;
  /* background: none; */
  color: #444;
`;
const Button = styled.button`
  width: 48px;
  height: 48px;
  border: none;
  background: none;
  color: #444;
`;
const TextSelectButton = styled(Button)``;
const TextSelectIcon = styled(FaThList)`
  margin-top: 2px;
  width: 20px;
  height: 20px;
`;
const SendButton = styled(Button)``;
const SendIcon = styled(FaPaperPlane)`
  width: 20px;
  height: 20px;
`;
const TextList = styled.div``;
const TextItem = styled.div`
  padding: 12px;
  border-top: 1px solid #eee;
  background: #fff;
  color: #888;
`;
const ImageList = styled.div`
  padding: 8px;
  border-top: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ImageItem = styled.div`
  margin-right: 8px;
  border-bottom: 1px solid #eee;
  width: 60px;
  height: 60px;
  background: #fff;
  color: #888;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
`;

export default memo(ChatBox);
