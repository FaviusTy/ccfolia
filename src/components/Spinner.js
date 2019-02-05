import styled from "styled-components";

export default styled.div`
  margin: auto;
  display: inline-block;
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  :after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: ${({ size }) => ~~((6 * size) / 64)}px;
    box-sizing: border-box;
    border: ${({ size }) => ~~((26 * size) / 64)}px solid #fff;
    border-color: #888 transparent #888 transparent;
    animation: lds-hourglass 1.2s infinite;
  }
  @keyframes lds-hourglass {
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
    }
  }
`;
