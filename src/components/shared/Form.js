import React from "react";
import styled from "styled-components";

const _CheckBox = ({ name, value, defaultChecked, ...props }) => {
  return (
    <label {...props}>
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        value={value}
      />
      <span />
    </label>
  );
};

export const Form = styled.form``;
export const FieldTitle = styled.div`
  margin: 12px 0 4px;
  color: #444;
  font-size: 12px;
  font-weight: 800;
`;
export const FieldGroup = styled.div`
  display: flex;
`;
export const FieldItem = styled.div`
  flex: 1;
  display: flex;
  max-width: ${({ width }) => (width ? `${width}px` : `auto`)};
  flex-direction: column;
  & + & {
    border-left: 1px solid #fff;
  }
`;
export const FieldLabel = styled.label`
  padding: 4px 0;
  line-height: 1;
  font-size: 12px;
  color: #888;
  /* background: #888; */
`;
export const FieldLabelLeft = styled(FieldLabel)`
  padding: 12px;
  font-size: 10px;
`;
export const TextField = styled.input`
  box-sizing: border-box;
  padding: 8px;
  border: none;
  width: 100%;
  flex: 1;
  display: block;
  background: #eee;
  color: #222;
  font-size: 14px;
`;
export const CheckBox = styled(_CheckBox)`
  display: block;
  overflow: hidden;
  width: 100%;
  height: 32px;
  background: #eee;
  span {
    box-sizing: border-box;
    padding: 11px 0;
    display: inline-block;
    width: 50%;
    height: 32px;
    background: #ccc;
    color: #222;
    line-height: 1;
    text-align: center;
    font-size: 10px;
    ::before {
      content: "off";
    }
  }
  input {
    display: none;
  }
  input:checked + span {
    margin-left: 50%;
    background: #484;
    ::before {
      content: "on";
      color: #fff;
    }
  }
`;
export const TextAreaField = styled.textarea`
  box-sizing: border-box;
  padding: 8px;
  border: none;
  display: block;
  width: 100%;
  background: #eee;
  color: #222;
  font-size: 14px;
`;
export const Button = styled.button`
  border: none;
  display: block;
`;
export const AddButton = styled(Button)`
  padding: 8px;
  width: 100%;
  background: #fff;
  color: #888;
`;
export const RemoveButton = styled(Button)`
  padding: 8px;
  border: 1px solid #eee;
  height: 100%;
  background: #fff;
  color: #888;
`;
export const SubmitButton = styled(Button)`
  margin-top: 12px;
  padding: 12px;
  width: 100%;
  background: #444;
  color: #fff;
`;
