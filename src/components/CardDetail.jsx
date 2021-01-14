import { useContext, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"
import styled from "@emotion/styled"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { PokemonContext } from "../contexts/PokemonContext"
import isEmpty from "../utils/isEmpty"
import Loading from "./Loading"
import InputPokemon from "./InputPokemon"
import ReleasePokemon from "../assets/icons/release-pokemon.png"
import { ToastContext } from "../contexts/ToastContext"
import Fade from "../utils/Fade"
import { SearchContext } from "../contexts/SearchContext"

const GET_POKEMON = gql`
  query($name: String!) {
    pokemon(name: $name) {
      name
      base_experience
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

export { GET_POKEMON }

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
  z-index: 4;
`

const ActionButton = styled.button`
  background-color: ${({ bgColor }) => bgColor};
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
  border: 2px ${({ theme }) => theme.colors.secondary} solid;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.secondary};
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
  height: 30rem;
  overflow-y: auto;
`

const Image = styled.img`
  height: 100%;
  margin: 0 auto;
`

const DescriptionBox = styled.div`
  display: ${({ display }) => display};
  padding: ${({ padding }) => padding};

  h4.nickname {
    font-weight: 400;
    margin: 0;
    position: relative;
    text-align: center;

    span {
      position: absolute;
      top: 0;
      right: -1.3rem;
      opacity: 0.7;
    }
  }

  p {
    margin: 0;
    text-align: center;
  }
`

const Name = styled.h2`
  font-weight: 700;
  margin: 0;
  text-align: center;
`

const HpBar = styled.div`
  background-color: ${({ theme }) => theme.colors.common};
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

const Tab = styled.div`
  border-left: ${({ borderLeft }) => borderLeft};
  border-right: ${({ borderRight }) => borderRight};
  text-align: center;
  width: ${({ width }) => (width ? width : "auto")};

  h4 {
    margin: 8px 0;
  }

  p.types {
    border: 3px whitesmoke solid;
    border-radius: 20px;
    color: white;
    margin: 0 auto;
    padding: 6px;
    width: 90%;
  }

  .abilities-wrapper {
    display: flex;
    flex-wrap: wrap;

    p {
      background-color: ${({ theme }) => theme.colors.common};
      border: 3px whitesmoke solid;
      border-radius: 20px;
      color: white;
      padding: 8px 16px;
    }
  }
`

export default function CardDetail() {
  const location = useLocation()
  const {
    selected,
    setSelected,
    pokemon,
    pokemons,
    setPokemons,
    isCatching,
    setIsCatching,
    setIsEditNickname,
    setCatched,
    inputNickname,
    setInputNickname,
  } = useContext(PokemonContext)
  const { setMessage, setToast } = useContext(ToastContext)
  const { setSearch } = useContext(SearchContext)
  const { loading, error, data, refetch } = useQuery(GET_POKEMON, {
    variables: {
      name: pokemon.name || "a",
    },
  })

  useEffect(() => {
    if (!isEmpty(pokemon)) refetch()
  }, [pokemon])

  useEffect(() => {
    let timeout

    // catching pokemon
    if (isCatching) {
      const probability = 0.5

      const catched = Math.random() > probability

      timeout = setTimeout(() => {
        setCatched(catched)

        if (catched) {
          setMessage("Catch succeed!")

          setInputNickname(true)
        } else {
          setMessage("Catch failed, try again!")
        }

        setIsCatching(false)
        // show toast and input nickname
        setToast(true)
      }, 2000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isCatching])

  const catchPokemon = () => {
    setIsCatching(true)
  }

  const releasePokemon = () => {
    let temp = pokemons

    // temp = temp.splice(pokemons.indexOf(pokemon.id), 1)
    temp = temp.filter((item) => item.id !== pokemon.id)

    window.localStorage.setItem("pokemons", JSON.stringify(pokemons))
    setPokemons(temp)

    setSelected(false)
    setMessage("Pokemon released!")
    setToast(true)
    setSearch("")
  }

  const editNickname = () => {
    setIsEditNickname(true)
    setInputNickname(true)
  }

  const renderNickname = () => {
    if (pokemon.nickname)
      return (
        <h4 className="nickname">
          {pokemon.nickname}
          <span onClick={editNickname}>
            <i className="fas fa-pen"></i>
          </span>
        </h4>
      )
    else return
  }

  const renderCaptured = () => {
    const captured = pokemons.filter((item) => item.name === pokemon.name)

    return (
      <div>
        <h4>Captured</h4>
        <p>{captured.length}</p>
        {captured.length > 0 && <small>Times</small>}
      </div>
    )
  }

  const capitalize = (string) => string[0].toUpperCase() + string.substring(1)

  if (isEmpty(pokemon)) return <div />
  else
    return (
      <Fade show={selected}>
        <App show={selected}>
          <Overlay show={selected} />
          <DetailBox show={selected}>
            {loading === true && <Loading />}
            {loading === false && error && <h1>Something's wrong</h1>}
            {loading === false && (
              <PokemonDetail>
                <LazyLoadImage
                  src={data.pokemon.sprites.front_default}
                  alt={data.pokemon.name}
                  effect="black-and-white"
                  height="96px"
                  width="auto"
                />
                <DescriptionBox padding="0 5rem">
                  <Name>{capitalize(data.pokemon.name)}</Name>
                  {location.pathname === "/myPokemons" && renderNickname()}
                  <HpBar />
                  <Hp>
                    <p>
                      {data.pokemon.stats[0].base_stat}/
                      {data.pokemon.stats[0].base_stat} HP
                    </p>
                  </Hp>
                </DescriptionBox>
                <DescriptionBox display="flex" padding="16px 8px">
                  <Tab width="33.3333%">
                    <h4>Types</h4>
                    <p
                      className={`types type-${data.pokemon.types[0].type.name}`}
                    >
                      {data.pokemon.types[0].type.name}
                    </p>
                  </Tab>
                  <Tab
                    borderLeft="1px rgba(0, 0, 0, .2) solid"
                    borderRight="1px rgba(0, 0, 0, .2) solid"
                    width="33.3333%"
                  >
                    {renderCaptured()}
                  </Tab>
                  <Tab width="33.3333%">
                    <h4>EXP</h4>
                    <p>{data.pokemon.base_experience}</p>
                  </Tab>
                </DescriptionBox>
                <DescriptionBox padding="16px 8px">
                  <Tab>
                    <h4>Abilities</h4>
                    <div className="abilities-wrapper">
                      {data.pokemon.abilities.map((item, i) => (
                        <p className="ability" key={`abilities-${i}`}>
                          {item.ability.name}
                        </p>
                      ))}
                    </div>
                  </Tab>
                </DescriptionBox>
                <InputPokemon />
              </PokemonDetail>
            )}
            {location.pathname === "/" && (
              <ActionButton
                data-testid="qa-catch-pokemon"
                className="circle-button"
                onClick={catchPokemon}
                disabled={inputNickname}
              >
                <Image
                  src="https://cdn.pixabay.com/photo/2016/07/23/13/18/pokemon-1536849_960_720.png"
                  alt="Pokeball"
                />
              </ActionButton>
            )}
            <CloseButton
              className="circle-button"
              onClick={() => setSelected(false)}
              disabled={inputNickname}
            >
              <CloseIcon className="fas fa-times"></CloseIcon>
            </CloseButton>
            {location.pathname === "/myPokemons" && (
              <ActionButton
                data-testid="qa-release-pokemon"
                bgColor="transparent"
                className="circle-button"
                onClick={releasePokemon}
                disabled={inputNickname}
              >
                <Image src={ReleasePokemon} alt="Released Pokeball" />
              </ActionButton>
            )}
          </DetailBox>
        </App>
      </Fade>
    )
}
