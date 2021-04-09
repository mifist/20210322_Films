import PropTypes from "prop-types";
import { useToggleFeatured } from "hooks/films";

const Featured = ({ film }) => {
  const mutation = useToggleFeatured();

  const cls = film.featured ? "yellow" : "empty";

  return (
    <span
      data-testid="featured-span"
      onClick={() => mutation.mutate({ ...film, featured: !film.featured })}
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
