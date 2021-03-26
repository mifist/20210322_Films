import { useContext } from "react";
import FilmContext from "contexts/FilmContext";

const FilmCardButtons = ({ film }) => {
  const { selectFilmForEdit } = useContext(FilmContext);
  const selectFilm = () => selectFilmForEdit(film);

  return (
    <div className="extra content">
      <div className="ui two buttons">
        <span onClick={selectFilm} className="ui green basic button">
          <i className="ui icon edit"></i>
        </span>
        <span className="ui red basic button">
          <i className="ui icon trash"></i>
        </span>
      </div>
    </div>
  );
};

export default FilmCardButtons;
