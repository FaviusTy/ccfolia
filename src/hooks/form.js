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
  const handleSubmit = useCallback(e => {
    e.preventDefault();
    onSubmit(values, { setValues, setFieldValue });
  });
  return {
    values,
    setValues,
    setFieldValue,
    handleChange,
    handleSubmit
  };
};
