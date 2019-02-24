import styled from "styled-components";
import theme from "../styles/theme";

export const Button = styled.button`
  box-sizing: border-box;
  padding: 12px;
  border: none;
  border-radius: 4px;
  width: 100%;
  background: ${theme.color.dark};
  color: ${theme.color.light};
  font-size: 12px;
`;
