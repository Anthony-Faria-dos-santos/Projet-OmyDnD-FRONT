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
    <div className="containerStyle">
      {/* Barre de recherche pour les sorts */}
      <input
        type="search"
        name="querySpell"
        placeholder="Rechercher un sort..."
        value={querySpell}
        autoComplete="off"
        onChange={(e) => setQuerySpell(e.target.value)}
        onFocus={() => setShowDropdownSpell(true)}
        className="inputStyle"
      />

      {/* Menu déroulant pour les sorts */}
      {showDropdownSpell && querySpell && spellsData
        .filter((spell) => spell.name.toLowerCase().includes(querySpell.toLowerCase())).length > 0 && (
          <ul className="dropdownStyle">
            {spellsData
              .filter((spell) =>
                spell.name.toLowerCase().includes(querySpell.toLowerCase())
              )
              .slice(0, 20)
              .map((spell, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSpell(spell)}
                  className="itemStyle"
                >
                  {spell.name}
                </li>
              ))}
          </ul>
        )}

      {/* Affichage du sort sélectionné  */}
      {selectedSpell && (
        <div className="resultStyle">
          <button onClick={handleCloseResult} className="closeButtonStyle">
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
        className="inputStyle"
      />

      {/* Menu déroulant pour les classes */}
      {showDropdownClass && queryClass && classesData
        .filter((cls) => cls.name.toLowerCase().includes(queryClass.toLowerCase())).length > 0 && (
          <ul className="dropdownStyle">
            {classesData
              .filter((cls) =>
                cls.name.toLowerCase().includes(queryClass.toLowerCase())
              )
              .slice(0, 20)
              .map((cls, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectClass(cls)}
                  className="itemStyle"
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
        className="inputStyle"
      />

      {/* Menu déroulant pour les races */}
      {showDropdownRace && queryRace && raceData
        .filter((race) => race.name.toLowerCase().includes(queryRace.toLowerCase())).length > 0 && (
          <ul className="dropdownStyle">
            {raceData
              .filter((race) =>
                race.name.toLowerCase().includes(queryRace.toLowerCase())
              )
              .slice(0, 20)
              .map((race, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectRace(race)}
                  className="itemStyle"
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
        className="inputStyle"
      />

      {/* Menu déroulant pour les abilities */}
      {showDropdownAbility && queryAbility && abilitiesData
        .filter((ability) => ability.name.toLowerCase().includes(queryAbility.toLowerCase())).length > 0 && (
          <ul className="dropdownStyle">
            {abilitiesData
              .filter((ability) =>
                ability.name.toLowerCase().includes(queryAbility.toLowerCase())
              )
              .slice(0, 20)
              .map((ability, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectAbility(ability)}
                  className="itemStyle"
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
        className="inputStyle"
      />

      {/* Menu déroulant pour les backgrounds */}
      {showDropdownBackground && queryBackground && backgroundData
        .filter((background) => background.name.toLowerCase().includes(queryBackground.toLowerCase())).length > 0 && (
          <ul className="dropdownStyle">
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
                  className="itemStyle"
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
        className="inputStyle"
      />

      {/* Menu déroulant pour les conditions */}
      {showDropdownCondition && queryCondition && conditionsData
        .filter((condition) => condition.name.toLowerCase().includes(queryCondition.toLowerCase())).length > 0 && (
          <ul className="dropdownStyle">
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
                  className="itemStyle"
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
        className="inputStyle"
      />

      {/* Menu déroulant pour les talents */}
      {showDropdownTalent && queryTalent && talentsData
        .filter((talent) => talent.name.toLowerCase().includes(queryTalent.toLowerCase())).length > 0 && (
          <ul className="dropdownStyle">
            {talentsData
              .filter((talent) =>
                talent.name.toLowerCase().includes(queryTalent.toLowerCase())
              )
              .slice(0, 20)
              .map((talent, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectTalent(talent)}
                  className="itemStyle"
                >
                  {talent.name}
                </li>
              ))}
          </ul>
        )}
    </div>
  );
}

export default Search;
