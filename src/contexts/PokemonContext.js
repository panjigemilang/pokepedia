import { createContext, useState } from "react"

export const PokemonContext = createContext()

const PokemonContextProvider = (props) => {
  const [pokemon, setPokemon] = useState({})
  const [isCatching, setIsCatching] = useState(false)
  const [selected, setSelected] = useState(false)

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        setPokemon,
        isCatching,
        setIsCatching,
        selected,
        setSelected,
      }}
    >
      {props.children}
    </PokemonContext.Provider>
  )
}

export default PokemonContextProvider
