import PropTypes from 'prop-types';
import './progressBar.css';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
  };

export default ProgressBar;