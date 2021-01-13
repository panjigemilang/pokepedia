import React, { useContext, useEffect, useState } from "react"
import { gql, useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import Loading from "../components/Loading"
import { Row } from "../components/GeneralStyled"
import Card from "../components/Card"
import AppBar from "../components/layouts/AppBar"
import PokemonSkeleton from "../components/PokemonSkeleton"
import { PokemonContext } from "../contexts/PokemonContext"

const GET_POKEMONS = gql`
  query($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      nextOffset
      results {
        id
        name
        image
      }
    }
  }
`

const App = styled.div`
  padding: 8px;
`

const SkeletonWrapper = styled.div`
  align-items: stretch;
  background: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export default function PokeDex() {
  const limit = 9
  const offset = 0
  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: { limit, offset },
  })
  const { pokemons: pokemonsContext } = useContext(PokemonContext)
  const [refetching, setRefetching] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    // run once
    if (data && pokemons.length === 0) {
      setPokemons(data.pokemons.results)
      setHasNextPage(data.pokemons.nextOffset)
    }
  }, [data])

  const next = () => {
    // loading for refetching
    setRefetching(true)

    const offset = hasNextPage

    fetchMore({
      variables: {
        limit,
        offset,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        let results = fetchMoreResult.pokemons.results

        results = [...pokemons, ...results]

        setRefetching(false)
        setPokemons(results)
        setHasNextPage(fetchMoreResult.pokemons.nextOffset)

        return results
      },
    })
  }

  const loadMore = (e) => {
    const bottom =
      e.target.scrollHeight - Math.floor(e.target.scrollTop) ===
      e.target.clientHeight

    // if scrolled to the bottom of page
    if (bottom) {
      next()
    }
  }

  if (loading) return <Loading />
  if (error)
    return <h2>Something happened and when requesting Pokemons Lists</h2>

  return (
    <App>
      <AppBar title="Pokedex" total={pokemons.length} />
      <Row
        height="75vh"
        overflowY="scroll"
        onLoad={loadMore}
        onScroll={loadMore}
      >
        {pokemons.map((item, i) => (
          <Card
            key={`card-${i}`}
            id={pokemonsContext.length}
            src={item.image}
            alt={item.name}
            name={item.name}
            width="33.3333%"
          />
        ))}
        {!refetching && (
          <SkeletonWrapper>
            <PokemonSkeleton padding />
            <PokemonSkeleton padding />
            <PokemonSkeleton padding />
          </SkeletonWrapper>
        )}
      </Row>
    </App>
  )
}
