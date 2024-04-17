import { useState, useEffect } from "react";
import { FaTools } from "react-icons/fa";
import PropTypes from "prop-types";

const SettingsModal = ({
  closeModal,
  initialSettings,
  setSettings,
  showModal,
}) => {
  const [settings, setLocalSettings] = useState(initialSettings);

  useEffect(() => {
    if (showModal) {
      const savedSettings = localStorage.getItem("passwordSettings");
      if (savedSettings) {
        setLocalSettings(JSON.parse(savedSettings));
      } else {
        setLocalSettings(initialSettings);
      }
    }
  }, [showModal, initialSettings]);

  const handleToggleChange = (name) => {
    const updatedSettings = { ...settings, [name]: !settings[name] };
    setLocalSettings(updatedSettings);
    localStorage.setItem("passwordSettings", JSON.stringify(updatedSettings));
    if (setSettings) {
      setSettings(updatedSettings);
    }
  };

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        showModal ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="w-full mb-4">
              <div className="flex justify-center">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center  h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FaTools className="animate-wiggle" fontSize={20} />
                </div>
              </div>
              <h3 className="text-md leading-6 mb-1 font-medium text-center text-gray-900 ">
                Password Criteria Settings
              </h3>
              <hr />
            </div>

            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <ul className="mt-2">
                  <li className="mb-2 list-none flex">
                    <label className="flex items-center relative w-max cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className={`appearance-none transition duration-500 cursor-pointer w-14 h-7 rounded-full focus:outline-none  ${
                          settings.uppercase ? "bg-gray-200" : "bg-red-500"
                        }`}
                        checked={settings.uppercase}
                        onChange={() => handleToggleChange("uppercase")}
                      />
                      <span className="absolute font-medium text-xs uppercase right-1 text-white">
                        OFF
                      </span>
                      <span className="absolute font-medium text-xs uppercase right-8 text-white">
                        ON
                      </span>
                      <span
                        className={`w-7 h-7 right-7 absolute rounded-full transform transition-transform ${
                          settings.uppercase
                            ? "bg-gray-800 translate-x-7"
                            : "bg-gray-200"
                        }`}
                      />
                    </label>
                    <span className="ml-2">At least 1 uppercase</span>
                  </li>

                  <li className="mb-2 list-none flex">
                    <label className="flex items-center relative w-max cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className={`appearance-none transition duration-500 cursor-pointer w-14 h-7 rounded-full focus:outline-none  ${
                          settings.lowercase ? "bg-gray-200" : "bg-red-500"
                        }`}
                        checked={settings.lowercase}
                        onChange={() => handleToggleChange("lowercase")}
                      />
                      <span className="absolute font-medium text-xs uppercase right-1 text-white">
                        OFF
                      </span>
                      <span className="absolute font-medium text-xs uppercase right-8 text-white">
                        ON
                      </span>
                      <span
                        className={`w-7 h-7 right-7 absolute rounded-full transform transition-transform ${
                          settings.lowercase
                            ? "bg-gray-800 translate-x-7"
                            : "bg-gray-200"
                        }`}
                      />
                    </label>
                    <span className="ml-2">At least 1 lowercase</span>
                  </li>

                  <li className="mb-2 list-none flex">
                    <label className="flex items-center relative w-max cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className={`appearance-none transition duration-500 cursor-pointer w-14 h-7 rounded-full focus:outline-none  ${
                          settings.figure ? "bg-gray-200" : "bg-red-500"
                        }`}
                        checked={settings.figure}
                        onChange={() => handleToggleChange("figure")}
                      />
                      <span className="absolute font-medium text-xs uppercase right-1 text-white">
                        OFF
                      </span>
                      <span className="absolute font-medium text-xs uppercase right-8 text-white">
                        ON
                      </span>
                      <span
                        className={`w-7 h-7 right-7 absolute rounded-full transform transition-transform ${
                          settings.figure
                            ? "bg-gray-800 translate-x-7"
                            : "bg-gray-200"
                        }`}
                      />
                    </label>
                    <span className="ml-2">At least 1 figure</span>
                  </li>

                  <li className="mb-2 list-none flex">
                    <label className="flex items-center relative w-max cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className={`appearance-none transition duration-500 cursor-pointer w-14 h-7 rounded-full focus:outline-none  ${
                          settings.specialChar ? "bg-gray-200" : "bg-red-500"
                        }`}
                        checked={settings.specialChar}
                        onChange={() => handleToggleChange("specialChar")}
                      />
                      <span className="absolute font-medium text-xs uppercase right-1 text-white">
                        OFF
                      </span>
                      <span className="absolute font-medium text-xs uppercase right-8 text-white">
                        ON
                      </span>
                      <span
                        className={`w-7 h-7 right-7 absolute rounded-full transform transition-transform ${
                          settings.specialChar
                            ? "bg-gray-800 translate-x-7"
                            : "bg-gray-200"
                        }`}
                      />
                    </label>
                    <span className="ml-2">
                      At least 1 special character - !@#$%^&*()
                    </span>
                  </li>

                  <li className="mb-2 list-none flex">
                    <label className="flex items-center relative w-max cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className={`appearance-none transition duration-500 cursor-pointer w-14 h-7 rounded-full focus:outline-none  ${
                          settings.minLength ? "bg-gray-200" : "bg-red-500"
                        }`}
                        checked={settings.minLength}
                        onChange={() => handleToggleChange("minLength")}
                      />
                      <span className="absolute font-medium text-xs uppercase right-1 text-white">
                        OFF
                      </span>
                      <span className="absolute font-medium text-xs uppercase right-8 text-white">
                        ON
                      </span>
                      <span
                        className={`w-7 h-7 right-7 absolute rounded-full transform transition-transform ${
                          settings.minLength
                            ? "bg-gray-800 translate-x-7"
                            : "bg-gray-200"
                        }`}
                      />
                    </label>
                    <span className="ml-2">At least 8 characters long</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleCloseModal}
              className="transition duration-200 w-full inline-flex justify-center border-none  rounded-md focus:outline-none shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-white hover:bg-gray-600 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
//props validation
SettingsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  initialSettings: PropTypes.object.isRequired,
  setSettings: PropTypes.func,
  showModal: PropTypes.bool.isRequired,
};

export default SettingsModal;
