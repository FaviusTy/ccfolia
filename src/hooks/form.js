import { useState, useCallback } from "react";
import _ from "lodash";

export const useForm = (initialValues, handleSubmit) => {
  const [values, setValues] = useState(initialValues);
  const setFieldValue = useCallback(
    (name, value) => {
      setValues(state => {
        const nextState = { ...state };
        return _.set(nextState, name, value);
      });
    },
    [setValues]
  );
  const onChange = useCallback(
    ({ target: { value, checked, name, type, tagName } }) => {
      switch (type) {
        case "number": {
          return setFieldValue(name, Number(value));
        }
        case "text": {
          return setFieldValue(name, String(value));
        }
        case "checkbox": {
          return setFieldValue(name, Boolean(checked));
        }
        default: {
          if (tagName === "textarea") {
            return setFieldValue(name, String(value));
          } else {
            return setFieldValue(name, value);
          }
        }
      }
    },
    [setValues]
  );
  const submit = useCallback(() => {
    handleSubmit(values, { setValues, setFieldValue });
  });
  const onSubmit = useCallback(e => {
    e.preventDefault();
    submit();
  });
  return {
    values,
    setValues,
    setFieldValue,
    submit,
    formProps: {
      onChange,
      onSubmit
    }
  };
};
