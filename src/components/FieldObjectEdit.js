import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";

import { useAction } from "../hooks/redux-action";
import { useForm } from "../hooks/form";

const FieldObjectEdit = () => {};

const Status = styled.div``;
const Param = styled.div`
  margin-bottom: 1px;
  display: flex;
`;
const ParamData = styled.div`
  padding: 8px;
  flex: 1;
  position: relative;
  background: #f5f5f5;
`;
const ParamText = styled.div`
  position: relative;
  z-index: 1;
  color: #444;
  font-size: 12px;
`;
const Bar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ width = 0 }) => `${width * 100}%`};
  background-color: ${({ color = "#ccc" }) => color};
`;
const Button = styled.button`
  border: none;
  width: 36px;
`;
const Minus = styled(Button)`
  background: #888;
  color: #fff;
`;
const Plus = styled(Button)`
  background: #444;
  color: #fff;
`;
