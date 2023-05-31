import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ handleFilter, filter }) => {
  return (
    <div className={css.filter}>
      <h2 className={css.title}>Find contacts by name</h2>
      <input
        type="text"
        name="filter"
        className={css.input}
        onChange={handleFilter}
        value={filter}
      />
    </div>
  );
};

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
