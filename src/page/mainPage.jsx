import { useState, useEffect } from "react";
import SettingsModal from "../components/settings/settingsModal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { MdOutlineJoinFull } from "react-icons/md";
import { Header } from "../components/header/header";
import { Introduction } from "../components/intro/introduction";
import assessment_image from "../assets/assessment_image.gif";
import { Spinner } from "../components/utils/spinner";

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [settings, setSettings] = useState({
    uppercase: false,
    lowercase: false,
    figure: false,
    specialChar: false,
    minLength: false,
  });
  const [allSettingsFalse, setAllSettingsFalse] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [isTyping, setIsTyping] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic for password
    const isValidPassword = validatePassword(password, settings);

    if (isValidPassword) {
      // Password is valid, proceed with form submission
      console.log("Password is valid");
    } else {
      // Password is invalid, display error message
      setPasswordError(generateErrorMessage(password, settings));
    }
  };

  const validatePassword = (password, settings) => {
    if (settings.minLength && password.length < 8) return false; // Password must be at least 8 characters long
    if (settings.uppercase && !/[A-Z]/.test(password)) return false; // Password must contain at least 1 uppercase letter
    if (settings.lowercase && !/[a-z]/.test(password)) return false; // Password must contain at least 1 lowercase letter
    if (settings.figure && !/\d/.test(password)) return false; // Password must contain at least 1 digit
    if (settings.specialChar && !/[!@#$%^&*()]/.test(password)) return false; // Password must contain at least 1 special character
    return true;
  };

  const generateErrorMessage = (password, settings) => {
    let errorMessage = "";
    if (settings.minLength && password.length < 8)
      errorMessage += "Password must be at least 8 characters long. ";
    if (settings.uppercase && !/[A-Z]/.test(password))
      errorMessage += "Password must contain at least 1 uppercase letter. ";
    if (settings.lowercase && !/[a-z]/.test(password))
      errorMessage += "Password must contain at least 1 lowercase letter. ";
    if (settings.figure && !/\d/.test(password))
      errorMessage += "Password must contain at least 1 digit. ";
    if (settings.specialChar && !/[!@#$%^&*()]/.test(password))
      errorMessage += "Password must contain at least 1 special character. ";
    return errorMessage;
  };

  useEffect(() => {
    // Check if any settings exist initially
    const savedSettings = localStorage.getItem("passwordSettings");
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      if (!Object.values(parsedSettings).some((value) => value)) {
        setAllSettingsFalse(true);
      }
    } else {
      // If no settings exist, prompt user to set initial settings by showing the modal
      setShowModal(true);
    }

    // Update the validity whenever email, password and setting changes
    const isValidEmail = email !== "";
    const isValidPassword = validatePassword(password, settings);
    setIsValid(isValidEmail && isValidPassword);

    // Calculate password strength only if the user is typing
    if (isTyping) {
      const strength = calculatePasswordStrength(password);
      updatePasswordStrengthUI(strength);
    }
    //spinner
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [email, password, settings, isTyping]);

  const handleCloseModal = () => {
    if (!Object.values(settings).some((value) => value)) {
      // if all settings are false when the modal is closed without changes, disable the form
      setAllSettingsFalse(true);
    } else {
      setAllSettingsFalse(false);
    }
    setShowModal(false);
  };

  const handleSettingsClick = () => {
    setShowModal(true);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsTyping(true); //on keyup
    // Clear password error message on key press
    setPasswordError(generateErrorMessage(newPassword, settings));
  };

  const calculatePasswordStrength = (password) => {
    let strength = "weak";
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()]/.test(password);

    if (
      password.length >= 10 &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    ) {
      strength = "hard";
    } else if (hasUppercase && hasLowercase && hasSpecialChar) {
      strength = "medium";
    }
    return strength;
  };

  const updatePasswordStrengthUI = (strength) => {
    setPasswordStrength(strength);
  };

  return (
    <div className="relative px-10 lg:px-72 py-5">
      {/* Render spinner if loading is true */}
      {loading && <Spinner />}
      <img
        src={assessment_image}
        alt=""
        className="md:w-1/2 h-full absolute top-10 right-0 z-0 opacity-20"
      />
      <div className="flex relative z-10">
        <Header />
        <button
          onClick={handleSettingsClick}
          className="transition duration-200 bg-white text-gray-700 px-2 py-2 border-none  rounded-lg shadow-md hover:bg-gray-100 focus:outline-none"
        >
          <span className="flex gap-2 text-red-500 font-bold">
            <IoSettings className="my-auto animate-spin-slow" fontSize={24} />
            Settings
          </span>
        </button>
      </div>
      <div className="w-full text-center mt-10 relative z-10">
        <Introduction />
      </div>
      <div className="flex items-center justify-center mt-12 relative z-10">
        <div className=" max-w-md mx-auto mb-24 p-6 bg-gray-100 rounded-lg shadow-md relative z-10">
          <h1 className="md:text-2xl text-sm  text-center font-semibold">
            Registration
          </h1>
          <div className="flex mb-1 items-center justify-center">
            <hr className="w-1/2 border-t border-gray-500 mr-2" />

            <MdOutlineJoinFull />

            <hr className="w-1/2 border-t border-gray-500 ml-2" />
          </div>

          <form onSubmit={handleSubmit} disabled={allSettingsFalse}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-left font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none  focus:ring-none"
                required
                disabled={allSettingsFalse}
                placeholder="George@example.com"
              />
            </div>
            <div className="relative mb-4 ">
              <label
                htmlFor="password"
                className="block text-sm text-left font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-none"
                required
                disabled={allSettingsFalse}
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-6 right-0 px-2 border-none rounded-none mt-0.5  h-9 bg-transparent focus:outline-none hover:border-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEyeSlash className="focus:outline-none" />
                ) : (
                  <FaEye className="focus:outline-none" />
                )}
              </button>

              {isTyping && (
                <div className="mt-0 px-1">
                  <div
                    className={`h-0.5 w-full rounded-md transition duration-500 ease-linear ${
                      passwordStrength === "weak"
                        ? "bg-red-500"
                        : passwordStrength === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <p className="text-xs mt-0">
                    Strength:
                    <i className="font-bold">
                      {passwordStrength === "weak"
                        ? " Easy"
                        : passwordStrength === "medium"
                        ? " Medium"
                        : " Hard"}
                    </i>
                  </p>
                </div>
              )}
              {passwordError && (
                <div className="mt-2">
                  {passwordError.split(".").map((error, index) => (
                    <p
                      key={index}
                      className="flex text-red-500 text-sm mt-1 justify-start"
                    >
                      {error.trim()}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              className={`transition duration-200 w-full text-white py-2 px-4 border-none rounded-md focus:outline-none  ${
                allSettingsFalse || !isValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-600"
              }`}
              disabled={allSettingsFalse || !isValid}
            >
              Submit
            </button>
          </form>
        </div>

        {showModal && (
          <SettingsModal
            closeModal={handleCloseModal}
            initialSettings={settings}
            setSettings={setSettings}
            showModal={showModal}
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;
