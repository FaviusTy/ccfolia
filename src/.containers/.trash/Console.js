import React, { useMemo, useCallback, useRef, useLayoutEffect } from "react";
import { useRoomStore } from "../stores/room";

function vars(input, data) {
  if (!input) return "";
  let output = input.trim();
  Object.keys(data).forEach(key => {
    output = output.split(key).join(data[key]);
  });
  return output;
}

const Console = () => {
  const [state, dispatch] = useRoomStore();
  const { log } = useMemo(
    () => ({
      log: state.get("log")
    }),
    [state]
  );
  const logRef = useRef(null);
  const formRef = useRef(null);
  const exec = useCallback(
    text => {
      window.localStorage.setItem("cmd", text);
      const cmds = vars(text, {
        $id: Date.now().toString(34)
      }).split(/\n+/);
      cmds.forEach(cmd => {
        const [type, payload] = cmd.split(/\s/);
        try {
          dispatch({
            type: type,
            payload: payload ? JSON.parse(payload) : undefined
          });
        } catch (err) {
          console.error(err);
        }
      });
    },
    [dispatch]
  );
  const onKeyDown = useCallback(
    e => {
      if (e.key == "Enter" && e.metaKey && formRef.current) {
        const { cmd } = formRef.current;
        exec(cmd.value);
      }
      console.log(`onKeyPress KeyCode:${e.charCode}`);
    },
    [exec]
  );
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (formRef.current) {
        const { cmd } = formRef.current;
        exec(cmd.value);
      }
    },
    [exec]
  );
  useLayoutEffect(() => {
    if (logRef.current) logRef.current.scrollTop = 999999;
  });

  return (
    <div className="console">
      <pre ref={logRef} className="log">
        {log}
      </pre>
      <form onSubmit={onSubmit} ref={formRef}>
        <textarea
          name="cmd"
          defaultValue={window.localStorage.getItem("cmd")}
          onKeyDown={onKeyDown}
        />
        <button style={{ width: "100%", display: "block" }}>
          cmd + enter >> exec
        </button>
      </form>
    </div>
  );
};

export default Console;
