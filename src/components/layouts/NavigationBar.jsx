import { Link, useLocation } from "react-router-dom"
import styled from "@emotion/styled"
import Pokedex from "../../assets/icons/icons8-pokedex-80.png"
import Pokeball from "../../assets/icons/icons8-pokeball-80.png"
import { useEffect } from "react"

const App = styled.div`
  box-shadow: 0 20px 33px 0px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  max-height: 4rem;
  padding: 8px;
  position: absolute;
  bottom: 0;
  width: 100%;
`

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${({ active }) => (active ? 1 : 0.4)};
  text-align: center;
  width: ${({ width }) => width};

  img {
    height: 30px;
    margin: 0 auto;
    width: 30px;
  }

  p {
    font-size: 14px;
    margin: 0;
    opacity: 0.8;
  }
`

export default function NavigationBar() {
  const location = useLocation()
  const width = "50%"

  useEffect(() => {
    console.log("Pathanme", location.pathname)
  }, [location.pathname])

  return (
    <App>
      <Tab active={!location.pathname.includes("myPokemons")} width={width}>
        <Link to="/">
          <img src={Pokedex} alt="Pokedex" />
          <p>PokeDex</p>
        </Link>
      </Tab>
      <Tab active={location.pathname.includes("myPokemons")} width={width}>
        <Link to="/myPokemons">
          <img src={Pokeball} alt="Pokeball" />
          <p>My Pokemons</p>
        </Link>
      </Tab>
    </App>
  )
}
