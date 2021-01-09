import { useContext, useEffect, useRef, useState } from "react"
import isEmpty from "../utils/isEmpty"
import styled from "@emotion/styled"
import { PokemonContext } from "../contexts/PokemonContext"
import { SearchContext } from "../contexts/SearchContext"
import Loading from "../components/Loading"
import { Heading, Row } from "../components/GeneralStyled"
import Card from "../components/Card"
import AppBar from "../components/layouts/AppBar"
import Search from "../components/Search"

const App = styled.div`
  padding: 8px;
`

export default function MyPokemons() {
  const { pokemons: pokemonsContext } = useContext(PokemonContext)
  const { search } = useContext(SearchContext)
  const [pokemons, setPokemons] = useState(null)
  const [loading, setLoading] = useState(false)
  const firstRender = useRef(true)

  useEffect(() => {
    fetchPokemon()
  }, [pokemonsContext])

  useEffect(() => {
    if (firstRender.current) {
      return
    }

    setLoading(true)

    if (search) {
      setPokemons(
        pokemonsContext.filter((item) =>
          item.nickname.toLowerCase().includes(search.toLowerCase())
        )
      )
    } else {
      fetchPokemon()
    }
  }, [search])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    setLoading(false)
  }, [pokemons])

  const fetchPokemon = () => {
    setLoading(true)

    setPokemons(pokemonsContext)
  }

  return (
    <App>
      <AppBar
        title="My Pokemons"
        total={!isEmpty(pokemons) && pokemons.length}
      />
      <Search />
      <Row height="67vh" overflowY="scroll">
        {loading && <Loading />}
        {!loading &&
          !isEmpty(pokemons) &&
          pokemons.map((item, i) => (
            <Card
              key={`card-${i}`}
              src={item.src}
              id={item.id}
              alt={item.nickname}
              name={item.name}
              nickname={item.nickname}
              width="33.3333%"
            />
          ))}
        {isEmpty(pokemons) && (
          <Heading>No Pokemons found. try to catch them all!</Heading>
        )}
      </Row>
    </App>
  )
}
