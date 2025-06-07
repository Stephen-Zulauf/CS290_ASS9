import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="app-nav">
      <Link to="/">Home</Link>
      <Link to="/Create">Create</Link>
    </nav>
  );
}

export default Navigation;
