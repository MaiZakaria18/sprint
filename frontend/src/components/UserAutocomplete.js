import React, { useState } from 'react';
import axios from 'axios';

const UserAutocomplete = ({ onUserSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setQuery(query);

    if (query.length > 0) {
      try {
        const response = await axios.get(`http://localhost:8000/users/autocomplete?q=${query}`);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (user) => {
    onUserSelect(user);
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type to search users..."
      />
      <ul>
        {suggestions.map((user) => (
          <li key={user.id} onClick={() => handleSuggestionClick(user)}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAutocomplete;
