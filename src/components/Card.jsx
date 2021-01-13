import React, { useContext } from "react"
import styled from "@emotion/styled"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { PokemonContext } from "../contexts/PokemonContext"

const App = styled.div`
  height: 8.5rem;
  padding: 8px;
  position: relative;
  width: ${({ width }) => (width ? width : "50%")};

  &:hover {
    cursor: pointer;

    span {
      background: radial-gradient(
        circle,
        rgba(32, 212, 116, 1) 3%,
        rgba(0, 255, 239, 0.0032606792717086996) 40%
      );
    }

    p:after {
      transform: scaleX(1);
    }
  }

  .image {
    position: relative;
    z-index: 1;
  }
`

const BlurLight = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  background: radial-gradient(
    circle,
    ${({ theme }) => theme.colors.secondary} 0%,
    rgba(0, 255, 239, 0.0032606792717086996) 0%
  );
  border-radius: 50%;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 0.3s ease-in-out;
  width: 50px;
  z-index: 0;
`

const Name = styled.p`
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
  transform: translateY(-10px);
  width: max-content;

  &:after {
    border-bottom: solid 2px ${({ theme }) => theme.colors.secondary};
    content: "";
    display: block;
    margin-top: 2px;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }
`

const Status = styled.div`
  color: ${({ theme }) => theme.textColors.info};
  font-size: 12px;
  text-align: center;
  transform: translateY(-0.5rem);
`

export default function Card({
  alt,
  id,
  src,
  name,
  nickname = "",
  effect = "black-and-white",
  width = "",
}) {
  const { setSelected, setPokemon, pokemons } = useContext(PokemonContext)

  const selectedPokemon = () => {
    setSelected(true)
    setPokemon((prevState) => ({ ...prevState, id, name, src, nickname }))
  }

  const renderName = () => {
    if (!nickname) return name
    else return nickname
  }

  const renderStatus = () => {
    const catched = pokemons.filter((item) => item.name === name)

    if (catched.length > 0) return <Status>Catched</Status>
  }

  return (
    <App onClick={selectedPokemon} width={width}>
      <LazyLoadImage
        className="image"
        effect={effect}
        src={src}
        alt={alt}
        height="96px"
        width="auto"
      />
      <BlurLight />
      <Name>{renderName()}</Name>
      {renderStatus()}
    </App>
  )
}
