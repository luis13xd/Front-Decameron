import { Link } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">DECAMERON</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/" className="navbar-link">Inicio</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
