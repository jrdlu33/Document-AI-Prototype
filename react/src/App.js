// import QueryComponent from './QueryComponent';
// import UploadComponent from './UploadComponent';
// import React from 'react';

// function App() {
//   /**
//    * Handles the file upload event.
//    * @param {File} file - The file to be uploaded.
//    * @returns {Promise<void>} A Promise that resolves when the file upload is complete.
//    */
//   const handleFileUpload = async (file) => {
//     try {
//       // Create a FormData object to send the file to the backend
//       const formData = new FormData();
//       formData.append('file', file);

//       // Sends the file to the backend endpoint for processing
//       const response = await fetch('http://localhost:5601/uploadFile', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         // Handle successful file upload
//         console.log('File uploaded successfully.');
//       } else {
//         // Handle server errors
//         console.error('Server error:', response.statusText);
//       }
//     } catch (error) {
//       // Handle network errors or unexpected errors
//       console.error('Error:', error.message);
//     }
//   };

//   return (
//     <div className="App">
//       {/* Renders the file upload component */}
//       <UploadComponent onFileUpload={handleFileUpload} />

//       {/* Renders the query component */}
//       <QueryComponent />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import QueryComponent from './QueryComponent';
import UploadComponent from './UploadComponent';
import './App.css'; // Import your custom CSS file

function App() {
  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:5601/uploadFile', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully.');
      } else {
        console.error('Server error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container"> {/* Apply the "container" class for your main content */}
      <header className="header"> {/* Apply the "header" class for the header */}
        <nav className="navbar"> {/* Apply the "navbar" class for the navigation bar */}
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">How to Scale</a>
          {/* Add more navigation links as needed */}
        </nav>
      </header>

      <main>
        <div className="card">
          <h1>Upload the files that you'd like to ask about</h1>
          <UploadComponent onFileUpload={handleFileUpload} />
        </div>

        <div className="card">
          <h2></h2>
          <QueryComponent />
        </div>
      </main>

      <footer className="footer"> {/* Apply the "footer" class for the footer */}
        {/* Footer content goes here */}
      </footer>
    </div>
  );
}

export default App;







