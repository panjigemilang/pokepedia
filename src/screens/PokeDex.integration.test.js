// import { ApolloProvider } from "@apollo/client"
// import { mount } from "enzyme"
// import { PokemonContext } from "../contexts/PokemonContext"
// import PokeDex from "./PokeDex"

// describe("<PokeDex />", () => {
//   let wrapper
//   // beforeEach(())

//   it('should catch pokemon', () => {
//     const client = new ApolloClient({
//       uri: "https://graphql-pokeapi.vercel.app/api/graphql",
//       cache: new InMemoryCache(),
//     })

//     const defaultValues = {
//       pokemons: []
//     }

//     wrapper = mount(
//       <PokemonContext.Provider value={defaultValues}>
//       <ApolloProvider client={client}>
//         <PokeDex />
//       </ApolloProvider>
//       </PokemonContext.Provider>
//     )

//     const card = wrapper.find("div[data-testid='qa-card']")
//     card.simulate("click")

//   })
// })
