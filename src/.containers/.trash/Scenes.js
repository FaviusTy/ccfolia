import React, { useState, useMemo, useCallback, memo } from "react";
import serialize from "form-serialize";
import { useScenesAction } from "../../stores/scenes";
import { useTableAction } from "../../stores/table";

const Scenes = ({ id, scenes }) => {
  const { add, remove } = useScenesAction("TEST_USER");
  const { update } = useTableAction(id);
  const onSubmit = useCallback(e => {
    e.preventDefault();
    const data = serialize(e.currentTarget, { hash: true });
    console.log(data);
    add(data);
  });
  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>bg</h2>
        <input name="background[url]" type="text" defaultValue="" />
        <h2>media</h2>
        <input name="media[url]" type="text" defaultValue="" />
        <input name="media[loop]" type="checkbox" defaultValue={true} />
        <input name="media[volume]" type="number" defaultValue={0.1} />
        <button>save</button>
      </form>
      {scenes.map(({ id, background, media }) => {
        return (
          <div key={id}>
            <figure
              onClick={() => {
                update({ background, media });
              }}
            >
              {background ? (
                <img src={background.url} width="50" height="50" />
              ) : null}
            </figure>
            <button onClick={() => remove(id)}>del</button>
          </div>
        );
      })}
    </div>
  );
};

export default memo(Scenes);
