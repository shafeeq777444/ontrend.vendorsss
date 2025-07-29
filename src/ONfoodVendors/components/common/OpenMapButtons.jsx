import React from "react";

export default function OpenMapButton({ latitude, longitude }) {
  const handleOpenMap = () => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  return (
    <button onClick={handleOpenMap} style={{ color: "#1a73e8", background: "none", border: "none", padding: 0, cursor: "pointer" }}>
    View on Google Maps
    </button>
  );
}
