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

  return (
    <div>
      {/* Link to signup */}
      <div>
        <p>
          <Link to="/signup">New here?</Link>
        </p>
      </div>

      {/* Login */}
      <div>
        <h1>Login</h1>
      </div>

      {/* Email input */}
      <form onSubmit={handleLogin}>
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

        {errorMessage && (
          <p className="text-sm text-[#FF5A36] font-semibold">{errorMessage}</p>
        )}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
