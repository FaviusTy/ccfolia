import { useCallback } from "react";
import { parse } from "../modules/command-parser";

const commands = {
  bg: {
    url: String
  },
  media: {
    name: String,
    url: String,
    muted: Boolean,
    loop: Boolean,
    volume: Number
  },
  obj: {
    id: String,
    url: String,
    x: Number,
    y: Number,
    w: Number,
    h: Number
  },
  field: {
    url: String,
    row: Number,
    col: Number,
    baseSize: Number,
    grid: Boolean,
    rotate: Boolean
  },
  sheet: {
    key: String,
    value: Number
  },
  clear_table: {},
  clear_msg: {},
  clear_obj: {},
  clear_assets: {}
};

export const useCommand = (dispatch, rid, uid) => {
  return useCallback(
    text => {
      if (!text) return false;
      const cmd = text.split(/\s/)[0];
      if (commands[cmd]) {
        const detail = parse(text, commands[cmd]);
        switch (cmd) {
          case "clear_table":
            return dispatch("room:table:clear", rid);
          case "clear_msg":
            return dispatch("room:messages:clear", rid);
          case "clear_assets":
            return dispatch("user:assets:clear", uid);
          case "bg":
            return dispatch("room:table:set", rid, {
              background: detail.data
            });
          case "field":
            return dispatch("room:table:set", rid, {
              field: detail.data
            });
          case "media":
            return dispatch("room:table:set", rid, {
              media: detail.data
            });
          case "obj":
            return dispatch("room:table:obj:set", rid, detail.data);
          default:
            return false;
        }
      }
      return false;
    },
    [dispatch, rid, uid]
  );
};
