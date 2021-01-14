import { useContext, useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import { PokemonContext } from "../contexts/PokemonContext"
import { ToastContext } from "../contexts/ToastContext"
import { SearchContext } from "../contexts/SearchContext"
import Fade from "../utils/Fade"

const App = styled.div`
  background-color: whitesmoke;
  box-shadow: 0 20px 33px 5px rgba(0, 0, 0, 0.5);
  display: flex;
  padding: 8px;
  position: absolute;
  left: 0;
  bottom: ${({ show }) => (show ? "0" : "-5rem")};
  transition: 0.3s ease-in-out;
  width: 100%;
  z-index: 99;
`

const Input = styled.input`
  border: none;
  border-radius: 5px;
  margin: 0 4px;
  padding: 8px;
  width: 80%;
`

const Button = styled.button`
  background-color: ${({ btnColor }) => btnColor};
  border-radius: 3px;
  color: white;
  font-weight: 500;
  margin: 0 4px;
  width: 10%;
`

export default function InputPokemon() {
  const {
    catched,
    isEditNickname,
    setIsEditNickname,
    inputNickname,
    setInputNickname,
    pokemon,
    pokemons,
    setPokemon,
    setPokemons,
  } = useContext(PokemonContext)
  const { setMessage, setToast } = useContext(ToastContext)
  const { setSearch } = useContext(SearchContext)
  const [nickname, setNickname] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputNickname && inputRef.current)
      inputRef.current.focus({
        preventScroll: true,
      })
  }, [inputNickname])

  const onEnter = (e) => {
    if (e.key === "Enter") onSubmit()
  }

  const onSubmit = () => {
    const defaultNickname = "Jamal"
    const data = {
      ...pokemon,
      nickname: nickname ? nickname : defaultNickname,
    }
    const temp = pokemons

    // Edit nickname or add new pokemon
    if (isEditNickname) {
      // get index of
      const index = temp.reduce((cur, val, id) => {
        if (val.id === pokemon.id && cur === -1) {
          return id
        }
        return cur
      }, -1)

      temp[index] = data

      setMessage("Nickname edited!")
      setIsEditNickname(false)
      // emptying search
      setSearch("")
    } else {
      temp.push(data)

      setMessage("Added to My Pokemons!")
    }

    // save it to localstorage
    window.localStorage.setItem("pokemons", JSON.stringify(temp))
    // set pokemons and current pokemon
    setPokemons(temp)
    // updating current data id
    data.id = pokemons.length
    setPokemon(data)

    setToast(true)
    setInputNickname(false)

    // Clear nickname field
    setNickname("")
  }

  return (
    <Fade show={inputNickname}>
      <App show={inputNickname}>
        <Input
          ref={inputRef}
          type="text"
          onChange={(e) => setNickname(e.target.value)}
          onKeyUp={onEnter}
          value={nickname}
          placeholder="Nickname ..."
        />
        <Button
          btnColor="#3e7afc"
          onClick={onSubmit}
          data-testid="qa-submit-nickname"
        >
          <i className="fas fa-check"></i>
        </Button>
        <Button btnColor="#cf243b" onClick={() => setInputNickname(false)}>
          <i className="fas fa-times"></i>
        </Button>
      </App>
    </Fade>
  )
}
