import PropTypes from "prop-types";
import FilmCard from "pages/FilmsPage/components/FilmCard";
import Message from "components/Message";

const FilmsList = ({ films }) => {
  return (
    <div className="ui four cards">
      {films.length === 0 ? (
        <Message type="star" color="orange">
          No films in our base yet
        </Message>
      ) : (
        films.map((film) => <FilmCard key={film._id} film={film} />)
      )}
    </div>
  );
};

FilmsList.defaultProps = {
  films: [],
};

FilmsList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FilmsList;
