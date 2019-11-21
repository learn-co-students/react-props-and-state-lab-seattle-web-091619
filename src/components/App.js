import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
    this.fetchPets();
  }

  adoptPet = id => {
    this.setState(prevState => {
      return {
        pets: prevState.pets.map(pet => {
          if (pet.id === id) {
            pet.isAdopted = true;
          }
          return pet;
        })
      }
    })
  }

  fetchPets = () => {
    const { type } = this.state.filters;
    fetch(`/api/pets${type === "all" ? "" : "?type=" + type}`)
    .then(res => res.json())
    .then(data => this.setState({ pets: data }))
  }

  changeType = newType => {
    this.setState({
      filters: {
        type: newType
      }
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onChangeType={this.changeType}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
