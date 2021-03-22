import PropTypes from "prop-types";

const Message = ({ children, type, color }) => {
  return (
    <div className={`ui icon   message ${color}`}>
      <i className={`icon ${type}`}></i>
      <div className="content">
        <div className="header">{children}</div>
      </div>
    </div>
  );
};

Message.defaultProps = {
  color: "blue",
  type: "bell",
};

Message.propTypes = {
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Message;
