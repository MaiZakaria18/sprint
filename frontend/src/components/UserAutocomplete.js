import React, { useState } from 'react';
import axios from 'axios';

const UserAutocomplete = ({ onUserSelect, assignedUsers }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setQuery(query);

    if (query.length > 0) {
      try {
        const response = await axios.get(`http://localhost:8000/users/autocomplete?q=${query}`);
        // Show suggestions including already assigned users
        const filteredSuggestions = response.data.filter(
          user => !assignedUsers.some(assignedUser => assignedUser.id === user.id)
        );
        setSuggestions(filteredSuggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (user) => {
    onUserSelect(user);
    setQuery(''); // Clear input after selection
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="user-autocomplete">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type to search users..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((user) => (
            <li key={user.id} onClick={() => handleSuggestionClick(user)}>
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserAutocomplete;
