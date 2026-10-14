import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo"><span>✦</span> COSMOS</Link>
      <span className="nav-label">NASA IMAGE EXPLORER</span>
    </header>
  );
}