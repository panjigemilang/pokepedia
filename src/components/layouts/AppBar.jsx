import React from "react"
import styled from "@emotion/styled"

const App = styled.div`
  padding: 8px 16px;
  width: 100%;
`

const Heading = styled.h3`
  margin: 0;
  text-align: center;
`

const SubHeading = styled.p`
  margin: 0;
`

export default function AppBar({ title, total }) {
  return (
    <App>
      <Heading>{title}</Heading>
      <SubHeading>{total}</SubHeading>
    </App>
  )
}
