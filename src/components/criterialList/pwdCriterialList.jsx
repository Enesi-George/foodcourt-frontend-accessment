import PropTypes from "prop-types";

const PasswordCriteriaList = ({ settings, handleToggleChange }) => {
  return (
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
  );
};

PasswordCriteriaList.propTypes = {
  settings: PropTypes.object.isRequired,
  handleToggleChange: PropTypes.func.isRequired,
};

export default PasswordCriteriaList;
