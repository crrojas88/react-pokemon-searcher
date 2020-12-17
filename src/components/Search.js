import React from 'react'

const Search = props => {
  return (
    <div className="ui search">
      <div className="ui icon input">
        {/* add a handler that on change of input, calls handleSearch function */}
        <input onChange={props.handleSearch} className="prompt"/>
        <i className="search icon" />
      </div>
    </div>
  )
}

export default Search
