import React, { Component } from "react";
import FilmCard from "pages/FilmsPage/components/FilmCard";
import { films } from "data";

class App extends Component {
  state = {
    films: [],
  };

  componentDidMount() {
    this.setState(films);
  }

  render() {
    const { films } = this.state;
    return (
      <div className="ui container mt-3">
        <FilmCard film={films[0]} />
      </div>
    );
  }
}

export default App;
