import { Link } from "react-router-dom";

const NavItem = ({ label, url, isactive, className, icon }) => {
  return (
    <li className={!isactive ? "nav-item" : "nav-item active"}>
      <Link className="nav-link" to={url} aria-expanded="true">
        {icon}
        <span className={className}>{label}</span>
      </Link>
    </li>
  );
};

NavItem.defaultProps = {
  className: "",
};

export default NavItem;
