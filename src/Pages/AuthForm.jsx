import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackGround from "../assets/Auth-Image.png";
import Image from "../assets/DigitalXpress3.png";
import { FaEye, FaEyeSlash, FaUserCircle } from "react-icons/fa";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState("email"); // 'email' or 'phone'
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="h-screen flex items-center justify-center px-4 py-10 md:bg-cover md:bg-center"
      style={{ backgroundImage: `url(${BackGround})` }}
    >
      <div className="relative w-11/12 mx-auto rounded-3xl shadow-2xl border border-white/20 bg-white/5 backdrop-blur-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 h-[550px]">

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

                  {/* Profile Image Upload */}
                  <div className="flex flex-col items-center mb-4">
                    <div
                      className="w-20 h-20 rounded-full bg-white/10 border-2 border-orange-400 flex items-center justify-center cursor-pointer overflow-hidden"
                      onClick={triggerFileInput}
                    >
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <FaUserCircle className="text-white text-5xl" />
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="text-xs text-orange-400 mt-2 hover:underline"
                    >
                      {profileImage ? "Change Photo" : "Upload Photo"}
                    </button>
                  </div>

                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                      required
                    />

                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className={`flex-1 py-2 px-3 rounded-md font-medium text-sm ${authMethod === 'email' ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/70'}`}
                        onClick={() => setAuthMethod('email')}
                      >
                        Email
                      </button>
                      <button
                        type="button"
                        className={`flex-1 py-2 px-3 rounded-md font-medium text-sm ${authMethod === 'phone' ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/70'}`}
                        onClick={() => setAuthMethod('phone')}
                      >
                        Phone
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {authMethod === 'email' ? (
                        <motion.div
                          key="signup-email"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <input
                            type="email"
                            placeholder="Email"
                            className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                            required
                          />
                          <div className="relative mt-4">
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
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
                        </motion.div>
                      ) : (
                        <motion.div
                          key="signup-phone"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white/70">
                              +880
                            </div>
                            <input
                              type="tel"
                              placeholder="Phone Number"
                              className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 pl-14"
                              required
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button className="btn bg-orange-500 hover:bg-orange-600 text-white font-semibold w-full transition duration-200 shadow-lg shadow-orange-500/30">
                      {authMethod === 'phone' ? 'Send OTP' : 'Register'}
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

                  <div className="flex space-x-2 mb-4">
                    <button
                      type="button"
                      className={`flex-1 py-2 px-3 rounded-md font-medium text-sm ${authMethod === 'email' ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/70'}`}
                      onClick={() => setAuthMethod('email')}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      className={`flex-1 py-2 px-3 rounded-md font-medium text-sm ${authMethod === 'phone' ? 'bg-orange-500 text-white' : 'bg-white/10 text-white/70'}`}
                      onClick={() => setAuthMethod('phone')}
                    >
                      Phone
                    </button>
                  </div>

                  <form>
                    <AnimatePresence mode="wait">
                      {authMethod === 'email' ? (
                        <motion.div
                          key="login-email"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-5"
                        >
                          <input
                            type="email"
                            placeholder="Email"
                            className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                            required
                          />
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
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
                        </motion.div>
                      ) : (
                        <motion.div
                          key="login-phone"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white/70">
                              +880
                            </div>
                            <input
                              type="tel"
                              placeholder="Phone Number"
                              className="input w-full border border-orange-400 bg-white/10 text-white placeholder-white/70 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 pl-14"
                              required
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button className="mt-5 btn bg-orange-500 hover:bg-orange-600 text-white font-semibold w-full transition duration-200 shadow-lg shadow-orange-500/30">
                      {authMethod === 'phone' ? 'Send OTP' : 'Login'}
                    </button>
                  </form>
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
