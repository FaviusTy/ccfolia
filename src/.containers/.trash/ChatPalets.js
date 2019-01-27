import React, { useState, useMemo, useCallback, memo } from "react";
import { useMessagesAction } from "../stores/messages";
import { useChatPaletsAction } from "../stores/chatpalets";

const ChatPaletItem = ({ id, name, texts, submit, remove, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="id" type="hidden" defaultValue={id} />
        <input name="name" type="text" defaultValue={name} />
        <textarea name="texts" defaultValue={texts} />
        <button>save</button>
      </form>
      <button onClick={() => remove(id)}>DEL</button>
      {texts.split("\n").map((text, i) => {
        return (
          <p onClick={() => submit({ name, text })} key={i}>
            {text}
          </p>
        );
      })}
    </div>
  );
};

const ChatPalets = ({ id, chatpalets }) => {
  const [current, setCurrent] = useState(0);
  const { add } = useMessagesAction(id);
  const { add: addChatPalet, set, remove } = useChatPaletsAction("TEST_USER");
  const item = useMemo(() => {
    return chatpalets[current] || { id: "", name: "", texts: "" };
  }, [chatpalets, current]);
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const {
        id: { value: id },
        name: { value: name },
        texts: { value: texts }
      } = e.currentTarget;
      console.log(id, name, texts);

      const item = { name, texts };
      set(id, item);
    },
    [set]
  );

  return (
    <>
      <button
        onClick={() =>
          addChatPalet({ name: Date.now().toString(34), texts: "hoge\nfuga" })
        }
      >
        add
      </button>
      {chatpalets.map(({ name }, i) => {
        return (
          <a key={i} onClick={() => setCurrent(i)}>
            {name}
          </a>
        );
      })}
      <ChatPaletItem
        key={current}
        id={item.id}
        name={item.name}
        texts={item.texts}
        submit={add}
        remove={remove}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default memo(ChatPalets);
