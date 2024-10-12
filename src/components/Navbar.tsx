import React from 'react';

const Navbar: React.FC<{ toggleVerticalNav: () => void }> = ({ toggleVerticalNav }) => {
  return (
    <div className="absolute top-0 left-0 right-0 h-16 px-4 flex items-center bg-transparent z-50 space-x-4 justify-end">
      <button
        className="marker-form-button bg-[#f05454] text-white font-bold rounded-lg px-4 py-2 hover:bg-[#f36161] active:bg-[#d9534f] focus:bg-[#d9534f] transition-colors duration-300 shadow-lg mt-2 flex items-center" // Asegurando que el botón use flex
        onClick={toggleVerticalNav}
      >
        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 2a9 9 0 100 18 9 9 0 000-18zm0 16a7 7 0 100-14 7 7 0 000 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.293 16.293l4.707 4.707" />
        </svg>
        <span>Buscar</span> {/* Asegurando que el texto esté dentro de un span */}
      </button>
    </div>
  );
};

export default Navbar;