// LazyImg.jsx
import React, { useState } from "react";

const LazyImg = ({
  src,
  alt = "image",
  className = "",
  placeholder = "/extras/imageicon.png",
  onClick,
  onLoad,
  onError,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setError(true);
    onError?.(e);
  };

  return (
    <img
      src={error ? placeholder : src}
      alt={alt}
      loading="lazy"
      onLoad={handleLoad}
      onError={handleError}
      onClick={onClick}
      className={`transition duration-500 ease-in-out
        ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}
        ${className}
      `}
    />
  );
};

export default LazyImg;
