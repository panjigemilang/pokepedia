import styled from "@emotion/styled"

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  opacity: ${({ show }) => (show ? 1 : 0)};
  position: absolute;
  transition: 0.3s all;
  width: 100%;
  z-index: ${({ zIndex }) => zIndex};
`
