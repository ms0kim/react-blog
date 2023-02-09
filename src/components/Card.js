import PropTypes from 'prop-types';

const Card = ({ title, onClick, children }) => {
  return (
    <div
      id="list"
      onClick={onClick}
      //onClick은 컴포넌트에서 사용할 수 없음
    >
      <div className="listText">
        <div>{title}</div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
  onClick: PropTypes.func
};

Card.defaultProps = {
  children: null,
  onClick: () => {},
};

export default Card;