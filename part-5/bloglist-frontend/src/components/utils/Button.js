import React from "react";

const Button = ({ children }) => {
  return (
    <button className="w-1/3 px-5 py-1 rounded-md bg-slate-500 text-white hover:bg-slate-600">
      {children}
    </button>
  );
};

export default Button;
