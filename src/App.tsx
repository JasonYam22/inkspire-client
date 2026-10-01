import { Routes, Route } from "react-router-dom";
import "./index.css";
import background from "./assets/background.png";

//pages
import Home from "./pages/private/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Ideas from "./pages/private/Ideas";
import NewIdea from "./pages/private/NewIdea";
import IdeaDetails from "./pages/private/IdeaDetails";
import EditIdea from "./pages/private/EditIdea";
import Explore from "./pages/private/Explore";
import ExploreDetails from "./pages/private/ExploreDetails";
import Collection from "./pages/private/Collection";
import Profile from "./pages/private/Profile";
import Error from "./pages/Error";

//components
import Navbar from "./components/Navbar";
import Private from "./components/Private";
import { AuthWrapper } from "./context/auth.context";

function App() {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 bg-cover bg-center blur-sm scale-110 -z-10 brightness-35"
        style={{ backgroundImage: `url(${background})` }}
      />
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
  path="/collection"
  element={
    <Private>
      <Collection />
    </Private>
  }
/>
          <Route
            path="/explore/:ideaId"
            element={
              <Private>
                <ExploreDetails />
              </Private>
            }
          />
          <Route
            path="/ideas/new"
            element={
              <Private>
                <NewIdea />
              </Private>
            }
          />
          <Route path="/ideas/:ideaId/edit" element={<EditIdea />} />
          <Route
            path="/ideas/:ideaId"
            element={
              <Private>
                <IdeaDetails />
              </Private>
            }
          />
          <Route
            path="/explore"
            element={
              <Private>
                <Explore />
              </Private>
            }
          />
          <Route
            path="/users/user"
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
