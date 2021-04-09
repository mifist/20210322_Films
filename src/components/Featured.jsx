import { useToggleFeatured } from "contexts/FilmContext";
import PropTypes from "prop-types";

const Featured = ({ film }) => {
  const toggle = useToggleFeatured();

  const cls = film.featured ? "yellow" : "empty";

  return (
    <span
      data-testid="featured-span"
      onClick={() => toggle(film._id)}
      className="ui right corner label"
    >
      <i data-testid="featured-icon" className={`star icon ${cls}`}></i>
    </span>
  );
};

Featured.propTypes = {
  film: PropTypes.object.isRequired,
};

export default Featured;
