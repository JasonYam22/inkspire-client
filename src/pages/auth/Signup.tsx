import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import service from "../../services/index.services";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setRole(e.target.value);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      email,
      username,
      password,
      role
    };

    try {
      // ... contact backend to register the user
      // await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`, body)
      await service.post("/auth/signup", body);
      console.log("user created");

      navigate("/login");
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
      <h1 className="text-2xl font-bold text-zinc-100 mb-1">Sign up</h1>
      <p className="text-sm text-zinc-400 mb-5">Start saving your tattoo ideas.</p>

      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-zinc-400">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
            className={inputStyle}
          />
        </div>

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

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-zinc-400">I am a...</label>
          <select value={role} onChange={handleRoleChange} className={inputStyle}>
            <option value="USER">Tattoo enthusiast</option>
            <option value="ARTIST">Artist</option>
          </select>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-400 font-semibold">{errorMessage}</p>
        )}

        <button
          type="submit"
          className="mt-1 py-2 text-sm font-semibold rounded-xl bg-zinc-200 text-zinc-900 hover:bg-white transition-all"
        >
          Sign up
        </button>
      </form>

      <p className="text-sm text-zinc-400 mt-4 text-center">
        <Link to="/login" className="text-zinc-200 hover:underline">
          Already a member?
        </Link>
      </p>
    </div>
  </div>
);
}

export default Signup;
