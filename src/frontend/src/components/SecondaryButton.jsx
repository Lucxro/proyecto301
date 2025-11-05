function SecondaryButton({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;