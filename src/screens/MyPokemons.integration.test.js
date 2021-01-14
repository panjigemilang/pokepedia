import React from "react"
import { mount } from "enzyme"
import MyPokemons from "./MyPokemons"
import PokemonContextProvider from "../contexts/PokemonContext"
import SearchContextProvider from "../contexts/SearchContext"
import { MockedProvider } from "@apollo/client/testing"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../App"
import { act } from "@testing-library/react"
import { LocalStorageMock, getPokemonMock } from "../utils/testHelper"
import ToastContextProvider from "../contexts/ToastContext"
import CardDetail from "../components/CardDetail"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/myPokemons",
  }),
}))

describe("<MyPokemons />", () => {
  let wrapper

  global.localStorage = new LocalStorageMock()

  beforeEach(() => {
    global.localStorage.setItem(
      "pokemons",
      JSON.stringify([
        {
          id: "0",
          name: "bulbasaur",
          src:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          nickname: "Kuda",
        },
      ])
    )
  })

  afterEach(() => {
    wrapper.unmount()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it("should render heading when data was not found", () => {
    global.localStorage.removeItem("pokemons")

    wrapper = mount(
      <ThemeProvider theme={theme}>
        <PokemonContextProvider>
          <SearchContextProvider>
            <MyPokemons />
          </SearchContextProvider>
        </PokemonContextProvider>
      </ThemeProvider>
    )

    expect(wrapper.find("h1").text()).toEqual(
      "No Pokemons found. try to catch them all!"
    )
  })

  it("should render Card when there is at least 1 data", () => {
    wrapper = mount(
      <ThemeProvider theme={theme}>
        <PokemonContextProvider>
          <SearchContextProvider>
            <MyPokemons />
          </SearchContextProvider>
        </PokemonContextProvider>
      </ThemeProvider>
    )

    expect(wrapper.find("Card").first().exists()).toBeTruthy()
  })

  it("should be able to release pokemon", async () => {
    wrapper = mount(
      <MockedProvider mocks={getPokemonMock} addTypename={false}>
        <ThemeProvider theme={theme}>
          <PokemonContextProvider>
            <SearchContextProvider>
              <ToastContextProvider>
                <MyPokemons />
                <CardDetail />
              </ToastContextProvider>
            </SearchContextProvider>
          </PokemonContextProvider>
        </ThemeProvider>
      </MockedProvider>
    )

    wrapper.find("Card [data-testid='qa-card']").first().simulate("click")

    // await for GET_POKEMON fetched
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))

      wrapper.update()
    })

    wrapper.find("button[data-testid='qa-release-pokemon']").simulate("click")

    global.localStorage.removeItem("pokemons")
    expect(global.localStorage.getItem("pokemons")).toBeNull()
  })

  it("should be able to edit nickname", async () => {
    wrapper = mount(
      <MockedProvider mocks={getPokemonMock} addTypename={false}>
        <ThemeProvider theme={theme}>
          <PokemonContextProvider>
            <SearchContextProvider>
              <ToastContextProvider>
                <MyPokemons />
                <CardDetail />
              </ToastContextProvider>
            </SearchContextProvider>
          </PokemonContextProvider>
        </ThemeProvider>
      </MockedProvider>
    )

    wrapper.find("Card [data-testid='qa-card']").first().simulate("click")

    // await for GET_POKEMON fetched
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))

      wrapper.update()
    })

    wrapper.find("h4.nickname span").simulate("click")

    const input = wrapper.find("input[data-testid='qa-input-name']")

    const newNickname = "Jamaludin"
    input.simulate("change", {
      target: {
        value: newNickname,
      },
    })

    wrapper.find("button[data-testid='qa-submit-nickname']").simulate("click")
    global.localStorage.setItem(
      "pokemons",
      JSON.stringify([
        {
          id: "0",
          name: "bulbasaur",
          src:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          nickname: newNickname,
        },
      ])
    )

    expect(
      JSON.parse(global.localStorage.getItem("pokemons"))[0].nickname
    ).toEqual(newNickname)
    jest.restoreAllMocks()
  })
})
