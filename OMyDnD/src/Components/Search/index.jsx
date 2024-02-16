import { useState } from "react";
import spellsData from "../../data/spells.json";
import classesData from "../../data/classes.json";

function Search() {
  const [querySpell, setQuerySpell] = useState("");
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [showDropdownSpell, setShowDropdownSpell] = useState(false);

  const [queryClass, setQueryClass] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [showDropdownClass, setShowDropdownClass] = useState(false);

  const handleSelectSpell = (spell) => {
    setSelectedSpell(spell);
    setShowDropdownSpell(false);
    setQuerySpell("");
    setQueryClass("");
    setSelectedClass(null);
  };

  const handleSelectClass = (cls) => {
    setSelectedClass(cls);
    setShowDropdownClass(false);
    setQueryClass("");
    setQuerySpell("");
    setSelectedSpell(null);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: "50px",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      {/* Search bar for spells */}
      <input
        type="search"
        placeholder="Rechercher un sort..."
        value={querySpell}
        autoComplete="off"
        onChange={(e) => setQuerySpell(e.target.value)}
        onFocus={() => setShowDropdownSpell(true)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "500px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      />
      {/* Dropdown for spells */}
      {showDropdownSpell && querySpell && (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            cursor: "pointer",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            width: "100%",
            maxWidth: "500px",
            position: "absolute",
            zIndex: 1000,
            top: "50px",
            maxHeight: "400px",
            overflowY: "auto",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            marginTop: "5px",
          }}
        >
          {spellsData
            .filter((spell) =>
              spell.name.toLowerCase().includes(querySpell.toLowerCase())
            )
            .slice(0, 20)
            .map((spell, index) => (
              <li
                key={index}
                onClick={() => handleSelectSpell(spell)}
                style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
              >
                {spell.name}
              </li>
            ))}
        </ul>
      )}
      {/* Search bar for classes */}
      <input
        type="search"
        placeholder="Rechercher une classe..."
        value={queryClass}
        autoComplete="off"
        onChange={(e) => setQueryClass(e.target.value)}
        onFocus={() => setShowDropdownClass(true)}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "500px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginTop: "20px", // Space between the two search bars
        }}
      />
      {/* Dropdown for classes */}
      {showDropdownClass && queryClass && (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            cursor: "pointer",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            width: "100%",
            maxWidth: "500px",
            position: "absolute",
            zIndex: 1000,
            top: "120px", // Adjusted top to make space for both dropdowns
            maxHeight: "400px",
            overflowY: "auto",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            marginTop: "5px",
          }}
        >
          {classesData
            .filter((cls) =>
              cls.name.toLowerCase().includes(queryClass.toLowerCase())
            )
            .slice(0, 20)
            .map((cls, index) => (
              <li
                key={index}
                onClick={() => handleSelectClass(cls)}
                style={{ padding: "10px", borderBottom: "1px solid #ddd" }}
              >
                {cls.name}
              </li>
            ))}
        </ul>
      )}
      {/* Display selected spell or class */}
      {selectedSpell && (
        <div style={resultStyle}>
          <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
            {selectedSpell.name}
          </h2>
          {Object.entries(selectedSpell).map(([key, value]) => (
            <p key={key}>
              <strong style={{ fontWeight: "bold" }}>{key}</strong>:{" "}
              {typeof value === "object" ? JSON.stringify(value) : value}
            </p>
          ))}
        </div>
      )}
      {selectedClass && (
        <div style={resultStyle}>
          <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
            {selectedClass.name}
          </h2>
          {Object.entries(selectedClass).map(([key, value]) => (
            <p key={key}>
              <strong style={{ fontWeight: "bold" }}>{key}</strong>:{" "}
              {typeof value === "object" ? JSON.stringify(value) : value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

const resultStyle = {
  marginTop: "20px",
  border: "1px solid #ddd",
  padding: "10px",
  backgroundColor: "#f0f0f0",
  width: "100%",
  maxWidth: "500px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  position: "absolute",
  top: "100px",
  fontFamily: "Cursive",
};

export default Search;
