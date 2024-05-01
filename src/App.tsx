import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import useToken from "./hooks/useToken";
import AuthPage from "./components/AuthPage";
function App() {
  const { token } = useToken();
  const isAuthenticated = token && token !== "" && token !== undefined;
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={isAuthenticated ? <Home /> : <AuthPage />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/home"} element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
