import React, { Component } from "react";
import { prop, sortWith, ascend, descend } from "ramda";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import { films } from "data";
import FilmContext from "contexts/FilmContext";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import TopNavigation from "components/TopNavigation";

class App extends Component {
  state = {
    films: [],
    showAddForm: false,
  };

  sortFilms = (films) =>
    sortWith([descend(prop("featured")), ascend(prop("title"))], films);

  componentDidMount() {
    this.setState({ films: this.sortFilms(films) });
  }

  showForm = (e) => this.setState({ showAddForm: true });
  hideForm = (e) => this.setState({ showAddForm: false });

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
    const { films, showAddForm } = this.state;
    const cols = showAddForm ? "ten" : "sixteen";

    return (
      <div className="ui container mt-3">
        <FilmContext.Provider value={this.value}>
          <TopNavigation showForm={this.showForm} />

          <div className="ui stackable grid">
            {showAddForm && (
              <div className="six wide column">
                <FilmForm hideForm={this.hideForm} />
              </div>
            )}

            <div className={`${cols} wide column`}>
              <FilmsList films={films} />
            </div>
          </div>
        </FilmContext.Provider>
      </div>
    );
  }
}

export default App;
