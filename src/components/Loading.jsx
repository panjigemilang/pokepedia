import React from "react"
import styled from "@emotion/styled"

const Div = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`

const SpinnerIcon = styled.i`
  font-size: 3rem;
  position: fixed;
  top: 47%;
  left: 45%;
  transform: translate(-50%, -50%);
`

export default function Loading() {
  return (
    <Div>
      <SpinnerIcon className="fas fa-circle-notch fa-spin"></SpinnerIcon>
    </Div>
  )
}
