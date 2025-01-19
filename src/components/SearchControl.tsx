import { useState } from 'react';

interface SearchControlProps {
  className?: string;
  onSearch: (query: string) => void; // Añade esta prop
}

const SearchControl: React.FC<SearchControlProps> = ({ className = '', onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue); // Llama a la función de búsqueda
  };

  return (
    <div className={`search-control ${className}`}>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Buscar ubicación..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>
    </div>
  );
};

export default SearchControl;