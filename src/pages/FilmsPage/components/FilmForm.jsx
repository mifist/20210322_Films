import React, { Component } from "react";
import ImageLoader from "components/ImageLoader";

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
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.data);
  };

  handleStringChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  handleNumberChange = (e) => {
    let value = parseFloat(e.target.value);

    value = isNaN(value) || value === 0 ? "" : Math.abs(value);
    this.setState({ data: { ...this.state.data, [e.target.name]: value } });
  };

  handleCheckboxChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.checked },
    });

  render() {
    const { data } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="ui form">
        <div className="ui grid mb-3">
          {/*  START two columns */}
          <div className="two column row">
            {/*  START left column */}
            <div className="ten wide column">
              {/* START title */}
              <div className="field">
                <label htmlFor="title">Film title</label>
                <input
                  value={data.title}
                  onChange={this.handleStringChange}
                  type="text"
                  name="title"
                  id="title"
                  placeholder="film title"
                />
              </div>
              {/* END title */}
              {/* START IMG */}
              <div className="field img-grid">
                <label htmlFor="img">Image</label>
                <input
                  value={data.img}
                  onChange={this.handleStringChange}
                  name="img"
                />

                <div className="inp-file">
                  <label htmlFor="photo">Photo</label>
                  <input type="file" id="photo" />
                </div>
              </div>
              {/* END IMG */}

              {/* START description */}
              <div className="column row field">
                <label htmlFor="description">Film description</label>
                <textarea
                  value={data.description}
                  onChange={this.handleStringChange}
                  name="description"
                  id="description"
                  placeholder="film description"
                ></textarea>
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
            <div className="column field">
              <label htmlFor="director">Director</label>
              <input
                value={data.director}
                onChange={this.handleStringChange}
                type="text"
                name="director"
                id="director"
                placeholder="film director"
              />
            </div>
            {/* END director */}

            {/* START duration */}
            <div className="column field">
              <label htmlFor="duration">Duration</label>
              <input
                value={data.duration}
                onChange={this.handleNumberChange}
                type="number"
                name="duration"
                id="duration"
                placeholder="Duration"
              />
            </div>
            {/* END duration */}
            {/* START price */}
            <div className="column field">
              <label htmlFor="price">Price</label>
              <input
                value={data.price}
                onChange={this.handleNumberChange}
                type="number"
                name="price"
                id="price"
                placeholder="price"
              />
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
            <span className="ui button">Hide form</span>
          </div>
          {/* END buttons */}
        </div>
        {/* END ui grid */}
      </form>
    );
  }
}

export default FilmForm;
