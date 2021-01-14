import PokemonContextProvider from "../contexts/PokemonContext"
import PokeDex from "./PokeDex"
import CardDetail from "../components/CardDetail"
import Toast from "../components/Toast"
import { act } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import { mount } from "enzyme"
import { ThemeProvider } from "@emotion/react"
import { theme } from "../App"
import ToastContextProvider from "../contexts/ToastContext"
import SearchContextProvider from "../contexts/SearchContext"
import { getPokemonsMock, getPokemonMock } from "../utils/testHelper"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/",
  }),
}))

describe("<PokeDex />", () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it("should be able to catch pokemon", async () => {
    const wrapper = mount(
      <MockedProvider mocks={getPokemonsMock} addTypename={false}>
        <ThemeProvider theme={theme}>
          <PokemonContextProvider>
            <PokeDex />
            <MockedProvider mocks={getPokemonMock} addTypename={false}>
              <ToastContextProvider>
                <SearchContextProvider>
                  <CardDetail />
                  <Toast />
                </SearchContextProvider>
              </ToastContextProvider>
            </MockedProvider>
          </PokemonContextProvider>
        </ThemeProvider>
      </MockedProvider>
    )

    // await for GET_POKEMONS fetched
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))

      wrapper.update()
    })

    // Card onclick
    wrapper.find("div[data-testid='qa-card']").first().simulate("click")

    // await for GET_POKEMON fetched
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))

      wrapper.update()
    })

    expect(
      wrapper.find("CardDetail [data-testid='qa-fade-container']").exists()
    ).toBe(true)

    wrapper.find("button[data-testid='qa-catch-pokemon']").simulate("click")

    // await for catching to be processed
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      wrapper.update()
    })

    expect(
      wrapper.find("Toast [data-testid='qa-fade-container']").exists()
    ).toBe(true)

    wrapper.unmount()
  })
})
