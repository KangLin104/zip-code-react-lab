import React, { Component } from 'react';
import './App.css';

function City( info ){
  return(<div className='city-container'>
    
    <ul >
      
      <li>{info}</li>
      
    </ul>
  </div>)
}

function CitySearchField(props){
  return (
    <div className='zip-input'>
      City:
      <input type="text" onChange={props.changeHandler}/>
    </div>
  )
}


class App extends Component {
  state = {
    cities: [],
  }
  
  CityChanged= (event) =>{
    console.log(event.target.value );
    this.setState({cityName: event.target.value} )

    fetch(`http://ctp-zip-api.herokuapp.com/city/${(event.target.value).toUpperCase()}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({cities:data})
      })
      .catch(err =>{
        this.setState({cities:[]})
      })
      
  }

  render() {

    return (
      
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <div >
          <CitySearchField cityName={this.state.cityName} changeHandler={this.CityChanged} />
          <div className="App">
            {this.state.cities.map((zip) => City(zip))}
         
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;