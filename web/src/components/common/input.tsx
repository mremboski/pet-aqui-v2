
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
}
const Input: React.FC<InputProps> = ({ label, id, error, ...props }) => {
  const base = "w-full p-3 border rounded-lg bg-black/30 text-gray-100 placeholder-gray-400 focus:ring-secondary-light focus:border-secondary-light transition duration-150 shadow-sm";
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-semibold text-gray-200 mb-1">{label}</label>
      <input id={id} name={id} className={`${base} ${error ? 'border-red-500' : 'border-white/10'}`} {...props} />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};
export default Input;
