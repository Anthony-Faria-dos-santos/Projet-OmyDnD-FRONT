import { useState } from "react";
import spellsData from "../../data/spells.json";
import classesData from "../../data/classes.json";
import raceData from "../../data/races.json";
import abilitiesData from "../../data/abilities.json";
import armorData from "../../data/armors.json";
import backgroundData from "../../data/backgrounds.json";
import conditionsData from "../../data/conditions.json";
import simpleWeaponsData from "../../data/simple.weapons.json";
import warWeaponsData from "../../data/war.weapons.json";
import weaponPropertiesData from "../../data/weapons.properties.json";
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

  // Recherche de armor, permet de définir un état initial pour la barre de recherche et le menu déroulant
  const [queryArmor, setQueryArmor] = useState("");
  const [showDropdownArmor, setShowDropdownArmor] = useState(false);

  // Recherche de background, permet de définir un état initial pour la barre de recherche et le menu déroulant
  const [queryBackground, setQueryBackground] = useState("");
  const [showDropdownBackground, setShowDropdownBackground] = useState(false);

  // Recherche de conditions, permet de définir un état initial pour la barre de recherche et le menu déroulant
  const [queryCondition, setQueryCondition] = useState("");
  const [showDropdownCondition, setShowDropdownCondition] = useState(false);

  // Recherche de simple weapons, permet de définir un état initial pour la barre de recherche et le menu déroulant
  const [querySimpleWeapon, setQuerySimpleWeapon] = useState("");
  const [showDropdownSimpleWeapon, setShowDropdownSimpleWeapon] =
    useState(false);

  // Recherche de war weapons, permet de définir un état initial pour la barre de recherche et le menu déroulant
  const [queryWarWeapon, setQueryWarWeapon] = useState("");
  const [showDropdownWarWeapon, setShowDropdownWarWeapon] = useState(false);

  // Recherche de weapons properties, permet de définir un état initial pour la barre de recherche et le menu déroulant
  const [queryWeaponProperty, setQueryWeaponProperty] = useState("");
  const [showDropdownWeaponProperty, setShowDropdownWeaponProperty] =
    useState(false);

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
  const handleSelectAbility = (ability) => {
    const abilityUrl = `/sanctuary/abilitie/${ability.index}`;
    window.open(abilityUrl, "_blank");
    setShowDropdownAbility(false);
    setQueryAbility("");
  };

  // Fonctions pour gérer la sélection d'une armor dans le menu déroulant
  const handleSelectArmor = (armor) => {
    const armorUrl = `/sanctuary/armor/${armor.index}`;
    window.open(armorUrl, "_blank");
    setShowDropdownArmor(false);
    setQueryArmor("");
  };

  // Fonctions pour gérer la sélection d'un background dans le menu déroulant
  const handleSelectBackground = (background) => {
    const backgroundUrl = `/sanctuary/background/${background.index}`;
    window.open(backgroundUrl, "_blank");
    setShowDropdownBackground(false);
    setQueryBackground("");
  };

  // Fonctions pour gérer la sélection d'une condition dans le menu déroulant
  const handleSelectCondition = (condition) => {
    const conditionUrl = `/sanctuary/condition/${condition.index}`;
    window.open(conditionUrl, "_blank");
    setShowDropdownCondition(false);
    setQueryCondition("");
  };

  // Fonctions pour gérer la sélection d'une simple weapon dans le menu déroulant
  const handleSelectSimpleWeapon = (simpleWeapon) => {
    const simpleWeaponUrl = `/sanctuary/simpleWeapons/${simpleWeapon.index}`;
    window.open(simpleWeaponUrl, "_blank");
    setShowDropdownSimpleWeapon(false);
    setQuerySimpleWeapon("");
  };

  // Fonctions pour gérer la sélection d'une war weapon dans le menu déroulant
  const handleSelectWarWeapon = (warWeapon) => {
    const warWeaponUrl = `/sanctuary/warWeapons/${warWeapon.index}`;
    window.open(warWeaponUrl, "_blank");
    setShowDropdownWarWeapon(false);
    setQueryWarWeapon("");
  };

  // Fonctions pour gérer la sélection d'une weapon property dans le menu déroulant
  const handleSelectWeaponProperty = (weaponProperty) => {
    const weaponPropertyUrl = `/sanctuary/weaponProperties/${weaponProperty.index}`;
    window.open(weaponPropertyUrl, "_blank");
    setShowDropdownWeaponProperty(false);
    setQueryWeaponProperty("");
  };

  // Fonctions pour gérer la sélection d'un talent dans le menu déroulant
  const handleSelectTalent = (talent) => {
    const talentUrl = `/sanctuary/talents/${talent.index}`;
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
        placeholder="Rechercher une ability..."
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

      {/* Barre de recherche pour les armures */}
      <input
        type="search"
        placeholder="Rechercher une armure..."
        value={queryArmor}
        autoComplete="off"
        onChange={(e) => setQueryArmor(e.target.value)}
        onFocus={() => setShowDropdownArmor(true)}
        style={inputStyle}
      />

      {/* Menu déroulant pour les armures */}
      {showDropdownArmor && queryArmor && (
        <ul style={dropdownStyle}>
          {armorData
            .filter((armor) =>
              armor.name.toLowerCase().includes(queryArmor.toLowerCase())
            )
            .slice(0, 20)
            .map((armor, index) => (
              <li
                key={index}
                onClick={() => handleSelectArmor(armor)}
                style={itemStyle}
              >
                {armor.name}
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

      {/* Barre de recherche pour les simple weapons */}
      <input
        type="search"
        placeholder="Rechercher une arme simple..."
        value={querySimpleWeapon}
        autoComplete="off"
        onChange={(e) => setQuerySimpleWeapon(e.target.value)}
        onFocus={() => setShowDropdownSimpleWeapon(true)}
        style={inputStyle}
      />

      {/* Menu déroulant pour les simple weapons */}
      {showDropdownSimpleWeapon && querySimpleWeapon && (
        <ul style={dropdownStyle}>
          {simpleWeaponsData
            .filter((simpleWeapon) =>
              simpleWeapon.name
                .toLowerCase()
                .includes(querySimpleWeapon.toLowerCase())
            )
            .slice(0, 20)
            .map((simpleWeapon, index) => (
              <li
                key={index}
                onClick={() => handleSelectSimpleWeapon(simpleWeapon)}
                style={itemStyle}
              >
                {simpleWeapon.name}
              </li>
            ))}
        </ul>
      )}

      {/* Barre de recherche pour les war weapons */}
      <input
        type="search"
        placeholder="Rechercher une arme de guerre..."
        value={queryWarWeapon}
        autoComplete="off"
        onChange={(e) => setQueryWarWeapon(e.target.value)}
        onFocus={() => setShowDropdownWarWeapon(true)}
        style={inputStyle}
      />

      {/* Menu déroulant pour les war weapons */}
      {showDropdownWarWeapon && queryWarWeapon && (
        <ul style={dropdownStyle}>
          {warWeaponsData
            .filter((warWeapon) =>
              warWeapon.name
                .toLowerCase()
                .includes(queryWarWeapon.toLowerCase())
            )
            .slice(0, 20)
            .map((warWeapon, index) => (
              <li
                key={index}
                onClick={() => handleSelectWarWeapon(warWeapon)}
                style={itemStyle}
              >
                {warWeapon.name}
              </li>
            ))}
        </ul>
      )}

      {/* Barre de recherche pour les weapon properties */}
      <input
        type="search"
        placeholder="Rechercher une propriété d'arme..."
        value={queryWeaponProperty}
        autoComplete="off"
        onChange={(e) => setQueryWeaponProperty(e.target.value)}
        onFocus={() => setShowDropdownWeaponProperty(true)}
        style={inputStyle}
      />

      {/* Menu déroulant pour les weapon properties */}
      {showDropdownWeaponProperty && queryWeaponProperty && (
        <ul style={dropdownStyle}>
          {weaponPropertiesData
            .filter((weaponProperty) =>
              weaponProperty.name
                .toLowerCase()
                .includes(queryWeaponProperty.toLowerCase())
            )
            .slice(0, 20)
            .map((weaponProperty, index) => (
              <li
                key={index}
                onClick={() => handleSelectWeaponProperty(weaponProperty)}
                style={itemStyle}
              >
                {weaponProperty.name}
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
  top: "0%", // Décaler juste en dessous de la barre de recherche
  left: "70%", 
  // transform: "translateX(100%)",
  maxHeight: "600px",
  overflowY: "auto",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
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
  top: "620px",
  fontFamily: "Cursive",
};

export default Search;
