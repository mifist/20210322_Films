import React, { Component } from "react";
import { prop, sortWith, ascend, descend } from "ramda";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import { films } from "data";
import FilmContext from "contexts/FilmContext";
import FilmForm from "pages/FilmsPage/components/FilmForm";

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
          {/* <FilmsList films={films} /> */}
          <FilmForm />
        </FilmContext.Provider>
      </div>
    );
  }
}

export default App;
