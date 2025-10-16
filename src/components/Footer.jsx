import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="animate-fadeIn mt-8">
      <div className="text-center">
        <p className="text-lg text-white/90 [text-shadow:_1px_1px_2px_rgba(0,0,0,0.8)] transition-all duration-500 hover:scale-105 hover:text-white">
          Copyright © {currentYear} by Nelo Code | All Rights Reserved.
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;