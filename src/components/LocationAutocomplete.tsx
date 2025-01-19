import React, { useEffect, useRef, useState } from 'react';

interface LocationAutocompleteProps {
  onSelect: (location: { lat: number; lon: number }) => void;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout>();

  const fetchSuggestions = async (input: string) => {
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(input)}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Limpiar el timeout anterior
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Establecer un nuevo timeout
    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSelect = (suggestion: any) => {
    setQuery(suggestion.display_name.split(',')[0]);
    setSuggestions([]);
    onSelect({
      lat: parseFloat(suggestion.lat),
      lon: parseFloat(suggestion.lon)
    });
  };

  // Limpiar el timeout cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="location-autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar dirección..."
        className="search-input"
      />
      {isLoading && (
        <div className="suggestions-list">
          <div className="p-2 text-center text-gray-500">Buscando...</div>
        </div>
      )}
      {!isLoading && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="hover:bg-gray-100 cursor-pointer p-2"
            >
              {suggestion.display_name.split(',').slice(0, 2).join(', ')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;