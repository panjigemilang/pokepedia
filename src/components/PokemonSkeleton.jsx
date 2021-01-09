import React from "react"
import styled from "@emotion/styled"
import Skeleton from "react-loading-skeleton"

const Container = styled.div`
  display: block;
  max-height: 300px;
  overflow: hidden;
  padding: ${({ padding }) => (padding ? "8px" : "0px")};
  width: 31vw;
`

const PokemonSkeleton = (props) => {
  const { padding } = props

  return (
    <Container padding={padding}>
      <Skeleton width="100%" height="25vw" />
      <Skeleton width="100%" height={30} />
    </Container>
  )
}

export default PokemonSkeleton
