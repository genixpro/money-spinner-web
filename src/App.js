import React from 'react';
import './App.css';
import GameGrid from "./GameGrid";
import axios from "axios"

axios.defaults.baseURL = "http://localhost:42424/";

class App extends React.Component
{
  state = {
    cells: []
  }

  componentDidMount()
  {
    axios.get(`/grid`, {json: true}).then((response) =>
    {
      this.setState({cells: response.data.cells});
    })
  }


  render()
  {
    return (
      <div className="App">

        <GameGrid cells={this.state.cells} />

      </div>
    );
  }

}

export default App;
