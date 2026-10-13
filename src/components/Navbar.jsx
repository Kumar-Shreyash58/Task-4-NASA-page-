import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="Navbar">
      <Link to="/" className="logo"><span>✦</span> ANDROMEDA</Link>
      <span className="nav-label">NASA IMAGE PEDIA</span>
    </header>
  );
}
