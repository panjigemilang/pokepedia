import { shallow } from "enzyme"
import NavigationBar from "./NavigationBar"

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/",
  }),
}))

describe("<NavigationBar />", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<NavigationBar />)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it("should render pokedex tabs properly", () => {
    expect(wrapper.find("[data-testid='qa-pokedex-tab']").exists()).toBe(true)
  })

  it("should render myPokemons tabs properly", () => {
    expect(wrapper.find("[data-testid='qa-my-pokemons-tab']").exists()).toBe(
      true
    )
  })
})
