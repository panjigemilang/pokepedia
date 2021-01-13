import { mount } from "enzyme"
import PokemonContextProvider from "../contexts/PokemonContext"
import { ThemeProvider } from "@emotion/react"
import Card from "./Card"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/",
  }),
}))

describe("<Card />", () => {
  let wrapper, data, theme

  beforeEach(() => {
    data = {
      alt: "alt",
      id: "1",
      src: "/logo512.png",
      name: "",
    }

    theme = {
      colors: {
        primary: "#FFD474",
        secondary: "#10e879",
        common: "#46c298",
      },
      toast: {
        success: "#13c57b",
        failed: "#d42c2c",
      },
      textColors: {
        info: "#17b2f0",
      },
    }

    wrapper = mount(
      <ThemeProvider theme={theme}>
        <PokemonContextProvider>
          <Card {...data} />
        </PokemonContextProvider>
      </ThemeProvider>
    )
  })

  afterEach(() => {
    wrapper.unmount()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it("should render card image properly", () => {
    expect(wrapper.find(".image").exists()).toBe(true)
  })

  it("should render nickname properly if nickname exists", () => {
    data.nickname = "jamal"

    wrapper = mount(
      <ThemeProvider theme={theme}>
        <PokemonContextProvider>
          <Card {...data} />
        </PokemonContextProvider>
      </ThemeProvider>
    )

    expect(wrapper.find("p[data-testid='qa-title']").text()).toEqual(
      data.nickname
    )
  })

  it("should render name instead if nickname doesn't exists", () => {
    expect(wrapper.find("p[data-testid='qa-title']").text()).toEqual(data.name)
  })
})
