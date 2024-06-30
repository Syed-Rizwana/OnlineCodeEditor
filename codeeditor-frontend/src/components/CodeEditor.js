// // CodeEditor.js

// import React, { useState } from 'react';
// import AceEditor from 'react-ace';
// import 'ace-builds/src-noconflict/mode-javascript';
// import 'ace-builds/src-noconflict/theme-monokai';

// const CodeEditor = ({ onExecuteCode }) => {
//   const [code, setCode] = useState('');
//   const [selectedLanguage, setSelectedLanguage] = useState('javascript');

//   const handleChange = (newCode) => {
//     setCode(newCode);
//   };

//   const handleRunCode = () => {
//     // Call the onExecuteCode function passed from the parent component
//     onExecuteCode(code, selectedLanguage);
//   };

//   return (
//     <div>
//       <AceEditor
//         mode={selectedLanguage}
//         theme="monokai"
//         onChange={handleChange}
//         value={code}
//         name="code-editor"
//         width="100%"
//         height="500px"
//         fontSize={14}
//         showPrintMargin={true}
//         showGutter={true}
//         highlightActiveLine={true}
//         setOptions={{
//           enableBasicAutocompletion: true,
//           enableLiveAutocompletion: true,
//           enableSnippets: true,
//           showLineNumbers: true,
//           tabSize: 2,
//         }}
//       />
//       <div>
//         <button onClick={handleRunCode}>Run</button>
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;


// CodeEditor.js

import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = ({ code, setCode }) => {
  const handleChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <AceEditor
      mode="python" // Default mode is Python
      theme="monokai"
      onChange={handleChange}
      value={code}
      name="code-editor"
      width="100%"
      height="500px"
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};

export default CodeEditor;
