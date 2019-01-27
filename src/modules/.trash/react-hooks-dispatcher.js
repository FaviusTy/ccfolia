import { useState, useCallback } from "react";

export const useDispatcher = ({ mutations, actions, refs, initialState }) => {
  const state = initialState;
  const commit = useCallback(
    (name, payload) => {
      mutations[name](prevState, payload);
    },
    [state]
  );
  const dispatch = useCallback(
    (name, payload) => {
      actions[name]({ commit, refs }, payload);
    },
    [commit]
  );
  return [commit, dispatch];
};
