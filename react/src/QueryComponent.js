// src/QueryComponent.js

import React, { useState } from 'react';

function QueryComponent() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleQuery = async () => {
    try {
      const response = await fetch(`http://localhost:5601/query?text=${query}`);

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.text();
      setResponse(data);
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Ask your questions here!</h1>
      <input
        type="text"
        placeholder="Enter your query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleQuery}>Submit</button>
      <div>
        <h2>Response:</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
}

export default QueryComponent;

// import React, { useState } from 'react';

// function QueryComponent() {
//   const [query, setQuery] = useState('');
//   const [response, setResponse] = useState('');

//   const handleQuery = async () => {
//     try {
//       const response = await fetch(`http://localhost:5601/query?text=${query}`);
//       if (response.status === 200 && response.statusText === 'SUCCESS') {
//         const data = await response.text();
//         setResponse(data);
//       } else {
//         setResponse('Error: Unable to fetch data');
//       }
//     } catch (error) {
//       setResponse('Error: ' + error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Query the Backend</h1>
//       <input
//         type="text"
//         placeholder="Enter your query"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleQuery}>Submit</button>
//       <div>
//         <h2>Response:</h2>
//         <pre>{response}</pre>
//       </div>
//     </div>
//   );
// }

// export default QueryComponent;
