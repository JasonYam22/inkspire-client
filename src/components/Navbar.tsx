import { useAuth } from "../context/auth.context";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="pointer-events-none sticky top-0 z-30 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Main navigation"
        className="pointer-events-auto mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 rounded-2xl border border-white/15 bg-zinc-950/85 px-3 py-2 backdrop-blur-lg md:grid-cols-[1fr_auto_1fr] md:px-5"
      >
        <Link
          to="/"
          className="justify-self-start text-xl font-bold tracking-tight"
        >
          Inkspire
        </Link>

        {isLoggedIn && (
          <>
            <div className="col-span-2 row-start-2 flex justify-evenly gap-1 border-t border-white/10 pt-1 md:col-span-1 md:col-start-2 md:row-start-1 md:gap-4 md:border-0 md:pt-0">
              <NavLink to="/ideas" className="nav-link">
                Personal
              </NavLink>
              <NavLink to="/explore" className="nav-link">
                Explore
              </NavLink>
              <NavLink to="/collection" className="nav-link">
                Collection
              </NavLink>
            </div>
            <div className="col-start-2 row-start-1 flex items-center gap-2 justify-self-end md:col-start-3">
              <NavLink to="/users/user" className="nav-link">
                Profile
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="button-secondary"
              >
                Log out
              </button>
            </div>
          </>
        )}

        {!isLoggedIn && (
          <div className="col-start-2 flex items-center gap-2 justify-self-end md:col-start-3">
            <NavLink to="/login" className="nav-link">
              Log in
            </NavLink>
            <Link to="/signup" className="button-primary">
              Sign up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
