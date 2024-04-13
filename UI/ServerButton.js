export const ServerButton = ({ children, className, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`py-1 px-3 font-medium bg-orange-600 shadow rounded ${className}`}
    >
      {children}
    </button>
  );
};
