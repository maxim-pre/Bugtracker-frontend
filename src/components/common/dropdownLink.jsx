const DropDownLink = ({ items, onChange, className, label }) => {
  return (
    <div className="dropdown">
      <li
        className={className}
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {label}
      </li>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {items.map((item) => (
          <a className="dropdown-item" onClick={() => onChange(item)}>
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default DropDownLink;
