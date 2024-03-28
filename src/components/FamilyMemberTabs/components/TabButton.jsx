import PropTypes from "prop-types";

const TabButton = ({ children }) => {
  return (
    <button className="py-2 px-4 bg-accent text-white rounded-md font-semibold">
      {children}
    </button>
  );
};

TabButton.propTypes = {
  children: PropTypes.node,
};

export default TabButton;
