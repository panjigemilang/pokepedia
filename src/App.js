import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PokemonContextProvider from "./contexts/PokemonContext"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import "./App.css"

// Components
import PokeDex from "./screens/PokeDex"
import MyPokemons from "./screens/MyPokemons"
import CardDetail from "./components/CardDetail"
import Modal from "./components/Modal"
import NavigationBar from "./components/layouts/NavigationBar"

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
})

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <PokemonContextProvider>
          <Modal />
          <CardDetail />
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={PokeDex} />
          </Switch>
          <Switch>
            <Route exact path="/myPokemons" component={MyPokemons} />
          </Switch>
        </PokemonContextProvider>
      </ApolloProvider>
    </Router>
  )
}

export default App
