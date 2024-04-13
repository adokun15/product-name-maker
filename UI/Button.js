"use client";
export default function Button({ children, className, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`py-1 text-white hover:bg-orange-500 px-3 font-medium bg-orange-600 shadow rounded ${className}`}
    >
      {children}
    </button>
  );
}
