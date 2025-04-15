import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add this line
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  required = false,
  className,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        required={required}
        className={className}
        onChange={onChange} // Pass the onChange prop to the input
      />
    </div>
  );
};
