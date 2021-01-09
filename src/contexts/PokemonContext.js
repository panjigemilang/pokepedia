import { createContext, useEffect, useState } from "react"

export const PokemonContext = createContext()

const PokemonContextProvider = (props) => {
  const [pokemon, setPokemon] = useState({})
  const [pokemons, setPokemons] = useState([])
  const [isEditNickname, setIsEditNickname] = useState(false)
  const [inputNickname, setInputNickname] = useState(false)
  const [catched, setCatched] = useState(false)
  const [isCatching, setIsCatching] = useState(false)
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    if (window.localStorage.getItem("pokemons"))
      setPokemons(JSON.parse(window.localStorage.getItem("pokemons")))
  }, [])

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        setPokemon,
        pokemons,
        setPokemons,
        isEditNickname,
        setIsEditNickname,
        inputNickname,
        setInputNickname,
        catched,
        setCatched,
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
