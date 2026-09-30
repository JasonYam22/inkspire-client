import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">INKSPIRE</Link>

      {isLoggedIn && (
        <div>
          <Link to="/ideas">Ideas</Link>
          <Link to="/users/user">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {!isLoggedIn && (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;