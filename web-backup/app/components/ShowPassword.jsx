"use client";
import React, { useState } from 'react';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";

export function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center border-b border-b-2 border-blue-500 py-2">
      <input
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        value={password}
        onChange={handleInputChange}
      />
      <button
        onClick={toggleShowPassword}
        className="focus:outline-none"
      >
        {showPassword ? (
         <FaRegEyeSlash/>
        ) : (
         <FaRegEye/>
        )}
      </button>
    </div>
  );
}