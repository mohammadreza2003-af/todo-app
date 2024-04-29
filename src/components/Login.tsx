import { useState } from "react";
import httpClient from "../utils/httpClient";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginUser = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await httpClient.post("/api/login", {
        email,
        password,
      });
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      navigate("/home");
      console.log(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log("Not authenticated");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-pink-400 dark:text-blue-500">
          Login
        </h2>
        <form onSubmit={loginUser}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
