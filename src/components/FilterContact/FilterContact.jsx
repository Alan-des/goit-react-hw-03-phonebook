export const FilterContact = ({ value, onChange }) => (
  <div>
    <p>Find contacts by name</p>
    <input type="text" name="filter" value={value} onChange={onChange} />
  </div>
);
