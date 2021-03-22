import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteFilm } from "contexts/FilmContext";

const SelectButton = ({ film }) => {
  return (
    <Link to={`/films/edit/${film._id}`} className="ui green basic button">
      <i className="ui icon edit" />
    </Link>
  );
};

const DeleteButton = ({ film }) => {
  const deleteFilm = useDeleteFilm();
  return (
    <span onClick={() => deleteFilm(film)} className="ui red basic button">
      <i className="ui icon check" /> YES
    </span>
  );
};

const FilmCardButtons = ({ film }) => {
  const [show, setShow] = useState(false);

  const showConfirm = () => setShow(true);
  const hideConfirm = () => setShow(false);

  const confirmButtons = (
    <div className="extra content">
      <div className="ui two buttons">
        <DeleteButton film={film} />
        <span onClick={hideConfirm} className="ui grey basic button">
          <i className="ui icon close" /> NO
        </span>
      </div>
    </div>
  );

  const buttons = (
    <div data-testid="admin-buttons" className="extra content">
      <div className="ui two buttons">
        <SelectButton film={film} />

        <span onClick={showConfirm} className="ui red basic button">
          <i className="ui icon trash"></i>
        </span>
      </div>
    </div>
  );

  return show ? confirmButtons : buttons;
};

export default FilmCardButtons;
