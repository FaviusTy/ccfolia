import styled from "styled-components";

export const FormStyle = styled.div`
  form {
    display: block;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  > div + div {
    border-left: 1px solid #eee;
  }
`;

export const FormItem = styled.div`
  border-bottom: 1px solid #eee;
  display: block;
  /* flex: 1; */
  width: 100%;
  background: #fff;
  input[type="text"],
  input[type="number"] {
    box-sizing: border-box;
    padding: 4px 8px;
    border: none;
    display: block;
    background: #fff;
    width: 100%;
    font-size: 14px;
  }
  textarea {
    padding: 4px 8px;
  }
  label {
    padding: 4px 4px 0;
    display: block;
    line-height: 1;
    font-size: 10px;
    color: #888;
  }
  button {
    box-sizing: border-box;
    border: none;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    padding: 4px 8px;
    background: #fff;
    color: #222;
    text-align: left;
  }
`;

export const FormAction = styled.div`
  button {
    box-sizing: border-box;
    padding: 12px;
    border: none;
    /* border-radius: 30px; */
    display: block;
    width: 100%;
    background: #444;
    color: #ccc;
    font-size: 14px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
    letter-spacing: 0.1em;
  }
`;
