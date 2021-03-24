import React, { Component } from "react";

const initialData = {
  title: "",
};

class FilmForm extends Component {
  state = {
    data: initialData,
  };

  render() {
    return (
      <form className="ui form">
        <div className="ui grid mb-3">
          {/*  START two columns */}
          <div className="two column row">
            {/*  START left column */}
            <div className="ten wide column">
              {/* START title */}
              <div className="field">
                <label htmlFor="title">Film title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="film title"
                />
              </div>
              {/* END title */}
            </div>
            {/*  END left column */}
          </div>
          {/*  END two columns */}

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
