import { useReducer, useMemo } from "react";

export const createStore = (reducer, actions) => {
  const useStore = () => {
    const [state, dispatch] = useReducer(reducer);
    const _actions = useMemo(() => {
      return actions(dispatch);
    }, []);
    return [state, _actions];
  };

  const useAction = () => {
    return useMemo(() => {
      return actions(dispatch);
    }, []);
  };

  return { useStore, useAction };
};
