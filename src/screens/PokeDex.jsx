import React from "react"
import { gql, useQuery } from "@apollo/client"
import styled from "@emotion/styled"
import Loading from "../components/Loading"
import { Row } from "../components/GeneralStyled"
import Card from "../components/Card"
import AppBar from "../components/layouts/AppBar"

const GET_POKEMONS = gql`
  query GetPokemons {
    pokemons(limit: 9) {
      count
      next
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

export default function PokeDex() {
  const { loading, error, data } = useQuery(GET_POKEMONS)

  if (loading) return <Loading />
  else if (error) return <h2>Something happened and we don't know</h2>
  else
    return (
      <App>
        <AppBar title="Pokedex" total={data.pokemons.results.length} />
        <Row>
          {data.pokemons.results.map((item, i) => (
            <Card
              key={`card-${i}`}
              src={item.image}
              alt={item.name}
              name={item.name}
              width="33.3333%"
            />
          ))}
        </Row>
      </App>
    )
}
