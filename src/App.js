import React, { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('text', question);

      const apiResponse = await fetch('http://20.121.131.26:8000/proto/', {
        method: 'POST',
        body: formData,
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        console.log(data)
        setResponse(data.response);
      } else {
        console.error('Server error: Unexpected status code ' + apiResponse.status);
        setError('Server error: Unexpected status code ' + apiResponse.status);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error fetching data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Question Response App</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your question:
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </label>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {error && <div className="error">{error}</div>}
        <div className="response-box">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
