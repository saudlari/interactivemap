import React from 'react';

const Navbar: React.FC<{ toggleVerticalNav: () => void }> = ({ toggleVerticalNav }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white h-16 p-4 shadow-md flex items-center justify-end space-x-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={toggleVerticalNav}>
        Botón 1
      </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Botón 2</button>
    </div>
  );
};

export default Navbar;
