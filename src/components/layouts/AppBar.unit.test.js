import { shallow } from "enzyme"
import AppBar from "./AppBar"

describe("<AppBar />", () => {
  it("should render given title and total", () => {
    const data = {
      title: "Judul",
      total: "0",
    }

    const wrapper = shallow(<AppBar {...data} />)

    expect(wrapper.find("[data-testid='qa-title']").text()).toEqual(data.title)
    expect(wrapper.find("[data-testid='qa-total-pokemons']").text()).toEqual(
      data.total
    )

    wrapper.unmount()
  })
})
