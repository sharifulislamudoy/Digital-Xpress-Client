import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackGround from "../assets/Auth-Image.png";
import Image from "../assets/DigitalXpress3.png";
import { FaEye, FaEyeSlash, FaUserCircle, FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Components/Contexts/AuthProvider";

const AuthForm = () => {
  const {
    registerWithEmail,
    loginWithEmail,
    loginWithGoogle,
    loginWithGithub,
    loading,
  } = useContext(AuthContext);

  // Add form states
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
        toast.success("Login successful!");
      } else {
        await registerWithEmail(email, password, name, imageUrl, phone);
        toast.success("Registration successful!");
      }
    } catch (err) {
      toast.error(err.message || "Authentication failed");
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
    } catch (err) {
      toast.error(err.message || "Google login failed");
    }
  };

  const handleGithubAuth = async () => {
    try {
      await loginWithGithub();
      toast.success("Logged in with GitHub!");
    } catch (err) {
      toast.error(err.message || "GitHub login failed");
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center px-4 py-5 md:bg-cover md:bg-center"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          background: "#000000",
          color: "#ffffff",
          border: "1px solid #f97316",
          borderRadius: "0.5rem",
        }}
        progressStyle={{
          background: "#fdba74",
        }}
      />
      <div className="relative w-11/12 mx-auto rounded-3xl shadow-2xl border border-white/20 bg-white/5 backdrop-blur-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 h-[560px]">
          {/* LEFT SIDE INFO (for login) */}
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

                  {/* Profile Image Display */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-orange-400 flex items-center justify-center overflow-hidden">
                      {imageUrl ? (
                        <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <FaUserCircle className="text-white text-5xl" />
                      )}
                    </div>
                  </div>

                  <form onSubmit={handleEmailAuth} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                      required={!isLogin}
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                      required
                    />

                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                    />

                    <input
                      type="text"
                      placeholder="Profile Image URL (optional)"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                    />

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 pr-10"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="btn bg-orange-500 hover:bg-orange-600 text-white font-semibold w-full transition duration-200 shadow-lg shadow-orange-500/30"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Register"}
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

          {/* RIGHT SIDE LOGIN */}
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

                  <form onSubmit={handleEmailAuth} className="space-y-5">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                      required
                    />
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 pr-10"
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="mt-5 btn bg-orange-500 hover:bg-orange-600 text-white font-semibold w-full transition duration-200 shadow-lg shadow-orange-500/30"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Login"}
                    </button>
                  </form>

                  <div className="flex justify-center space-x-4 mt-4">
                    <button
                      onClick={handleGoogleAuth}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                      disabled={loading}
                    >
                      <FaGoogle className="text-xl" />
                    </button>
                    <button
                      onClick={handleGithubAuth}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
                      disabled={loading}
                    >
                      <FaGithub className="text-xl" />
                    </button>
                  </div>


                  <p className="text-sm mt-4 text-center text-white/80">
                    Don't have an account?{" "}
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
