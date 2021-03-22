import React, { Component } from "react";

import FilmCard from "pages/FilmsPage/components/FilmCard";

class App extends Component {
  render() {
    return (
      <div className="ui container mt-3">
        <FilmCard />
      </div>
    );
  }
}

export default App;
