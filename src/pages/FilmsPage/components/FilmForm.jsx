import React, { Component } from "react";
import { genres, tags as tagsList } from "data";

class FilmForm extends Component {
  state = {
    tags: [],
    genre: "",
    sel: "",
    multipleSelect: [],
  };

  handleTagsChange = () => {};

  handleGenreChange = () => {};

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
              <div className="field">
                <div className="ui checkbox field">
                  <input type="checkbox" id="tag1" />
                  <label for="tag1">Tag 1</label>
                </div>
              </div>
              {/* ====== */}
            </div>
          </div>
          {/*  ==============================   genre ================  */}
          <div className="four wide column">
            <div className="grouped fields">
              <label>Genres</label>
              {/* ====== */}
              <div className="ui radio checkbox field">
                <input type="radio" name="example2" checked="checked" />
                <label>Genre 1</label>
              </div>
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
