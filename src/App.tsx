import { Routes, Route } from "react-router-dom";
import "./index.css";

//pages
import Home from "./pages/private/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Ideas from "./pages/private/Ideas";
import IdeaDetails from "./pages/private/IdeaDetails";
import Profile from "./pages/private/Profile";
import Error from "./pages/Error";

//components
import Navbar from "./components/Navbar";
import Private from "./components/Private";
import { AuthWrapper } from "./context/auth.context";
/* import IdeaCard from "./components/IdeaCard" */

function App() {
  return (
    <div>
      <AuthWrapper>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/ideas"
            element={
              <Private>
                <Ideas />
              </Private>
            }
          />
          <Route
            path="/ideas/:ideaid"
            element={
              <Private>
                <IdeaDetails />
              </Private>
            }
          />
          <Route
            path="/profile"
            element={
              <Private>
                <Profile />
              </Private>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </AuthWrapper>
    </div>
  );
}

export default App;
