import { useQuery, gql } from "@apollo/client"
import Loading from "../components/Loading"
import { Row } from "../components/GeneralStyled"
import Card from "../components/Card"

const GET_POKEMONS = gql`
  query GetPokemons {
    pokemons(limit: 9) {
      count
      next
      results {
        id
        name
        image
      }
    }
  }
`

export default function Pokemons() {
  const { loading, error, data } = useQuery(GET_POKEMONS)

  if (loading) return <Loading />
  else if (error) return <h2>Something happened and we don't know</h2>
  else
    return (
      <Row>
        {data.pokemons.results.map((item, i) => (
          <Card
            key={`card-${i}`}
            src={item.image}
            alt={item.name}
            name={item.name}
            width="33.3333%"
          />
        ))}
      </Row>
    )
}
