import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {
// PokemonCollection renders pokemon cards for each pokemon

  showPokeCards = () => {
    // map over each pokemon obj and render a PokemonCard component and pass props for id and poke object.
    return this.props.pokemon.map(poke => {
      return <PokemonCard key={poke.id} pokemon={poke} />
    })
  }

  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {/* invoke showPokeCards because we want to render a page with pokemon cards */}
        {this.showPokeCards()}
      </Card.Group>
    )
  }
}

export default PokemonCollection
