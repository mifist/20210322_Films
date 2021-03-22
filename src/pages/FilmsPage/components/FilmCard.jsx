import PropTypes from "prop-types";

const FilmCard = ({ film }) => {
  return (
    <div className="ui card">
      <span className="ui right corner label">
        <i className="empty star icon"></i>
      </span>
      <div className="image">
        <span className="ui green label ribbon">$ {film.price}</span>
        <img src={film.img} alt={film.title} />
      </div>
      <div className="content">
        <span className="header">{film.title}</span>
        <div className="meta">
          <i className="icon users"></i> {film.director}
          <span className="right floated">
            <i className="icon wait right"></i> {film.duration} min
          </span>
        </div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          <span className="ui green basic button">
            <i className="ui icon edit"></i>
          </span>
          <span className="ui red basic button">
            <i className="ui icon trash"></i>
          </span>
        </div>
      </div>
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

export default FilmCard;
