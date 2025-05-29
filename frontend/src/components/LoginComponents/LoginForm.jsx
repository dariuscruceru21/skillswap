import { useUserStore } from "../../stores/useUserStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const login = useUserStore((state) => state.login);
  const loading = useUserStore((state) => state.loading);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Call Zustand signin
      await login(email, password);
      navigate("/homepage");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg input-field focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <a
            href="/forgot-password"
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </a>
        </div>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg input-field focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="remember"
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-700">Remember me</span>
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full gradient-bg text-white py-3 rounded-lg hover:opacity-90 font-medium text-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>
    </form>
  );
}
