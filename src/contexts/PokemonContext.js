import { createContext, useState } from "react"

export const PokemonContext = createContext()

const PokemonContextProvider = (props) => {
  const [pokemons, setPokemons] = useState([])
  const [pokemon, setPokemon] = useState({})
  const [isFetchingPokemons, setIsFetchingPokemons] = useState(false)
  const [isFetchingPokemon, setIsFetchingPokemon] = useState(false)

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        setPokemons,
        pokemon,
        setPokemon,
        isFetchingPokemons,
        setIsFetchingPokemons,
        isFetchingPokemon,
        setIsFetchingPokemon,
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  )
}

export default PokemonContextProvider
