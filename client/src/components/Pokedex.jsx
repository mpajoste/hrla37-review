import React from 'react';
import axios from 'axios';


class Pokedex extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showInput: false
      }
      this.toggleInput = this.toggleInput.bind(this)
    }

    toggleInput(e) {
      this.setState({
        showInput: !this.state.showInput
      })
    }


    render() {
      return (
        <div className= "poke-profile">
        <h3 onClick={this.toggleInput}>{this.state.showInput ?  <form><input name="pokename" onChange={this.props.update}></input><button type="submit" onClick={()=> this.props.updatePokeName(this.props.pokemon.id)}>Rename</button> </form>: (this.props.pokemon.pokeName) }</h3> 
          <img onClick={()=> {this.props.delete(this.props.pokemon.id)}}
          src={this.props.pokemon.pokeImg} />
        </div>
      )
    }

}

export default Pokedex;