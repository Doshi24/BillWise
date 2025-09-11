const Loader = ({ type = "spinner", text = "Loading..." }) => {
  if (type === "dots") {
    return (
      <div className="flex items-center gap-2">
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></span>
          <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-400"></span>
        </div>
        <span className="text-white">{text}</span>
      </div>
    );
  }

  // Default spinner loader
  return (
    <div className="flex items-center gap-2">
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="text-white">{text}</span>
    </div>
  );
};

export default Loader;
