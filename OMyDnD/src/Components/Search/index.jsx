import { useState } from "react";
import spellsData from "../../data/spells.json";
import classesData from "../../data/classes.json";

function Search() {
  const [querySpell, setQuerySpell] = useState("");
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [showDropdownSpell, setShowDropdownSpell] = useState(false);

  const [queryClass, setQueryClass] = useState("");
  const [showDropdownClass, setShowDropdownClass] = useState(false);

  const handleSelectSpell = (spell) => {
    setSelectedSpell(spell);
    setShowDropdownSpell(false);
    setQuerySpell("");
    // Effacer la recherche de classe lorsqu'un sort est sélectionné
    setQueryClass("");
  };

  const handleSelectClass = (cls) => {
    // Naviguer vers l'URL spécifique de la classe sélectionnée dans un nouvel onglet
    const classUrl = `/sanctuary/classes/${cls.index}`;
    window.open(classUrl, "_blank");
    setShowDropdownClass(false);
    setQueryClass("");
    // Effacer la sélection de sort lorsqu'une classe est sélectionnée
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
      {/* Barre de recherche pour les sorts */}
      <input
        type="search"
        placeholder="Rechercher un sort..."
        value={querySpell}
        autoComplete="off"
        onChange={(e) => setQuerySpell(e.target.value)}
        onFocus={() => setShowDropdownSpell(true)}
        style={inputStyle}
      />
      {/* Menu déroulant pour les sorts */}
      {showDropdownSpell && querySpell && (
        <ul style={dropdownStyle}>
          {spellsData
            .filter((spell) =>
              spell.name.toLowerCase().includes(querySpell.toLowerCase())
            )
            .slice(0, 20)
            .map((spell, index) => (
              <li
                key={index}
                onClick={() => handleSelectSpell(spell)}
                style={itemStyle}
              >
                {spell.name}
              </li>
            ))}
        </ul>
      )}
      {/* Barre de recherche pour les classes */}
      <input
        type="search"
        placeholder="Rechercher une classe..."
        value={queryClass}
        autoComplete="off"
        onChange={(e) => setQueryClass(e.target.value)}
        onFocus={() => setShowDropdownClass(true)}
        style={inputStyle}
      />
      {/* Menu déroulant pour les classes */}
      {showDropdownClass && queryClass && (
        <ul style={dropdownStyle}>
          {classesData
            .filter((cls) =>
              cls.name.toLowerCase().includes(queryClass.toLowerCase())
            )
            .slice(0, 20)
            .map((cls, index) => (
              <li
                key={index}
                onClick={() => handleSelectClass(cls)}
                style={itemStyle}
              >
                {cls.name}
              </li>
            ))}
        </ul>
      )}
      {/* Affichage du sort sélectionné  */}
      {selectedSpell && (
        <div style={resultStyle}>
          <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
            {selectedSpell.name}
          </h2>
          {Object.entries(selectedSpell).map(([key, value]) => (
            <p key={key}>
              <strong>{key}</strong>:{" "}
              {typeof value === "object" ? JSON.stringify(value) : value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  width: "100%",
  maxWidth: "500px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
};

const dropdownStyle = {
  listStyleType: "none",
  padding: 0,
  cursor: "pointer",
  backgroundColor: "#f0f0f0",
  border: "1px solid #ccc",
  width: "100%",
  maxWidth: "500px",
  position: "absolute",
  zIndex: 1000,
  top: "60px",
  maxHeight: "400px",
  overflowY: "auto",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  marginTop: "5px",
};

const itemStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

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
