import React, { Component } from 'react';
import './App.css';

function City( {data} ){
  return(<div className='city-container'>
    <div className='city'>
      {data.City},{data.State}
    </div>
    
    <ul >

      <li>State: {data.State}</li>
      <li>Location: ({data.Long},{data.Lat})</li>
      <li>Population (Estimated): {data.EstimatedPopulation}</li>
      <li>Total Wage: {data.TotalWages}</li>
      
    </ul>
  </div>)
}

function ZipSearchField(props){
  return (
    <div className='zip-input'>
      Zip Code:
      <input type="text" onChange={props.changeHandler}/>
    </div>
  )
}


class App extends Component {
  state = {
    zipCode:'',
    cities: [],
  }
  zipChanged= (event) =>{
    console.log(event.target.value );
    this.setState({zipcode: event.target.value} )

    fetch(`http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.setState({cities:data})
      })
      .catch(err =>{
        console.log('not result')
        this.setState({cities:[]})
      })
      
  }

  render() {

    return (
      
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div >
          <ZipSearchField zipCode={this.state.zipCode} changeHandler={this.zipChanged} />
          <div className="App">
            {this.state.cities.map((city) => <City data={city}/>)}
         
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
