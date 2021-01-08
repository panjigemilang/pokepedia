import { useContext, useEffect } from "react"
import { useQuery, gql } from "@apollo/client"
import styled from "@emotion/styled"
import { PokemonContext } from "../contexts/PokemonContext"
import isEmpty from "../utils/isEmpty"
import Loading from "./Loading"

const GET_POKEMON = gql`
  query($name: String!) {
    pokemon(name: $name) {
      name
      types {
        type {
          name
        }
      }
      stats {
        base_stat
        stat {
          name
        }
      }
      abilities {
        ability {
          name
        }
      }
      sprites {
        front_default
      }
    }
  }
`

const App = styled.div`
  height: 100%;
  position: absolute;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  width: 100%;
  z-index: 5;
`

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  height: 100%;
  opacity: ${({ show }) => (show ? 1 : 0)};
  position: absolute;
  width: 100%;
  z-index: 1;
`

const DetailBox = styled.div`
  background-color: white;
  border-radius: 20px 20px 0 0;
  height: 90%;
  padding: 16px;
  position: absolute;
  bottom: ${({ show }) => (show ? 0 : "-100vh")};
  transition: 0.3s ease-in-out;
  width: 100%;
  z-index: 2;
`

const CatchButton = styled.button`
  height: 80px;
  right: 10%;
  bottom: 1.75rem;
  width: 80px;
`

const CloseButton = styled.button`
  height: 50px;
  left: 50%;
  bottom: 1.75rem;
  transform: translateX(-50%);
  width: 50px;
`

const CloseIcon = styled.i`
  border: 2px #10e8a7 solid;
  border-radius: 50%;
  color: #10e8a7;
  font-size: 16px;
  height: 80%;
  width: 80%;

  &:before {
    line-height: 2.1rem;
  }
`

const PokemonDetail = styled.div`
  display: flex;
  flex-direction: column;
`

const Image = styled.img`
  height: 100%;
  margin: 0 auto;
`

const DescriptionBox = styled.div`
  padding: 0 5rem;
`

const Name = styled.h2`
  font-weight: 700;
  margin: 0;
  text-align: center;
`

const HpBar = styled.div`
  background-color: #02daa4;
  border-radius: 20px;
  height: 4px;
  margin: 4px 0;
  width: 100%;
`

const Hp = styled.div`
  text-align: center;

  p {
    font-size: 12px;
    font-weight: bolder;
    margin: 0;
  }
`

export default function CardDetail() {
  const { selected, setSelected, pokemon, setIsCatching } = useContext(
    PokemonContext
  )
  const { loading, error, data, refetch } = useQuery(GET_POKEMON, {
    variables: {
      name: pokemon.name,
    },
  })

  const catchPokemon = () => {
    setIsCatching(true)
  }

  const capitalize = (string) => string[0].toUpperCase() + string.substring(1)

  useEffect(() => {
    if (!isEmpty(pokemon)) refetch()
  }, [pokemon])

  if (isEmpty(pokemon)) return <div />
  else
    return (
      <App show={selected}>
        <Overlay show={selected} />
        <DetailBox show={selected}>
          {loading === true && <Loading />}
          {loading === false && error && <h1>Something's wrong</h1>}
          {loading === false && (
            <PokemonDetail>
              <Image
                src={data.pokemon.sprites.front_default}
                alt={data.pokemon.name}
              />
              <DescriptionBox>
                <Name>{capitalize(data.pokemon.name)}</Name>
                <HpBar />
                <Hp>
                  <p>
                    {data.pokemon.stats[0].base_stat}/
                    {data.pokemon.stats[0].base_stat} HP
                  </p>
                </Hp>
              </DescriptionBox>
            </PokemonDetail>
          )}
          <CatchButton className="circle-button" onClick={catchPokemon}>
            <Image
              src="https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536849_960_720.png"
              alt="Pokeball"
            />
          </CatchButton>
          <CloseButton
            className="circle-button"
            onClick={() => setSelected(false)}
          >
            <CloseIcon className="fas fa-times"></CloseIcon>
          </CloseButton>
        </DetailBox>
      </App>
    )
}
