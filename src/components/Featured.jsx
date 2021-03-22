import { useContext } from "react";
import FilmContext from "contexts/FilmContext";
import PropTypes from "prop-types";

const Featured = ({ film }) => {
  const cls = film.featured ? "yellow" : "empty";
  const { toggleFeatured } = useContext(FilmContext);

  return (
    <span
      onClick={() => toggleFeatured(film._id)}
      className="ui right corner label"
    >
      <i className={`star icon ${cls}`}></i>
    </span>
  );
};

Featured.propTypes = {
  film: PropTypes.object.isRequired,
};

export default Featured;
