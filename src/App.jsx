import React, { Component } from "react";
import { prop, sortWith, ascend, descend } from "ramda";
import _find from "lodash/find";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import FilmContext from "contexts/FilmContext";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import TopNavigation from "components/TopNavigation";
import api from "api";

class App extends Component {
  state = {
    films: [],
    showAddForm: false,
    selectedFilm: {},
  };

  sortFilms = (films) =>
    sortWith([descend(prop("featured")), ascend(prop("title"))], films);

  componentDidMount() {
    api.films
      .fetchAll()
      .then((films) => this.setState({ films: this.sortFilms(films) }));
  }

  selectFilmForEdit = (selectedFilm) =>
    this.setState({
      selectedFilm,
      showAddForm: true,
    });

  showForm = (e) => this.setState({ showAddForm: true, selectedFilm: {} });
  hideForm = (e) => this.setState({ showAddForm: false, selectedFilm: {} });

  toggleFeatured = (_id) => {
    const film = _find(this.state.films, { _id });
    return this.updateFilm({ ...film, featured: !film.featured });
  };

  addFilm = (filmData) =>
    api.films.create(filmData).then((film) =>
      this.setState(({ films, showAddForm, selectedFilm }) => ({
        films: this.sortFilms([...films, film]),
        showAddForm: false,
        selectedFilm: {},
      }))
    );

  updateFilm = (film) =>
    api.films.update(film).then((film) =>
      this.setState(({ films, showAddForm, selectedFilm }) => ({
        films: this.sortFilms(
          films.map((f) => (f._id === film._id ? film : f))
        ),
        showAddForm: false,
        selectedFilm: {},
      }))
    );

  saveFilm = (film) => (film._id ? this.updateFilm(film) : this.addFilm(film));

  deleteFilm = (film) =>
    api.films.delete(film).then(() =>
      this.setState(({ films, selectedFilm, showAddForm }) => ({
        films: this.sortFilms(films.filter((f) => f._id !== film._id)),
        selectedFilm: {},
        showAddForm: false,
      }))
    );

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
