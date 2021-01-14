import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PokemonContextProvider from "./contexts/PokemonContext"
import ToastContextProvider from "./contexts/ToastContext"
import SearchContextProvider from "./contexts/SearchContext"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { jsx, ThemeProvider } from "@emotion/react"
import "./App.css"

// UI Components
import PokeDex from "./screens/PokeDex"
import MyPokemons from "./screens/MyPokemons"
import CardDetail from "./components/CardDetail"
import Modal from "./components/Modal"
import Toast from "./components/Toast"
import NavigationBar from "./components/layouts/NavigationBar"

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
})

const theme = {
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

export { theme }

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <PokemonContextProvider>
            <ToastContextProvider>
              <SearchContextProvider>
                <Modal />
                <Toast />
                <CardDetail />
                <NavigationBar />
                <Switch>
                  <Route exact path="/" component={PokeDex} />
                  <Route exact path="/myPokemons" component={MyPokemons} />
                </Switch>
              </SearchContextProvider>
            </ToastContextProvider>
          </PokemonContextProvider>
        </ApolloProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
