import { useContext, useMemo } from "react";
import { ReactReduxContext } from "react-redux";

export const useDispatch = () => {
  const { store } = useContext(ReactReduxContext);
  if (!store) {
    throw new Error("`store` is not found");
  }
  return store.dispatch;
};

export const useAction = actionCreator => {
  const d = useDispatch();
  return useMemo(() => {
    const actions = {};
    const actionNames = Object.keys(actionCreator);
    for (let i = 0; i < actionNames.length; i++) {
      const actionName = actionNames[i];
      actions[actionName] = (...args) => d(actionCreator[actionName](...args));
    }
    return actions;
  }, [actionCreator, d]);
};
