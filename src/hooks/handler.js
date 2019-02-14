import { useCallback, useMemo } from "react";

export const useHandler = (_handlers, context) => {
  return useMemo(() => {
    const handlers = {};
    const names = Object.keys(_handlers);
    for (let i = 0; i < handlerNames.length; i++) {
      const name = names[i];
      handlers[name] = (...args) => _handlers[actionName](context, ...args);
    }
    return actions;
  }, [_handlers]);
};
