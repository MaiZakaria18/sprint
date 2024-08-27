import React, { useState } from 'react';
import axios from 'axios';


/**
 * A reusable autocomplete component for selecting users.
 *
 * @param {function} onUserSelect - A callback function to handle user selection.
 * @param {array} assignedUsers - An array of already assigned users to exclude from suggestions.
 * @return {JSX.Element} The autocomplete component.
 */
const UserAutocomplete = ({ onUserSelect, assignedUsers }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);


  /**
 * Handles changes to the input field by fetching and filtering user suggestions based on the query.
 *
 * @param {object} e - The event object containing the input field's value.
 * @return {void}
 */
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


  /**
 * Handles the click event of a suggestion.
 *
 * @param {object} user - The user object selected from the suggestions.
 * @return {void} No return value.
 */
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
        <ul >
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
