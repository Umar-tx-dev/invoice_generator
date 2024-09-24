import React, { useState, useEffect, useRef } from "react";

const CustomDropdown = ({
  options,
  value,
  onChange,
  label,
  register,
  name,
  rules,
  defaultText = "Select Country",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-col " ref={dropdownRef}>
      <label className="text-[#344054]">{label}</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border p-2 w-full rounded-lg bg-white cursor-pointer flex items-center justify-between"
      >
        <span>{value || defaultText}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 8.586l2.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute top-[69px] w-full border rounded-lg bg-white shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              {option}
            </div>
          ))}
        </div>
      )}
      <input type="hidden" {...register(name, rules)} value={value} />
    </div>
  );
};

export default CustomDropdown;
