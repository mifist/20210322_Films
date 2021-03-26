import React, { Component, createRef } from "react";
import PropTypes from "prop-types";

import ImageLoader from "components/ImageLoader";
import FormMessage from "components/FormMessage";

const initialData = {
  title: "",
  img: "",
  description: "",
  director: "",
  duration: "",
  price: "",
  featured: false,
};

class FilmForm extends Component {
  state = {
    data: initialData,
    photo: "",
    errors: {},
  };

  photoRef = createRef();

  updatePhoto = (e) => {
    const file = this.photoRef.current.files && this.photoRef.current.files[0];
    if (file) {
      const img = "/img/" + file.name;
      this.setState({
        data: { ...this.state.data, img },
        errors: { ...this.state.errors, img: "" },
      });
    }
  };

  validate(data) {
    const errors = {};
    if (!data.title) errors.title = "Title cannot be blank";
    if (!data.img) errors.img = "Image cannot be blank";
    if (!data.description) errors.description = "description cannot be blank";
    if (!data.director) errors.director = "director cannot be blank";
    if (!data.duration) errors.duration = "duration cannot be blank";
    if (!data.price) errors.price = "price cannot be blank";

    if (parseInt(data.price) <= 0) errors.price = "Error price";
    if (parseInt(data.duration) <= 0) errors.duration = "Error duration";
    return errors;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props.saveFilm(this.state.data);
      this.setState({ data: initialData });
    }
  };

  handleStringChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
      errors: { ...this.state.errors, [e.target.name]: "" },
    });

  handleNumberChange = (e) => {
    let value = parseFloat(e.target.value);

    value = isNaN(value) || value === 0 ? "" : Math.abs(value);
    this.setState({
      data: { ...this.state.data, [e.target.name]: value },
      errors: { ...this.state.errors, [e.target.name]: "" },
    });
  };

  handleCheckboxChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.checked },
    });

  render() {
    const { data, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="ui form">
        <div className="ui grid mb-3">
          {/*  START two columns */}
          <div className="two column row">
            {/*  START left column */}
            <div className="ten wide column">
              {/* START title */}
              <div className={`field ${errors.title ? "error" : ""}`}>
                <label htmlFor="title">Film title</label>
                <input
                  value={data.title}
                  onChange={this.handleStringChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="film title"
                />
                {errors.title && <FormMessage>{errors.title}</FormMessage>}
              </div>
              {/* END title */}
              {/* START IMG */}
              <div className={`field img-grid ${errors.img ? "error" : ""}`}>
                <label htmlFor="img">Image</label>
                <input
                  value={data.img}
                  onChange={this.handleStringChange}
                  name="img"
                />
                {errors.img && <FormMessage>{errors.img}</FormMessage>}

                <div className="inp-file">
                  <label htmlFor="photo">Photo</label>
                  <input
                    ref={this.photoRef}
                    onChange={this.updatePhoto}
                    type="file"
                    id="photo"
                  />
                </div>
              </div>
              {/* END IMG */}

              {/* START description */}
              <div
                className={`column row field ${
                  errors.description ? "error" : ""
                }`}
              >
                <label htmlFor="description">Film description</label>
                <textarea
                  value={data.description}
                  onChange={this.handleStringChange}
                  name="description"
                  id="description"
                  placeholder="film description"
                ></textarea>
                {errors.description && (
                  <FormMessage>{errors.description}</FormMessage>
                )}
              </div>
              {/* END description */}
            </div>
            {/*  END left column */}

            {/*  START right column */}
            <div className="six wide column">
              <ImageLoader
                src={data.img}
                fallbackImg="http://via.placeholder.com/250x250"
                className="ui image imgfit"
                alt={data.title}
              />
            </div>
            {/*  END right column */}
          </div>
          {/*  END two columns */}

          {/* START three columns */}
          <div className="three column row">
            {/* START director */}
            <div className={`column field ${errors.director ? "error" : ""}`}>
              <label htmlFor="director">Director</label>
              <input
                value={data.director}
                onChange={this.handleStringChange}
                type="text"
                name="director"
                id="director"
                placeholder="film director"
              />
              {errors.director && <FormMessage>{errors.director}</FormMessage>}
            </div>
            {/* END director */}

            {/* START duration */}
            <div className={`column field ${errors.duration ? "error" : ""}`}>
              <label htmlFor="duration">Duration</label>
              <input
                value={data.duration}
                onChange={this.handleNumberChange}
                type="number"
                name="duration"
                id="duration"
                placeholder="Duration"
              />
              {errors.duration && <FormMessage>{errors.duration}</FormMessage>}
            </div>
            {/* END duration */}
            {/* START price */}
            <div className={`column field ${errors.price ? "error" : ""}`}>
              <label htmlFor="price">Price</label>
              <input
                value={data.price}
                onChange={this.handleNumberChange}
                type="number"
                name="price"
                id="price"
                placeholder="price"
              />
              {errors.price && <FormMessage>{errors.price}</FormMessage>}
            </div>
            {/* END price */}
          </div>
          {/* END three columns */}

          {/* START featured */}
          <div className="six wide column inline field">
            <label htmlFor="featured">Featured</label>
            <input
              checked={data.featured}
              onChange={this.handleCheckboxChange}
              type="checkbox"
              name="featured"
              id="featured"
            />
          </div>
          {/* END featured */}

          {/* START buttons */}
          <div className="ui fluid buttons">
            <button className="ui button primary" type="submit">
              Save
            </button>
            <div className="or"></div>
            <span onClick={this.props.hideForm} className="ui button">
              Hide form
            </span>
          </div>
          {/* END buttons */}
        </div>
        {/* END ui grid */}
      </form>
    );
  }
}

FilmForm.propTypes = {
  hideForm: PropTypes.func.isRequired,
  saveFilm: PropTypes.func.isRequired,
};

export default FilmForm;
