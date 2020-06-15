import React from 'react';
import axios from 'axios';
import Pokedex from './Pokedex.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokedex: [],
      poketype: '',
      pokename: ''
    }
    this.getPokemon = this.getPokemon.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getPokemonType = this.getPokemonType.bind(this);
    this.updatePokeName = this.updatePokeName.bind(this);
    this.deletePokemon = this.deletePokemon.bind(this);
    }

  // componentDidMount () {
  //   this.getPokemon();
  // }

  getPokemon () {
    axios
      .get('/pokemon')
      .then((data) => {
        this.setState({
          pokedex: data.data
        })
      })
      .catch((err) => {
        console.error(err)
      })
      .then(()=> {
        console.log(this.state)
      })
  }

  getPokemonType (type) {
    axios
      .get(`/pokemon/${type}`)
      .then((data) => {
        this.setState({
          pokedex: data.data
        })
      })
      .catch((err) => {
        console.error(err)
      })
      .then(()=> {
        console.log(this.state)
      })
  }


  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  updatePokeName (id) {
    axios
    .put(`pokemon/${id}`, {
      pokeName: this.state.pokename
    })
    .then(() => {
      this.getPokemon();
    })
    .catch((err) => {
      console.error(err)
    })
  }

  deletePokemon(id) {
    axios
    .delete(`pokemon/${id}`)
    .then(() => {
      this.getPokemon()
    })
    .catch((err)=> {
      console.error(err)
    })
  }



  render() {
    return (
      <div>
    <div>
      <h1>Pokemon!</h1>
      <button onClick={this.getPokemon}>Show All</button>
      <select id="type" name="poketype" onChange={this.handleChange}>
        <option>Sort by Type</option>
        <option>Grass</option>
        <option>Fire</option>
        <option>Water</option>
        <option>Normal</option>
        <option>Poison</option>
        <option>Electric</option>
        <option>Ground</option>
        <option>Fighting</option>
        <option>Psychic</option>
        <option>Rock</option>
        <option>Ghost</option>
        <option>Dragon</option>
      </select>
      <button onClick={()=>this.getPokemonType(this.state.poketype)}>INSERT</button>
      {this.state.pokedex.map((pokemon, index)=>( <Pokedex pokemon={pokemon} key={index} update={this.handleChange} pokename={this.state.pokename} updatePokeName={this.updatePokeName} delete={this.deletePokemon} />))}
      </div>
    </div>
    )
  }

}

export default App;