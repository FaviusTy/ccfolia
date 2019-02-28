import styled from "styled-components";

export const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 64px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
  height: 100%;
  @media (max-width: 600px) {
    grid-template-rows: 56px 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
`;

export const LayoutItem = styled.div`
  grid-column: ${({ col }) => col};
  grid-row: ${({ row }) => row};
  /* overflow: scroll; */
  position: relative;
`;
