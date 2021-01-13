import { mount } from "enzyme"
import { PokemonContext } from "../contexts/PokemonContext"
import Modal from "./Modal"

describe("<Modal />", () => {
  it("should render Modal component when value of isCatching is true", () => {
    const wrapper = mount(
      <PokemonContext.Provider
        value={{
          isCatching: true,
        }}
      >
        <Modal />
      </PokemonContext.Provider>
    )

    expect(
      wrapper.find("[data-testid='qa-fade-container']").exists()
    ).toBeTruthy()
    wrapper.unmount()
  })
})
