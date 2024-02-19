import { useState } from "react";
import spellsData from "../../data/spells.json";
import classesData from "../../data/classes.json";
import raceData from "../../data/races.json";

// Composant dédié à la recherche d'informations dans le sanctuaire au moyen de barres de recherche.
function Search() {
  // Gestions des states des différentes barres de recherche et de leur menu déroulant

  // Recherche de sorts, permet de définir un état initial pour la barre de recherche et le menu déroulant
  const [querySpell, setQuerySpell] = useState("");
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [showDropdownSpell, setShowDropdownSpell] = useState(false);

  // Recherche de classes, permet de définir un état initial pour la barre de recherche et le menu déroulant
  const [queryClass, setQueryClass] = useState("");
  const [showDropdownClass, setShowDropdownClass] = useState(false);

  // Recherche de races, permet de définir un état initial pour la barre de recherche et le menu déroulant
  const [queryRace, setQueryRace] = useState("");
  const [showDropdownRace, setShowDropdownRace] = useState(false);

  // Fonctions pour gérer la sélection d'un sort dans le menu déroulant
  const handleSelectSpell = (spell) => {
    // cible le sort sélectionné via la fonction setSelectedSpell
    setSelectedSpell(spell);
    // Effacer l'affichage du menu déroulant
    setShowDropdownSpell(false);
    // Effacer la recherche de sort lorsqu'un sort est sélectionné
    setQuerySpell("");
  };

  // Fonction pour fermer la boîte de résultat
  const handleCloseResult = () => {
    setSelectedSpell(null);
  };

  // Fonctions pour gérer la sélection d'une classe dans le menu déroulant
  const handleSelectClass = (cls) => {
    // Pointe vers l'URL de la classe sélectionnée
    const classUrl = `/sanctuary/classes/${cls.index}`;
    // On s'assure d'ouvrir le lien dans un nouvel onglet
    window.open(classUrl, "_blank");
    setShowDropdownClass(false);
    setQueryClass("");
  };

  // Fonctions pour gérer la sélection d'une race dans le menu déroulant
  const handleSelectRace = (race) => {
    const raceUrl = `/sanctuary/races/${race.index}`;
    window.open(raceUrl, "_blank");
    setShowDropdownRace(false);
    setQueryRace("");
  };

  return (
    <div style={containerStyle}>
      {/* Barre de recherche pour les sorts */}
      <input
        type="search"
        name="querySpell"
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

      {/* Affichage du sort sélectionné  */}
      {selectedSpell && (
        <div style={resultStyle}>
          <button onClick={handleCloseResult} style={closeButtonStyle}>
            X
          </button>
          <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
            {selectedSpell.name}
          </h2>
          {/* Affichage des détails du sort et traduction des keys en francais via la fonction keyTranslation */}          
          {Object.entries(keyTranslation(selectedSpell)).map(([key, value]) => (
            <p key={key}>
              <strong>{key}</strong>:{" "}
              {typeof value === "object" ? JSON.stringify(value) : value}
            </p>
          ))}
        </div>
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

      {/* Barre de recherche pour les races */}
      <input
        type="search"
        placeholder="Rechercher une race..."
        value={queryRace}
        autoComplete="off"
        onChange={(e) => setQueryRace(e.target.value)}
        onFocus={() => setShowDropdownRace(true)}
        style={inputStyle}
      />

      {/* Menu déroulant pour les races */}
      {showDropdownRace && queryRace && (
        <ul style={dropdownStyle}>
          {raceData
            .filter((race) =>
              race.name.toLowerCase().includes(queryRace.toLowerCase())
            )
            .slice(0, 20)
            .map((race, index) => (
              <li
                key={index}
                onClick={() => handleSelectRace(race)}
                style={itemStyle}
              >
                {race.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

// Dictionnaire pour traduire les clés de l'objet sort en français
const dictionaryFR = {
  name: "Nom",
  level: "Niveau",
  desc: "Description",
  range: "Portée",
  components: "Composants",
  material: "Matériel",
  ritual: "Rituel",
  duration: "Durée",
  concentration: "Concentration",
  casting_time: "Temps d'incantation",
  school: "École",
  class: "classes",
  archetype: "Archétype",
  domains: "Domaines",
  higher_level : "Niveau supérieur",
  oaths: "Serments",
  circles: "Cercles",
};

// Fonction pour traduire les clés de l'objet sort en français
const keyTranslation = (object) => {
  const translatedObject = {};
  Object.entries(object).forEach(([key, value]) => {
    const translatedKey = dictionaryFR[key] || key;
    translatedObject[translatedKey] = value;
  });
  return translatedObject;
  }

// Styles réutilisés pour les différents éléments de notre composant

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  marginTop: "50px",
  position: "relative",
  fontFamily: "sans-serif",
};

const closeButtonStyle = {
  position: "absolute",
  top: "5px",
  right: "5px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "20px",
};

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
  top: "150px",
  fontFamily: "Cursive",
};

export default Search;
