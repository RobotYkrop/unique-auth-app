import React from "react";
import "./Overlay.css";

interface OverlayProps {
  show: boolean;
  children: React.ReactNode;
}

const Overlay: React.FC<OverlayProps> = ({ show, children }) => {
  return (
    <div className={`overlay ${show ? "show" : "hide"}`}>
      {children}
    </div>
  );
};

export default Overlay;