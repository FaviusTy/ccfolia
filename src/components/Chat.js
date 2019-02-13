import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";

const Chat = ({ messages, sentences = [1,3,4] }) => {
  const {
    values,
    handleChangeText,
    handleSubmit
  } = useHooks()
  return (
    <Container>
      <Messages>
        {messages.map(() => {
          return (
            <Message>
              <Title component="textarea">NAME</Title>
              <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio,
                nam accusamus nihil ipsam iusto unde obcaecati, iure praesentium,
                accusantium aperiam reiciendis eum eligendi quidem atque sunt
                vitae minima ab veniam.
              </Text>
            </Message>
          );
        })}
      </Messages>
      <ChatBox onSubmit={handleSubmit}>
        <Profile><Image src="/bg.jpg" /></Profile>
        <Textarea onChange={handleChangeText} value={values.text}></Textarea>
        <Actions>
          <SendButton>SEND</SendButton>
        </Actions>
      </ChatBox>
      {sentences ? (<ChatPalet>
        <Sentences>
          {sentences.map(() => {
            return (<Sentence>Lorem, ipsum.</Sentence>)
          })}
          <AddButton>ADD</AddButton>
        </Sentences>
      </ChatPalet>) : null}
    </Container>
  );
};

const useHooks = () => {
  const [values, setValues] = useState({ name: "", text: "" })

  const handleChangeText = useCallback((e) => {
    setValues({
      ...values,
      text: e.currentTarget.value
    })
  }, [values, setValues])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    setValues((values) => {
      return {
        ...values,
        text: ""
      }
    })
  }, [values, setValues])

  return {
    values,
    setValues,
    handleChangeText,
    handleSubmit
  }
}

const Container = styled.div``;
const Messages = styled.div``;
const Message = styled.div``;
const Title = styled.div``;
const Text = styled.div``;
const ChatBox = styled(Form)``;
const Profile = styled.div`
  width: 36px;
  height: 36px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const Textarea = styled.textarea``;
const Actions = styled.div``;
const SendButton = styled.button``;
const ChatPalet = styled.div``;
const Sentences = styled.div``;
const Sentence = styled.div``;
const AddButton = styled.button``;

export default memo(Chat);
