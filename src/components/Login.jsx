import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle } from "lucide-react";
import { useState } from "react";

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
        className="bg-sky-900/40 backdrop-blur-xl rounded-2xl border border-white/20 
                   shadow-2xl p-8 w-full max-w-md ring-1 ring-white/30"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-sky-100/70">Sign in to access your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-sky-100">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-10 rounded-xl bg-white/10 border border-white/20 
                         placeholder-white/40 text-white focus:outline-none focus:ring-2 
                         focus:ring-sky-400/50 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-sky-500" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-sky-100">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-10 rounded-xl bg-white/10 border border-white/20 
                         placeholder-white/40 text-white focus:outline-none focus:ring-2 
                         focus:ring-sky-400/50 focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
              />
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-sky-500" />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-red-300 bg-red-500/20 p-3 rounded-xl"
            >
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-white font-medium
                     rounded-xl transition-all duration-300 shadow-lg
                     hover:shadow-sky-500/25"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}