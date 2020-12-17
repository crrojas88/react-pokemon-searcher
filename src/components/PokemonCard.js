import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  // set a state for the side so that when an event handler is called, it can change the state.
  state = {
    side: 'front'
  }


  handleClick = () => {
    // handles the click on the div and changes the state based on conditional
    this.state.side === 'front' ? this.setState({ side: 'back' }) : this.setState({ side: 'front' })
  }

  render() {
    // deconstruct poke obj to have access to poke values
    const { name, hp, sprites } = this.props.pokemon
    return (
      <Card>
        <div>
          <div onClick={this.handleClick} className="image">
            {/* img source depends on current state */}
            <img src={this.state.side === 'front' ? sprites.front : sprites.back} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
