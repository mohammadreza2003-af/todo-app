import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import useToken from "./hooks/useToken";
import AuthPage from "./components/AuthPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer />
    </Router>
  );
}

export default App;
