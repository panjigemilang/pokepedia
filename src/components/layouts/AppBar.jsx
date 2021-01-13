import React from "react"
import styled from "@emotion/styled"

const App = styled.div`
  padding: 8px 16px;
  width: 100%;
`

const Heading = styled.h3`
  font-weight: 500;
  margin: 0;
  text-align: center;
`

const SubHeading = styled.p`
  border-bottom: 2px black solid;
  padding-bottom: 4px;
  margin: 0 auto;
  text-align: center;
  width: 1rem;
`

export default function AppBar({ title, total = 0 }) {
  return (
    <App>
      <Heading data-testid="qa-title">{title}</Heading>
      <SubHeading data-testid="qa-total-pokemons">{total}</SubHeading>
    </App>
  )
}
