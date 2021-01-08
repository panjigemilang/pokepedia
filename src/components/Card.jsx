import React, { useContext } from "react"
import styled from "@emotion/styled"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { PokemonContext } from "../contexts/PokemonContext"

const App = styled.div`
  min-height: 8rem;
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
  background: rgb(32, 212, 116);
  background: radial-gradient(
    circle,
    rgba(32, 212, 116, 1) 0%,
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
    border-bottom: solid 2px #10e879;
    content: "";
    display: block;
    margin-top: 4px;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }
`

export default function Card({
  alt,
  src,
  altSrc = "https://toppng.com/uploads/preview/pokeball-11530983183h69cddzgqu.png",
  name,
  width = "",
}) {
  const { setSelected, setPokemon } = useContext(PokemonContext)
  const selectedPokemon = (name) => {
    setSelected(true)
    setPokemon((prevState) => ({ ...prevState, name }))
  }

  return (
    <App onClick={() => selectedPokemon(name)} width={width}>
      <LazyLoadImage
        className="image"
        src={src}
        alt={alt}
        placeholderSrc={altSrc}
        width="100%"
      />
      <BlurLight />
      <Name>{name}</Name>
    </App>
  )
}
