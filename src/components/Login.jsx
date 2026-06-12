import React, { useState } from "react";
import authService from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password show/hide toggle ke liye
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authService.login(email, password);
      console.log("✓ Login Successful:", data);
      
      // Token state sync ke liye hard redirect
      window.location.href = "/dashboard";
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Server connection failed. Try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#030712] text-slate-800">
      
      {/* ── TOP BRAND LOGO AREA ── */}
      <div className="mb-6 flex flex-col items-center text-center">
        {/* Tumhaara naya crisp visual logo */}
        <img 
          src="/logo.svg" 
          alt="PrepTrack Logo" 
          className="h-12 w-auto object-contain"
        />
        {/* Custom Tagline Requested by User */}
        <p className="mt-2 text-sm font-medium text-slate-500 tracking-wide">
          Track your DSA journey in a smarter way
        </p>
      </div>

      {/* ── CENTRAL WHITE LOGIN CARD ── */}
      <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        
        {/* Local Header */}
        <div className="mb-6 text-left">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">Sign in</h3>
          <p className="mt-1 text-sm text-slate-400">Enter your Email & Password to login</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 rounded-xl border border-rose-100 bg-rose-50 p-3 text-center text-sm font-medium text-rose-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Email/Username Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-600">Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-base text-slate-900 placeholder-slate-400 outline-none transition duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5"
              required
            />
          </div>

          {/* Password Input with Show/Hide (Exactly like Image) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-600">Password</label>
              <a href="#forgot" className="text-xs font-semibold text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-4 pr-14 py-3 text-base text-slate-900 placeholder-slate-400 outline-none transition duration-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-indigo-600 transition"
              >
                {showPassword ? "hide" : "show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl bg-indigo-600 py-3.5 text-base font-semibold text-white shadow-sm transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 ${
              loading ? "cursor-not-allowed bg-indigo-400" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-indigo-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;