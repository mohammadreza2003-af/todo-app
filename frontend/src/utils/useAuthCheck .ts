import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { jwtDecode } from "jwt-decode";
import useToken from "../hooks/useToken";

const useAuthCheck = () => {
  const navigate = useNavigate();

  const { token, removeToken } = useToken();
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const exp = decoded.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        if (exp <= currentTime) {
          removeToken();
          navigate("/login");
        }
      } catch (error) {
        removeToken();
        navigate("/login");
      }
    } else {
      removeToken();
      navigate("/login");
    }
  }, [navigate]);
};

export default useAuthCheck;
