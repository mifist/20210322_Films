import { useState, useEffect } from "react";
import _find from "lodash/find";
import { Link, useParams, useHistory, Redirect } from "react-router-dom";
import UploadImage from "components/UploadImage";
import FormMessage from "components/FormMessage";
import setFormObj from "components/FormUtils";
import { useSaveFilm, useEditFilm } from "hooks/films";
import { useUserState } from "contexts/UserContext";

const initialData = {
  _id: null,
  title: "",
  img: "",
  description: "",
  director: "",
  duration: "",
  price: "",
  featured: false,
};

const FilmForm = () => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const user = useUserState();
  const isAdmin = user.token && user.role === "admin";

  const history = useHistory();
  const { _id } = useParams();
  const film = useEditFilm(_id);

  useEffect(() => {
    if (film._id && film._id !== data._id) {
      setData(film);
    }
    if (!film._id && data._id) {
      setData(initialData);
    }
  }, [_id, data._id, film]);

  const updatePhoto = (img) => {
    setData((data) => ({ ...data, img }));
    setErrors((errors) => ({ ...errors, img: "" }));
  };

  const validate = (data) => {
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
  };

  const mutation = useSaveFilm(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(data);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      mutation.mutate(data);
      history.push("/films");
    }
  };

  if (!isAdmin) {
    return <Redirect to="/films" />;
  }

  return (
    <form onSubmit={handleSubmit} className="ui form">
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
                onChange={setFormObj(data, setData)}
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
                onChange={setFormObj(data, setData)}
                name="img"
                id="img"
              />
              {errors.img && <FormMessage>{errors.img}</FormMessage>}
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
                onChange={setFormObj(data, setData)}
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
            <UploadImage img={data.img} updatePhoto={updatePhoto} />
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
              onChange={setFormObj(data, setData)}
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
              onChange={setFormObj(data, setData)}
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
              onChange={setFormObj(data, setData)}
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
            onChange={setFormObj(data, setData)}
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
          <Link to="/films" className="ui button">
            Hide form
          </Link>
        </div>
        {/* END buttons */}
      </div>
      {/* END ui grid */}
    </form>
  );
};

export default FilmForm;
