import React, { Component } from 'react'

export class Searchbar extends Component {
  state = {
    searchText: '',
  }

  handleChange = (event) => {
    this.setState({
      searchText: event.currentTarget.value,
    })
  }

  handleSubmite = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.searchText)
  }

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmite}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            value={this.state.searchText}
            onChange={this.handleChange}
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    )
  }
}
