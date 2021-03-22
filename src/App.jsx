import React, { Component } from "react";
import { prop, sortWith, ascend, descend } from "ramda";
import { generate as id } from "shortid";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import { films } from "data";
import FilmContext from "contexts/FilmContext";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import TopNavigation from "components/TopNavigation";

class App extends Component {
  state = {
    films: [],
    showAddForm: false,
    selectedFilm: {},
  };

  sortFilms = (films) =>
    sortWith([descend(prop("featured")), ascend(prop("title"))], films);

  componentDidMount() {
    this.setState({ films: this.sortFilms(films) });
  }

  selectFilmForEdit = (selectedFilm) =>
    this.setState({
      selectedFilm,
      showAddForm: true,
    });

  showForm = (e) => this.setState({ showAddForm: true, selectedFilm: {} });
  hideForm = (e) => this.setState({ showAddForm: false, selectedFilm: {} });

  toggleFeatured = (id) =>
    this.setState(({ films }) => ({
      films: this.sortFilms(
        films.map((f) => (f._id === id ? { ...f, featured: !f.featured } : f))
      ),
    }));

  addFilm = (film) =>
    this.setState(({ films, showAddForm, selectedFilm }) => ({
      films: this.sortFilms([...films, { _id: id(), ...film }]),
      showAddForm: false,
      selectedFilm: {},
    }));

  updateFilm = (film) =>
    this.setState(({ films, showAddForm, selectedFilm }) => ({
      films: this.sortFilms(films.map((f) => (f._id === film._id ? film : f))),
      showAddForm: false,
      selectedFilm: {},
    }));

  saveFilm = (film) => (film._id ? this.updateFilm(film) : this.addFilm(film));

  deleteFilm = (film) =>
    this.setState(({ films, selectedFilm, showAddForm }) => ({
      films: this.sortFilms(films.filter((f) => f._id !== film._id)),
      selectedFilm: {},
      showAddForm: false,
    }));

  value = {
    toggleFeatured: this.toggleFeatured,
    selectFilmForEdit: this.selectFilmForEdit,
    deleteFilm: this.deleteFilm,
  };

  render() {
    const { films, showAddForm, selectedFilm } = this.state;
    const cols = showAddForm ? "ten" : "sixteen";

    return (
      <div className="ui container mt-3">
        <FilmContext.Provider value={this.value}>
          <TopNavigation showForm={this.showForm} />

          <div className="ui stackable grid">
            {showAddForm && (
              <div className="six wide column">
                <FilmForm
                  film={selectedFilm}
                  saveFilm={this.saveFilm}
                  hideForm={this.hideForm}
                />
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
