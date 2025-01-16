import React, { useState } from 'react';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        // Implement search functionality here
        console.log('Searching for:', query);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, vets, places..."
                className="border rounded-l-md p-2 flex-grow"
            />
            <button type="submit" className="bg-blue-500 text-white rounded-r-md p-2">
                Search
            </button>
        </form>
    );
};

export default SearchBar;