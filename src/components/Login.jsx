import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Lock, AlertCircle } from "lucide-react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "codeninjastorrance@gmail.com" && password === "Codeninjas1!") {
      onLogin(true);
      setError("");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 
                   shadow-xl p-6 w-full max-w-md ring-1 ring-white/30"
      >
        <h1 className="text-3xl font-semibold text-sky-700 mb-6">
          Makecode Arcade Dashboard
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-sky-700">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg bg-white/10 border border-white/20 
                         placeholder-white/50 text-sky-700 focus:outline-none focus:ring-2 
                         focus:ring-white/30 transition-all duration-300"
                placeholder="Enter your email"
              />
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-sky-700/50" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-sky-700">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg bg-white/10 border border-white/20 
                         placeholder-white/50 text-sky-700 focus:outline-none focus:ring-2 
                         focus:ring-white/30 transition-all duration-300"
                placeholder="Enter your password"
              />
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-sky-700/50" />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg"
            >
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-sky-700/20 hover:bg-sky-700/30 text-sky-700 
                     rounded-lg transition-all duration-300 font-medium
                     ring-1 ring-sky-700/30 hover:ring-sky-700/50"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}