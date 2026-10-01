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
   <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-zinc-950 border-b border-zinc-800/80 text-zinc-200 backdrop-blur-md bg-opacity-90">
    {/* Logo */}
    <Link 
      to="/" 
      className="text-xl font-black tracking-widest text-zinc-100 hover:text-white transition-colors uppercase"
    >
      INK<span className="text-zinc-500">SPIRE</span>
    </Link>

    {/* Navigation Links */}
    {isLoggedIn && (
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link 
          to="/ideas" 
          className="text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          Ideas
        </Link>
        <Link 
          to="/users/user" 
          className="text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          Profile
        </Link>
        <button 
          onClick={handleLogout}
          className="ml-2 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 hover:border-zinc-500 transition-all"
        >
          Logout
        </button>
      </div>
    )}

    {!isLoggedIn && (
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link 
          to="/login" 
          className="text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          Login
        </Link>
        <Link 
          to="/signup" 
          className="px-4 py-1.5 text-xs font-semibold rounded-full bg-zinc-100 text-zinc-950 hover:bg-zinc-300 transition-all"
        >
          Signup
        </Link>
      </div>
    )}
  </nav>
  );
}

export default Navbar;