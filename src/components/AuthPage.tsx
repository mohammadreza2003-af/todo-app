import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-pink-400 dark:text-blue-500 font-bold text-center mb-6">
          Welcome! Please Sign Up or Login
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          To access your account, choose one of the options below.
        </p>
        <div className="flex justify-center gap-6">
          <button
            onClick={handleSignup}
            className="w-1/2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
          <button
            onClick={handleLogin}
            className="w-1/2 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
