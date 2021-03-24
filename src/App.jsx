import React, { Component } from "react";
import _orderBy from "lodash/orderBy";
import { prop, sortWith, ascend, descend } from "ramda";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import { films } from "data";
import FilmContext from "contexts/FilmContext";

class App extends Component {
  state = {
    films: [],
  };

  sortFilms = (films) =>
    sortWith([descend(prop("featured")), ascend(prop("title"))], films);

  componentDidMount() {
    this.setState({ films: this.sortFilms(films) });
  }
  toggleFeatured = (id) =>
    this.setState(({ films }) => ({
      films: this.sortFilms(
        films.map((f) => (f._id === id ? { ...f, featured: !f.featured } : f))
      ),
    }));

  value = {
    toggleFeatured: this.toggleFeatured,
  };

  render() {
    const { films } = this.state;
    return (
      <div className="ui container mt-3">
        <FilmContext.Provider value={this.value}>
          <FilmsList films={films} />
        </FilmContext.Provider>
      </div>
    );
  }
}

export default App;
