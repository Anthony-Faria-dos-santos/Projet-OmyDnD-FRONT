import { useState } from "react";
import spellsData from "../../data/spells.json";
import classesData from "../../data/classes.json";
import raceData from "../../data/races.json";
import abilitiesData from "../../data/abilities.json";
import backgroundData from "../../data/backgrounds.json";
import conditionsData from "../../data/conditions.json";
import talentsData from "../../data/talents.json";

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

  // Recherche de abilities, permet de définir un état initial pour la barre de recherche et le menu déroulant
  const [queryAbility, setQueryAbility] = useState("");
  const [showDropdownAbility, setShowDropdownAbility] = useState(false);

  // Recherche de background, permet de définir un état initial pour la barre de recherche et le menu déroulant
  const [queryBackground, setQueryBackground] = useState("");
  const [showDropdownBackground, setShowDropdownBackground] = useState(false);

  // Recherche de conditions, permet de définir un état initial pour la barre de recherche et le menu déroulant
  const [queryCondition, setQueryCondition] = useState("");
  const [showDropdownCondition, setShowDropdownCondition] = useState(false);

  // Recherche de talents, permet de définir un état initial pour la barre de recherche et le menu déroulant
  const [queryTalent, setQueryTalent] = useState("");
  const [showDropdownTalent, setShowDropdownTalent] = useState(false);

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
    higher_level: "Niveau supérieur",
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

  // Fonctions pour gérer la sélection d'une ability dans le menu déroulant
  const handleSelectAbility = () => {
    const abilityUrl = `/sanctuary/abilities/`;
    window.open(abilityUrl, "_blank");
    setShowDropdownAbility(false);
    setQueryAbility("");
  };



  // Fonctions pour gérer la sélection d'un background dans le menu déroulant
  const handleSelectBackground = (background) => {
    const backgroundUrl = `/sanctuary/backgrounds/${background.index}`;
    window.open(backgroundUrl, "_blank");
    setShowDropdownBackground(false);
    setQueryBackground("");
  };

  // Fonctions pour gérer la sélection d'une condition dans le menu déroulant
  const handleSelectCondition = () => {
    const conditionUrl = `/sanctuary/conditions/`;
    window.open(conditionUrl, "_blank");
    setShowDropdownCondition(false);
    setQueryCondition("");
  };



  // Fonctions pour gérer la sélection d'un talent dans le menu déroulant
  const handleSelectTalent = () => {
    const talentUrl = `/sanctuary/skills/`;
    window.open(talentUrl, "_blank");
    setShowDropdownTalent(false);
    setQueryTalent("");
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
              <strong>{key}</strong>: {value}
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

      {/* Barre de recherche pour les abilities */}
      <input
        type="search"
        placeholder="Rechercher une abilitée..."
        value={queryAbility}
        autoComplete="off"
        onChange={(e) => setQueryAbility(e.target.value)}
        onFocus={() => setShowDropdownAbility(true)}
        style={inputStyle}
      />

      {/* Menu déroulant pour les abilities */}
      {showDropdownAbility && queryAbility && (
        <ul style={dropdownStyle}>
          {abilitiesData
            .filter((ability) =>
              ability.name.toLowerCase().includes(queryAbility.toLowerCase())
            )
            .slice(0, 20)
            .map((ability, index) => (
              <li
                key={index}
                onClick={() => handleSelectAbility(ability)}
                style={itemStyle}
              >
                {ability.name}
              </li>
            ))}
        </ul>
      )}



      {/* Barre de recherche pour les backgrounds */}
      <input
        type="search"
        placeholder="Rechercher un background..."
        value={queryBackground}
        autoComplete="off"
        onChange={(e) => setQueryBackground(e.target.value)}
        onFocus={() => setShowDropdownBackground(true)}
        style={inputStyle}
      />

      {/* Menu déroulant pour les backgrounds */}
      {showDropdownBackground && queryBackground && (
        <ul style={dropdownStyle}>
          {backgroundData
            .filter((background) =>
              background.name
                .toLowerCase()
                .includes(queryBackground.toLowerCase())
            )
            .slice(0, 20)
            .map((background, index) => (
              <li
                key={index}
                onClick={() => handleSelectBackground(background)}
                style={itemStyle}
              >
                {background.name}
              </li>
            ))}
        </ul>
      )}

      {/* Barre de recherche pour les conditions */}
      <input
        type="search"
        placeholder="Rechercher une condition..."
        value={queryCondition}
        autoComplete="off"
        onChange={(e) => setQueryCondition(e.target.value)}
        onFocus={() => setShowDropdownCondition(true)}
        style={inputStyle}
      />

      {/* Menu déroulant pour les conditions */}
      {showDropdownCondition && queryCondition && (
        <ul style={dropdownStyle}>
          {conditionsData
            .filter((condition) =>
              condition.name
                .toLowerCase()
                .includes(queryCondition.toLowerCase())
            )
            .slice(0, 20)
            .map((condition, index) => (
              <li
                key={index}
                onClick={() => handleSelectCondition(condition)}
                style={itemStyle}
              >
                {condition.name}
              </li>
            ))}
        </ul>
      )}



      {/* Barre de recherche pour les talents */}
      <input
        type="search"
        placeholder="Rechercher un talent..."
        value={queryTalent}
        autoComplete="off"
        onChange={(e) => setQueryTalent(e.target.value)}
        onFocus={() => setShowDropdownTalent(true)}
        style={inputStyle}
      />

      {/* Menu déroulant pour les talents */}
      {showDropdownTalent && queryTalent && (
        <ul style={dropdownStyle}>
          {talentsData
            .filter((talent) =>
              talent.name.toLowerCase().includes(queryTalent.toLowerCase())
            )
            .slice(0, 20)
            .map((talent, index) => (
              <li
                key={index}
                onClick={() => handleSelectTalent(talent)}
                style={itemStyle}
              >
                {talent.name}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

// Styles réutilisés pour les différents éléments de notre composant

const containerStyle = {
  display: "flex", // Organiser les éléments horizontalement
  flexDirection: "column", // Organiser les éléments verticalement
  alignItems: "center", // Centrer horizontalement
  justifyContent: "center", // Centrer verticalement
  width: "100%", // Assurer que le conteneur a la même largeur que l'écran
  marginTop: "50px", // Ajouter un peu d'espace en haut
  position: "relative", // Positionner les éléments enfants par rapport à ce conteneur
  fontFamily: "sans-serif", // Changer la police d'écriture
};

const closeButtonStyle = {
  position: "absolute", // Positionner le bouton par rapport au résultat
  top: "30px", // Décaler le bouton vers le bas
  justifyContent: "center", // Centrer horizontalement
  border: "none", // Supprimer la bordure
  background: "transparent", // Rendre le bouton transparent
  cursor: "pointer", // Changer le curseur pour indiquer que l'élément est cliquable
  fontWeight: "bold", // Mettre en gras
  fontSize: "20px", // Augmenter la taille de la croix
};

const inputStyle = {
  padding: "10px", // Ajouter un peu d'espace autour de la barre de recherche
  width: "100%", // Assure que la barre de recherche a la même largeur que le conteneur
  maxWidth: "500px", // Limiter la largeur de la barre de recherche
  borderRadius: "8px", // Ajouter des coins arrondis
  border: "1px solid #ccc", // Ajouter une bordure autour de la barre de recherche
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Ajouter une ombre
  marginBottom: "20px", // Ajouter un peu d'espace entre chaque barre de recherche
};

const dropdownStyle = {
  listStyleType: "none", // Supprimer les puces
  padding: 0, // Supprimer le padding par défaut
  cursor: "pointer", // Changer le curseur pour indiquer que l'élément est cliquable
  backgroundColor: "#f0f0f0", // Ajouter une couleur de fond
  border: "1px solid #ccc", // Ajouter une bordure autour de la liste déroulante
  width: "100%", // Assurer que la liste déroulante a la même largeur que la barre de recherche
  maxWidth: "500px", // Limiter la largeur de la liste déroulante
  position: "absolute", // Positionner la liste déroulante par rapport à la barre de recherche
  zIndex: 1000, // Assurer que la liste déroulante est au-dessus de tout le reste
  top: "0%", // Décaler juste en dessous de la barre de recherche
  left: "50%", // Centrer la liste déroulante  
  maxHeight: "600px", // Limiter la hauteur de la liste déroulante
  overflowY: "auto", // Ajouter une barre de défilement si nécessaire
  borderRadius: "8px", // Ajouter des coins arrondis
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",  // Ajouter une ombre
};

const itemStyle = {
  padding: "10px", // Ajouter un peu d'espace autour de chaque élément
  borderBottom: "1px solid #ddd", // Ajouter une bordure en bas de chaque élément
};

const resultStyle = {
  marginTop: "20px", // Ajouter un peu d'espace entre la barre de recherche et le résultat    
  padding: "50px", // Ajouter un peu d'espace autour du résultat
  backgroundImage: "url('/images/Vertical_Default_old_parchment.png')", // Ajouter une image de fond
  backgroundSize: "cover", // Assure que l'image de fond couvre tout l'élément
  backgroundPosition: "center", // Centre l'image dans l'élément  
  width: "100%", // Assure que le résultat a la même largeur que la barre de recherche
  maxWidth: "500px", // Limiter la largeur du résultat
  borderRadius: "50px", // Ajouter des coins arrondis
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Ajouter une ombre
  position: "absolute", // Positionner le résultat par rapport à la barre de recherche
  top: "390px", // Décaler juste en dessous de la barre de recherche
  fontFamily: "Cursive", // Changer la police d'écriture
  textAlign: "center", // Assure que le texte à l'intérieur est centré horizontalement
};

export default Search;
