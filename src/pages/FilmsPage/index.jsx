import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { prop, sortWith, ascend, descend } from "ramda";
import _find from "lodash/find";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import FilmContext from "contexts/FilmContext";
import FilmForm from "pages/FilmsPage/components/FilmForm";
import api from "api";
import { FullSpinner } from "styles/app";
import AdminRoute from "pages/FilmsPage/components/AdminRoute";

class FilmsPage extends Component {
  state = {
    films: [],
    loading: true,
  };

  sortFilms = (films) =>
    sortWith([descend(prop("featured")), ascend(prop("title"))], films);

  componentDidMount() {
    api.films
      .fetchAll()
      .then((films) =>
        this.setState({ films: this.sortFilms(films), loading: false })
      );
  }

  toggleFeatured = (_id) => {
    const film = _find(this.state.films, { _id });
    return this.updateFilm({ ...film, featured: !film.featured });
  };

  addFilm = (filmData) =>
    api.films.create(filmData).then((film) =>
      this.setState(({ films }) => ({
        films: this.sortFilms([...films, film]),
      }))
    );

  updateFilm = (film) =>
    api.films.update(film).then((film) =>
      this.setState(({ films }) => ({
        films: this.sortFilms(
          films.map((f) => (f._id === film._id ? film : f))
        ),
      }))
    );

  saveFilm = (film) => (film._id ? this.updateFilm(film) : this.addFilm(film));

  deleteFilm = (film) =>
    api.films.delete(film).then(() =>
      this.setState(({ films }) => ({
        films: this.sortFilms(films.filter((f) => f._id !== film._id)),
      }))
    );

  value = {
    toggleFeatured: this.toggleFeatured,
    selectFilmForEdit: this.selectFilmForEdit,
    deleteFilm: this.deleteFilm,
  };

  render() {
    const { films, loading } = this.state;
    const cols = this.props.location.pathname === "/films" ? "sixteen" : "ten";

    return (
      <FilmContext.Provider value={this.value}>
        <div className="ui stackable grid">
          <div className="six wide column">
            <AdminRoute path="/films/new">
              <FilmForm films={films} saveFilm={this.saveFilm} />
            </AdminRoute>

            <AdminRoute path="/films/edit/:_id">
              <FilmForm films={films} saveFilm={this.saveFilm} />
            </AdminRoute>
          </div>

          <div className={`${cols} wide column`}>
            {loading ? <FullSpinner /> : <FilmsList films={films} />}
          </div>
        </div>
      </FilmContext.Provider>
    );
  }
}

export default withRouter(FilmsPage);
