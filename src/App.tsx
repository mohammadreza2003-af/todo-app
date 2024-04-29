import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AuthPage from "./components/AuthPage";
import { useGContext } from "./contexts/globalContext";
function App() {
  const { authState } = useGContext();

  return (
    <Router>
      <Routes>
        <Route index path={"/"} element={authState ? <Home /> : <AuthPage />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
