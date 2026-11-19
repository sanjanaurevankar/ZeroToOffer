import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <h2>⛓️ZeroToOffer</h2>
      <div className="navbar-right">
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;