import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div>
        <Link to="/">
          <h1>Home</h1>
        </Link>
      </div>
      <div>
        <Link to="/add">
          <h1>Add Employee</h1>
        </Link>
      </div>
    </div>
  );
}
