import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/index.services";

function Login() {
  const { setIsLoggedIn, setLoggedUserId, setLoggedUserRole } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  // handle login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      email,
      password,
    };

    try {

      const response = await service.post("/auth/login", body);
      console.log(response);

      // store the token in localStorage
      localStorage.setItem("authToken", response.data.authToken);

      // update the auth states correctly
      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload.id);
      setLoggedUserRole(response.data.payload.role);

      navigate("/");
    } catch (error: any) {
      console.log(error);
      if (error.response?.status === 400) {
        setErrorMessage(
          error.response?.data?.errorMessage || "Something went wrong",
        );
      } else {
        navigate("/error");
      }
    }
  };

  const inputStyle =
  "w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-400";

return (
  <div className="min-h-[85vh] flex items-center justify-center p-6">
    <div className="w-full max-w-sm bg-zinc-900/70 backdrop-blur-md border border-zinc-700 rounded-2xl p-6 shadow-lg">
      <h1 className="text-2xl font-bold text-zinc-100 mb-1">Login</h1>
      <p className="text-sm text-zinc-400 mb-5">Welcome back.</p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-zinc-400">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            className={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-zinc-400">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className={inputStyle}
          />
        </div>

        {errorMessage && (
          <p className="text-sm text-red-400 font-semibold">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="mt-1 py-2 text-sm font-semibold rounded-xl bg-zinc-200 text-zinc-900 hover:bg-white transition-all"
        >
          Login
        </button>
      </form>

      <p className="text-sm text-zinc-400 mt-4 text-center">
        <Link to="/signup" className="text-zinc-200 hover:underline">
          New here?
        </Link>
      </p>
    </div>
  </div>
);
}

export default Login;
