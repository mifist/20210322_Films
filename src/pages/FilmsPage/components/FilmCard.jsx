const FilmCard = ({ films }) => {
  return (
    <div className="ui card">
      <span className="ui right corner label">
        <i className="empty star icon"></i>
      </span>
      <div className="image">
        <span className="ui green label ribbon">$ 220 </span>
        <img src="img/seeker.jpg" alt="" />
      </div>
      <div className="content">
        <span className="header">Legend of the seeker</span>
        <div className="meta">
          <i className="icon users"></i> Film Director
          <span className="right floated">
            <i className="icon wait right"></i> 180 min
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

export default FilmCard;
