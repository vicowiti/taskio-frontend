import React from "react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-3 ${className}`}
    >
      {/* Subtle spinning animation */}
      <div
        className={`
          ${sizeClasses[size]} 
          border-2 border-gray-200 border-t-blue-500 
          rounded-full 
          animate-spin
          transition-all duration-300
        `}
      />

      {/* Elegant message text */}
      {message && (
        <p className="text-gray-600 text-sm font-light tracking-wide">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;
