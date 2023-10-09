import React, { useState } from "react";

import "./front-page.css";
import { useNavigate } from "react-router";
const FrontPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSuggestion, setSelectedSuggestion] = useState<{
    id: number | null;
    name: string;
  }>({
    id: null,
    name: "",
  }); // Added state for selected suggestion
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const navigate = useNavigate();

  const suggestions = [
    { id: 27869, name: "Teanga" },
    { id: 38949, name: "Linguistica(Slovenia)" },
    { id: 19987, name: "Synergies Algerie" },
    { id: 28582, name: "Temes de Disseny" },
    { id: 41534, name: "Breast Cancer Research" },
  ];
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      localStorage.setItem("uploadedFile", selectedFile.name);
      setUploadedFileName(selectedFile.name);
    }
  };
  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setShowDropdown(term !== "");
  };
  const handleSuggestionClick = (suggestion: { id: number; name: string }) => {
    // When a suggestion is clicked, populate the input field and clear the suggestions
    setSelectedSuggestion(suggestion);
    setSearchTerm(suggestion.name);
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    const id = selectedSuggestion.id;
    if (id !== null) {
      navigate(`/rules/${id}`);
    }
  };
  const getSuggestions = () => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    if (!lowerSearchTerm) {
      return suggestions;
    }
    return suggestions.filter((suggestion) =>
      suggestion.name.toLowerCase().startsWith(lowerSearchTerm)
    );
  };

  return (
    <div className="container">
      <div>
        <img alt="Logo" src="src/features/logo.png" />
      </div>
      <div>
        <h3>Get closer to journal acceptance in minutes</h3>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontWeight: "bold" }} htmlFor="search-bar">
          Select journal
        </label>
        <input
          style={{ marginLeft: "10px" }}
          name="search-bar"
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search journal name"
        />
        {showDropdown && (
          <div className="dropdown-container">
            {getSuggestions().map((item, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleSuggestionClick(item)}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label className="file-upload-label">
          Upload Manuscript
          <input
            type="file"
            className="file-upload-input"
            onChange={handleFileUpload}
          />
        </label>
        {uploadedFileName && <p>{uploadedFileName}</p>}
      </div>
      <div>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default FrontPage;
