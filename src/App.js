import React from 'react';
import './App.css';
import GameGrid from "./GameGrid";
import axios from "axios"

axios.defaults.baseURL = "http://localhost:42424/";

class App extends React.Component
{
  state = {
    cells: [],
    people: [],
    buildingObjects: []
  }

  componentDidMount()
  {
    axios.get(`/grid`, {json: true}).then((response) =>
    {
      this.setState({cells: response.data.cells});
    })

    axios.get(`/people`, {json: true}).then((response) =>
    {
      this.setState({people: response.data.people});
    })

    axios.get(`/building_objects`, {json: true}).then((response) =>
    {
      this.setState({buildingObjects: response.data.buildingObjects});
    })
  }


  render()
  {
    return (
      <div className="App">

        <GameGrid cells={this.state.cells} people={this.state.people} buildingObjects={this.state.buildingObjects} />

      </div>
    );
  }

}

export default App;
