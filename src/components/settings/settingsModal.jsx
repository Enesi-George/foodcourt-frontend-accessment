import { useState, useEffect } from "react";
import { FaTools } from "react-icons/fa";
import PropTypes from "prop-types";
import PasswordCriteriaList from "../criterialList/pwdCriterialList";

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
                <div className="mx-auto flex-shrink-0 flex items-center justify-center  h-16 w-16 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FaTools className="animate-wiggle" color="black" fontSize={25} />
                </div>
              </div>
              <h3 className="text-md leading-6 mb-1 font-medium text-center text-gray-900 ">
                Password Criteria Settings
              </h3>
              <hr />
            </div>

            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <PasswordCriteriaList
                  settings={settings}
                  handleToggleChange={handleToggleChange}
                />
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

SettingsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  initialSettings: PropTypes.object.isRequired,
  setSettings: PropTypes.func,
  showModal: PropTypes.bool.isRequired,
};

export default SettingsModal;
