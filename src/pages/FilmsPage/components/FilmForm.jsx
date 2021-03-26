import React, { Component } from "react";
import { genres, tags as tagsList } from "data";

class FilmForm extends Component {
  state = {
    tags: [],
    genre: "",
    sel: "",
    multipleSelect: [],
  };

  handleTagsChange = (id) =>
    this.setState(({ tags }) => ({
      tags: tags.includes(id) ? tags.filter((x) => x !== id) : [...tags, id],
    }));

  handleGenreChange = (genre) => this.setState({ genre });

  handleSelectChange = () => {};

  handleMultiSelect = () => {};

  render() {
    const { tags, genre, sel, multipleSelect } = this.state;
    return (
      <form className="ui form">
        <div className="ui grid">
          <div className="four wide column">
            {/*  =========================  tags  ================  */}
            <div class="grouped fields">
              <label>Tags</label>
              {/* ====== */}
              {tagsList.map((tag) => (
                <div key={tag._id} className="field">
                  <div className="ui checkbox field">
                    <input
                      type="checkbox"
                      id={`tag-${tag._id}`}
                      checked={tags.includes(tag._id)}
                      onChange={() => this.handleTagsChange(tag._id)}
                    />
                    <label htmlFor={`tag-${tag._id}`}>{tag.title}</label>
                  </div>
                </div>
              ))}
              {/* ====== */}
            </div>
          </div>
          {/*  ==============================   genre ================  */}
          <div className="four wide column">
            <div className="grouped fields">
              <label>Genres</label>
              {/* ====== */}
              {genres.map((gen) => (
                <div key={gen._id} className="ui radio checkbox field">
                  <input
                    checked={genre === gen._id}
                    onChange={() => this.handleGenreChange(gen._id)}
                    type="radio"
                    id={`genre-${gen._id}`}
                    name="example2"
                  />
                  <label htmlFor={`genre-${gen._id}`}>{gen.title}</label>
                </div>
              ))}
              {/* ====== */}
            </div>
          </div>
          {/*  ==============================   sel ================  */}
          <div className="four wide column">
            <select className="ui dropdown">
              <option value="1111">tag 1</option>
            </select>
          </div>
          {/*  ==============================  multipleSelect ================  */}
          <div className="four wide column">
            <select multiple size="SIZE">
              <option value="1111">tag 1</option>
            </select>
          </div>
        </div>

        {/* ====================================================== */}
      </form>
    );
  }
}

export default FilmForm;
