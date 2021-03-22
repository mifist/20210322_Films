import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Featured from "components/Featured";
import FilmCardButtons from "pages/FilmsPage/components/FilmCardButtons";
import { useUserState } from "contexts/UserContext";

const FilmCard = ({ film }) => {
  const user = useUserState();

  const actionUser = (
    <div className="ui two buttons">
      <span className="ui green basic button">Films</span>
    </div>
  );

  return (
    <div className="ui card">
      <Featured film={film} />
      <div className="image">
        <span className="ui green label ribbon">$ {film.price}</span>
        <img src={film.img} alt={film.title} />
      </div>
      <div className="content">
        <Link to={`/film/${film._id}`} className="header">
          {film.title}
        </Link>
        <div className="meta">
          <i className="icon users"></i> {film.director}
          <span className="right floated">
            <i className="icon wait right"></i> {film.duration} min
          </span>
        </div>
      </div>

      {user.token && user.role === "admin" && <FilmCardButtons film={film} />}
      {user.token && user.role === "user" && actionUser}
    </div>
  );
};

FilmCard.propTypes = {
  film: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    featured: PropTypes.bool,
  }),
};

export default memo(FilmCard);
