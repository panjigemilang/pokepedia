import { useContext, useEffect } from "react"
import { Overlay } from "../components/GeneralStyled"
import styled from "@emotion/styled"
import { PokemonContext } from "../contexts/PokemonContext"

const App = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  z-index: 10;
`

const DialogBox = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 4px 16px;
  position: absolute;
  bottom: ${({ show }) => (show ? "50%" : "-50%")};
  left: 50%;
  transform: translate(-50%, 50%);
  transition: 0.3s ease-in-out;
  width: max-content;
  z-index: 10;
`

const Message = styled.div`
  align-items: center;
  display: flex;

  i {
    font-size: 16px;
    margin-right: 8px;
  }
`

export default function Modal() {
  const { isCatching, setIsCatching, pokemon, setPokemon } = useContext(
    PokemonContext
  )

  useEffect(() => {
    if (isCatching) {
      const probability = 0.5

      const catched = Math.random() < probability

      console.log("catched ? ", catched)
      setPokemon((prevState) => ({ ...prevState, catched }))

      // if catch succeeded, save it to localStorage
      if (catched) {
        const pokemons = JSON.parse(window.localStorage.getItem("pokemons"))

        pokemons.push(pokemon)

        window.localStorage.setItem("pokemons", JSON.stringify(pokemons))
      }

      setTimeout(() => {
        setIsCatching(false)
      }, 2000)
    }
  }, [isCatching])

  return (
    <App show={isCatching}>
      <Overlay show={isCatching} zIndex={9} />
      <DialogBox show={isCatching}>
        <Message>
          <i className="fas fa-circle-notch fa-spin"></i>
          <h3>Processing</h3>
        </Message>
      </DialogBox>
    </App>
  )
}
