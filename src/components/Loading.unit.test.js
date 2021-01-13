import { shallow } from "enzyme"
import Loading from "./Loading"

describe("<Loading />", () => {
  it("should render loading spin", () => {
    const wrapper = shallow(<Loading />)
    expect(wrapper.find(".fas.fa-circle-notch.fa-spin").exists()).toBeTruthy()
  })
})
