const MultipleSelectInput = ({
  items,
  name,
  label,
  onChange,
  currentSelected,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        className="form-select"
        name={name}
        id={name}
        onChange={onChange}
        multiple
      >
        {items.map((item) => (
          <option
            value={item.value}
            selected={
              currentSelected && item.value in currentSelected ? true : false
            }
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultipleSelectInput;
