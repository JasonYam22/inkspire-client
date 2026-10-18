import { useContext, useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/index.services";

function Login() {
  const { setIsLoggedIn, setLoggedUserId, setLoggedUserRole } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams()
  const [errorMessage, setErrorMessage] = useState(null);

  const handleGoogleLogin = () => {
  window.location.href = `${import.meta.env.VITE_SERVER_URL}/api/auth/google?mode=login`;
};
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

  useEffect(() => {
    const token = searchParams.get("token")

    if (token) {
      localStorage.setItem("authToken", token)
      setIsLoggedIn(true)
      navigate("/", ({replace: true}))
    }
  }, [searchParams, navigate, setIsLoggedIn])

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
          Log in
        </button>

     <button
  type="button" onClick={handleGoogleLogin}
  className="mt-1 py-2 px-4 text-sm font-semibold rounded-xl bg-zinc-200 text-zinc-900 hover:bg-white transition-all flex items-center justify-center gap-2"
>
  
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
  Log in with Google
</button>
      </form>

      <p className="text-sm text-zinc-400 mt-4 text-center">
         <Link to="/forgot-password" className="text-zinc-200 hover:underline">
          Forgot password?
        </Link>
      </p>
       
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
