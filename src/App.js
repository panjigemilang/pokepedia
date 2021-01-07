import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PokemonContextProvider from "./contexts/PokemonContext"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import "./App.css"

// Components
import Pokemons from "./screens/Pokemons"

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
})

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <PokemonContextProvider>
          <Switch>
            <Route exact path="/" component={Pokemons} />
          </Switch>
        </PokemonContextProvider>
      </ApolloProvider>
    </Router>
  )
}

export default App
