import React from "react";

const OverlayModal = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) {
    return null; // Don't render the overlay if isLoading is false
  }

  return (
    <div className="pointer-events-auto fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-center bg-black bg-opacity-50"></div>
  );
};

export default OverlayModal;
