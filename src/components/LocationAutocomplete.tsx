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
    setQuery(suggestion.display_name);
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
        placeholder="Buscar ubicación..."
        className="w-full px-3 py-2 text-sm md:text-base rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#004f59]"
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
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;