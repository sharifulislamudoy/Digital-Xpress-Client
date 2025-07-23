import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackGround from "../assets/Auth-Image.png";
import Image from "../assets/DigitalXpress3.png";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="h-screen flex items-center justify-center px-4 py-10 md:bg-cover md:bg-center"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
      <div className="relative w-11/12 mx-auto rounded-3xl shadow-2xl border border-white/20 bg-white/5 backdrop-blur-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 h-[500px]">

          {/* LEFT SIDE INFO (Only visible in md+) */}
          {isLogin ? (
            <div className="hidden md:flex items-center justify-center p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key="info-left"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="text-center bg-black/40 text-white space-y-6 p-8 rounded-xl w-full max-w-sm"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center">
                      <img src={Image} className="h-10 w-auto" alt="Logo" />
                      <span className="text-white text-3xl -ml-2">
                        igital <i className="text-orange-400">Xpress</i>
                      </span>
                    </div>
                    <div className="w-24 h-1 bg-orange-400 rounded"></div>
                  </div>

                  <p className="text-sm sm:text-base text-left leading-relaxed">
                    Digital Xpress is your trusted destination for smartphones, gadgets, and home appliances—all at your fingertips.
                  </p>

                  <p className="text-xs sm:text-sm text-orange-300 opacity-90">
                    Your account is just a step away.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center justify-center p-8 bg-black/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-sm"
                >
                  <h2 className="text-3xl font-bold text-white mb-6">Sign Up</h2>
                  <form className="space-y-5">
                    <input
                      type="text"
                      placeholder="Name"
                      className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                      required
                    />
                    <button className="btn bg-orange-500 hover:bg-orange-600 text-white font-semibold w-full transition duration-200 shadow-lg shadow-orange-500/30">
                      Register
                    </button>
                  </form>
                  <p className="text-sm mt-4 text-center text-white/80">
                    Already have an account?{" "}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="text-orange-400 font-medium hover:underline"
                    >
                      Login
                    </button>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* RIGHT SIDE */}
          {isLogin ? (
            <div className="flex items-center justify-center p-8 bg-black/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-sm"
                >
                  <h2 className="text-3xl font-bold text-white mb-6">Login</h2>
                  <form className="space-y-5">
                    <input
                      type="email"
                      placeholder="Email"
                      className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                      required
                    />
                    <button className="btn bg-orange-500 hover:bg-orange-600 text-white font-semibold w-full transition duration-200 shadow-lg shadow-orange-500/30">
                      Login
                    </button>
                  </form>
                  <p className="text-sm mt-4 text-center text-white/80">
                    Don’t have an account?{" "}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-orange-400 font-medium hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden md:flex items-center justify-center p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key="info-right"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4 }}
                  className="text-center bg-black/40 text-white space-y-6 p-8 rounded-xl w-full max-w-sm"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center">
                      <img src={Image} className="h-10 w-auto" alt="Logo" />
                      <span className="text-white text-3xl -ml-2">
                        igital <i className="text-orange-400">Xpress</i>
                      </span>
                    </div>
                    <div className="w-24 h-1 bg-orange-400 rounded"></div>
                  </div>

                  <p className="text-sm sm:text-base text-left leading-relaxed">
                    Digital Xpress is your trusted destination for smartphones, gadgets, and home appliances—all at your fingertips.
                  </p>

                  <p className="text-xs sm:text-sm text-orange-300 opacity-90">
                    Your account is just a step away.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AuthForm;
