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

  return (
    <div>
      {/* Link to Login */}
      <div>
        <p>
          <Link to="/login">Already a member?</Link>
        </p>
      </div>

      {/* Signup */}
      <div>
        <h1>Sign up</h1>
      </div>

      {/* Username input */}
      <form onSubmit={handleSignup}>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>

        {/* Email input */}
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>

        {/* Password input */}
        <div>
          <label>Password</label>
          <input
            type="Password"
            name="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {/* Set Role */}
        <div>
          <label>I am a...</label>
          <select value={role} onChange={handleRoleChange}>
            <option value="USER">Tattoo enthusiast</option>
            <option value="ARTIST">Artist</option>
          </select>
        </div>

        {errorMessage && <p>{errorMessage}</p>}

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
