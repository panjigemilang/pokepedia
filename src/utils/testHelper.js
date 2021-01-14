import { GET_POKEMONS } from "../screens/PokeDex"
import { GET_POKEMON } from "../components/CardDetail"

export class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = value.toString()
  }

  removeItem(key) {
    delete this.store[key]
  }
}

export const getPokemonsMock = [
  {
    request: {
      query: GET_POKEMONS,
      variables: {
        limit: 9,
        offset: 0,
      },
    },
    result: {
      data: {
        pokemons: {
          nextOffset: 9,
          results: [
            {
              id: 1,
              name: "bulbasaur",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            },
            {
              id: 2,
              name: "ivysaur",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
            },
            {
              id: 3,
              name: "venusaur",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
            },
            {
              id: 4,
              name: "charmander",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            },
            {
              id: 5,
              name: "charmeleon",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
            },
            {
              id: 6,
              name: "charizard",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
            },
            {
              id: 7,
              name: "squirtle",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
            },
            {
              id: 8,
              name: "wartortle",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
            },
            {
              id: 9,
              name: "blastoise",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
            },
          ],
        },
      },
    },
  },
]

export const getPokemonMock = [
  {
    request: {
      query: GET_POKEMON,
      variables: {
        name: "bulbasaur",
      },
    },
    result: {
      data: {
        pokemon: {
          name: "bulbasaur",
          base_experience: 64,
          types: [
            {
              type: {
                name: "grass",
              },
            },
            {
              type: {
                name: "poison",
              },
            },
          ],
          stats: [
            {
              base_stat: 45,
              stat: {
                name: "hp",
              },
            },
            {
              base_stat: 49,
              stat: {
                name: "attack",
              },
            },
            {
              base_stat: 49,
              stat: {
                name: "defense",
              },
            },
            {
              base_stat: 65,
              stat: {
                name: "special-attack",
              },
            },
            {
              base_stat: 65,
              stat: {
                name: "special-defense",
              },
            },
            {
              base_stat: 45,
              stat: {
                name: "speed",
              },
            },
          ],
          abilities: [
            {
              ability: {
                name: "overgrow",
              },
            },
            {
              ability: {
                name: "chlorophyll",
              },
            },
          ],
          sprites: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          },
        },
      },
    },
  },
]
