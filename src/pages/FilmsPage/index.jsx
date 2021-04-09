import { useLocation, Route } from "react-router-dom";
import FilmsList from "pages/FilmsPage/components/FilmsList";
import FilmForm from "pages/FilmsPage/components/FilmForm";

const FilmsPage = () => {
  const location = useLocation();
  const cols = location.pathname === "/films" ? "sixteen" : "ten";

  return (
    <div className="ui stackable grid">
      <div className="six wide column">
        <Route path="/films/new">
          <FilmForm />
        </Route>

        <Route path="/films/edit/:_id">
          <FilmForm />
        </Route>
      </div>

      <div className={`${cols} wide column`}>
        <FilmsList />
      </div>
    </div>
  );
};

export default FilmsPage;
