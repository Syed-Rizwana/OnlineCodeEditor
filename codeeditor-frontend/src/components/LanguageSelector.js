import React, { useState } from 'react';

const LanguageSelector = ({ languages, onSelectLanguage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    setSelectedLanguage(selectedLanguage);
    onSelectLanguage(selectedLanguage); // This should trigger the onSelectLanguage callback with the selected language
  };

  return (
    <div>
      <h2>Language Selector</h2>
      <select value={selectedLanguage} onChange={handleChange}>
        <option value="">Select Language</option>
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;