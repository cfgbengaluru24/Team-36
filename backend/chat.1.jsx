import React, { useState } from 'react';
import axios from 'axios';

export const chat = () => {
  const [message, setMessage] = useState('');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/fetch-data');
      setMessage(res.data.message);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Failed to fetch data');
    }
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/query', { question: query });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Error processing query:', error);
      setResponse('Failed to process query');
    }
  };

  return (
    <div>
      <h1>Medical Data App</h1>
      <button onClick={fetchData}>Fetch Data</button>
      {message && <p>{message}</p>}
      <form onSubmit={handleQuerySubmit}>
        <label>
          Enter your query:
          <input type="text" value={query} onChange={handleQueryChange} />
        </label>
        <button type="submit">Process Query</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
};
