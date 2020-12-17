import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {

  // state is set to have a poke object and a searched poke obj that will re-render page based on search input
  state = {
    pokemon: [],
    searchedPokemon: []
  }

  componentDidMount() {
    // fetch and set pokemon state on initial page render
    const url = 'http://localhost:3000/pokemon'

    fetch(url)
    .then(response => response.json())
    .then(pokemon => {
      this.setState({
        pokemon: pokemon,
        searchedPokemon: pokemon
      })
    })
  }

  handleSearch = (e) => {
    // checks if e.target.value is an empty string returns all pokemon, otherwise filters through pokemon obj that includes what is typed in search bar.
    e.persist()

    if (e.target.value === '') {
       this.setState(prevState => ({searchedPokemon: [...prevState.pokemon]}))
    } else {
       this.setState(prevState => {
        return {searchedPokemon: prevState.pokemon.filter(pokemon => pokemon.name.includes(e.target.value))}
      })
    }
  }

  handleForm = (target) => {
    // takes an object "target", is deconstructed, and passed the value in newPokeObj to be later used in POST request
    const { name, hp, frontUrl, backUrl } = target
    const url = 'http://localhost:3000/pokemon'

    let newPokeObj = {
      name: name.value,
      hp: hp.value,
      sprites: {
        front: frontUrl.value,
        back: backUrl.value
      }
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify(newPokeObj)
    }
  // the new JSON object is then passed through setState in both searchedPokemon: and pokemon: first, then spread operator so the new result shows up first on the PokemonCollection. prevState is passed so value of previous state can be accessed in  case of multiple setStates being fired
    fetch(url, configObj)
    .then(response => response.json())
    .then(newObj => {
      this.setState((prevState) => {
        return {
          searchedPokemon: [newObj, ...prevState.searchedPokemon],
          pokemon: [newObj, ...prevState.pokemon]
        }
      })
    })
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm handleForm={this.handleForm}/>
        <br />
        <Search handleSearch={this.handleSearch}/>
        <br />
        <PokemonCollection pokemon={this.state.searchedPokemon} />
      </Container>
    )
  }
}

export default PokemonPage
