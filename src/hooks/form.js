import { useState, useCallback } from "react";

export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const setFieldValue = useCallback(
    (name, value) => {
      setValues(state => {
        return {
          ...state,
          [name]: value
        };
      });
    },
    [setValues]
  );
  const handleChange = useCallback(
    ({ currentTarget: { value, name } }) => {
      setFieldValue(name, value);
    },
    [setValues]
  );
  const submit = useCallback(() => {
    onSubmit(values, { setValues, setFieldValue });
  });
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    submit();
  });
  return {
    values,
    setValues,
    setFieldValue,
    submit,
    handleChange,
    handleSubmit
  };
};
