import { Link } from "react-router-dom";

const NavItem = ({ label, url, isactive, className }) => {
  return (
    <li className={!isactive ? "nav-item" : "nav-item active"}>
      <Link className="nav-link" to={url} aria-expanded="true">
        <span className={className}>{label}</span>
      </Link>
    </li>
  );
};

NavItem.defaultProps = {
  className: "",
};

export default NavItem;
