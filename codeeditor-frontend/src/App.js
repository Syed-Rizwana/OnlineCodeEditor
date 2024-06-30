// import './App.css';
// import CodeEditor from './components/CodeEditor';
// function App() {
//   return (
//     <>
//     <CodeEditor />
//     </>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import CodeEditor from './components/CodeEditor';
// import LanguageSelector from './components/LanguageSelector';
// import OutputDisplay from './components/OutputDisplay';
// import axios from 'axios';

// const App = () => {
//   const [selectedLanguage, setSelectedLanguage] = useState(''); // Define selectedLanguage state here
//   const [output, setOutput] = useState('');

// const executeCode = async (code, language) => {
//   try {
//     console.log(code, language)
//     // Set base URL for Axios
//     axios.defaults.baseURL = 'http://localhost:3100';

//     // Use relative URL in requests
//     const response = await axios.post('/execute', {
//       code: code,
//       language: language
//     });
//     const output = response.data.output;
//     console.log(output)
//     setOutput(output);
//   } catch (error) {
//     console.error('Error executing code:', error);
//   }
// };

//   const handleExecuteCode = (code, language) => {
//     console.log('Code:', code);
//     console.log('Language:', language);
//     executeCode(code, language);
//   };

//   return (
//     <div>
//       <h1>Code Editor App</h1>
//       <LanguageSelector
//         languages={['javascript', 'python', 'java']}
//         onSelectLanguage={(language) => setSelectedLanguage(language)}
//       />
//       <CodeEditor onExecuteCode={handleExecuteCode} />
//       <OutputDisplay output={output} />
//     </div>
//   );
// };

// export default App;
// // // cd codeeditor-frontend

// App.js

import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import OutputDisplay from './components/OutputDisplay';
import axios from 'axios';

import './App.css';

function App() {
  const [code, setCode] = useState(''); // State for storing code input
  const [language, setLanguage] = useState('python'); // State for storing selected language
  const [output, setOutput] = useState(''); // State for storing output from backend
  const [error, setError] = useState(null); // State for storing error message

  // Function to execute code on backend
  const executeCode = async (code, language) => {
    try {
      // Set base URL for Axios
      axios.defaults.baseURL = 'http://localhost:3100';

      // Send POST request to execute endpoint with code and language
      const response = await axios.post('/execute', {
        code: code,
        language: language
      });

      // Set output state with response from backend
      setOutput(response.data.output);
      // Clear error state
      setError(null);
    } catch (error) {
      // Log error to console
      console.log('Error executing code:', error);
      // Set error state with error message
      setError(error.response?.data?.error || 'An error occurred while executing the code.');
    }
  };

  // Event handler for running code
  const handleExecuteCode = () => {
    executeCode(code, language);
  };

  return (
    <>
    <h1 align="center">Online Code Editor</h1>
    <div className="App">
      <div className="editor-container">
        {/* Language selector */}
        <div className="language-selector">
          <label>
            Select Language:
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              
            </select>
          </label>
        </div>
        {/* Code editor component */}
        <CodeEditor code={code} setCode={setCode} />
        {/* Button to execute code */}
        <button onClick={handleExecuteCode}>Run Code</button>
      </div>
      {/* Output display component */}
      <div className="output-container">
        {/* Display error message if there is an error */}
        {error && <div className="error">{error}</div>}
        {/* Display output */}
        {!error && <OutputDisplay output={output} />}
      </div>
    </div>
    </>
  );
}

export default App;
