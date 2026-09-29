import { Routes, Route } from "react-router-dom";
import "./index.css"

//pages
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Ideas from "./pages/Ideas";
import IdeaDetails from "./pages/IdeaDetails"
import Profile from "./pages/Profile"
import Error from "./pages/Error"

//components
import Navbar from "./components/Navbar"
/* import IdeaCard from "./components/IdeaCard" */

function App() {


  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ideas" element={<Ideas />} />
        <Route path="/ideas/:ideaid" element={<IdeaDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
  
    </div>
  )
}

export default App
