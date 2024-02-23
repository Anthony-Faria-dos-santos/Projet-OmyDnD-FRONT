// Importe les dépendances nécessaires, y compris les hooks React et les actions Redux.
import { Tab } from "@headlessui/react"; // Importe le composant Tab de Headless UI pour une interface utilisateur interactive.
import { useEffect, useState } from "react"; // Importe les hooks useEffect et useState de React pour gérer l'état et les effets de bord.
import { useDispatch, useSelector } from "react-redux"; // Importe les hooks useDispatch et useSelector de Redux pour accéder au store et dispatcher des actions.
import { useNavigate } from "react-router-dom"; // Importe le hook useNavigate de React Router pour la navigation programmée.
import alignments from "../../../data/alignments.json"; // Importe les alignements depuis un fichier JSON local.
import {
  createCharacter,
  fetchBackgrounds,
  fetchClasses,
  fetchRaces,
} from "../../../store/slices/characterSlice.js"; // Importe les actions asynchrones définies dans characterSlice.

// Définit le composant fonctionnel CharacterCreator.
function CharacterCreator() {
  // Initialise les états locaux pour stocker les entrées de l'utilisateur et les sélections du formulaire.
  const [name, setName] = useState(''); // Stocke le nom du personnage.
  const [selectedRace, setSelectedRace] = useState(''); // Stocke la race sélectionnée.
  const [selectedClass, setSelectedClass] = useState(''); // Stocke la classe sélectionnée.
  const [selectedBackground, setSelectedBackground] = useState(''); // Stocke le background sélectionné.
  const [alignment, setAlignment] = useState(''); // Stocke l'alignement sélectionné.
  // Initialise les états pour les caractéristiques du personnage.
  const [strength, setStrength] = useState(0);
  const [dexterity, setDexterity] = useState(0);
  const [constitution, setConstitution] = useState(0);
  const [inteligence, setinteligence] = useState(0);
  const [wisdom, setWisdom] = useState(0);
  const [charisma, setCharisma] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false); // Détermine si le formulaire est valide pour la soumission.
  const [videoError, setVideoError] = useState(false); // Gère les erreurs de chargement de la vidéo de fond.

  // Utilise les hooks useDispatch et useSelector pour interagir avec le store Redux.
  const navigate = useNavigate(); // Permet de naviguer entre les routes.
  const dispatch = useDispatch(); // Permet de dispatcher des actions Redux.
  // Sélectionne les données de l'utilisateur et les données nécessaires du store Redux.
  const { user } = useSelector((state) => state.auth);
  const { races, classes, backgrounds } = useSelector((state) => state.character);

  // Gère les changements des caractéristiques en mettant à jour l'état local correspondant.
  const handleCaractChange = (event, caract) => {
    const value = parseInt(event.target.value, 10);
    switch (caract) {
      case 'strength':
        setStrength(value);
        break;
      case 'dexterity':
        setDexterity(value);
        break;
      case 'constitution':
        setConstitution(value);
        break;
      case 'inteligence':
        setinteligence(value);
        break;
      case 'wisdom':
        setWisdom(value);
        break;
      case 'charisma':
        setCharisma(value);
        break;
      default:
        break;
    }
  };

  // Gère le changement de sélection de la race et met à jour l'état local selectedRace.
  const handleRaceChange = (event) => {
    const raceId = parseInt(event.target.value, 10);
    const race = races.find((r) => r.id === raceId);
    setSelectedRace(race);
  };

  // Fonction appelée en cas d'erreur de chargement de la vidéo de fond.
  const handleError = () => {
    setVideoError(true);
  };

  // Utilise useEffect pour charger les races, classes et backgrounds au chargement du composant.
  useEffect(() => {
    dispatch(fetchRaces());
    dispatch(fetchClasses());
    dispatch(fetchBackgrounds());
  }, [dispatch]);

  // Vérifie la validité du formulaire chaque fois que les états changent.
  useEffect(() => {
    const isValid = name && selectedRace && selectedClass && selectedBackground && alignment && strength && dexterity && constitution && inteligence && wisdom && charisma;
    setIsFormValid(isValid);
  }, [name, selectedRace, selectedClass, selectedBackground, alignment, strength, dexterity, constitution, inteligence, wisdom, charisma]);

  // Gère la soumission du formulaire, créant un personnage avec les données saisies.
  const handleSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page.
    const formData = new FormData(event.target);
    // Construit l'objet characterData à partir des valeurs du formulaire et des états locaux.
    const characterData = {
      user_id: user.id,
      name: formData.get("name"),
      race_id: parseInt(formData.get("races"), 10),
      classe_id: parseInt(formData.get("classes"), 10),
      background_id: parseInt(formData.get("backgrounds"), 10),
      alignment: formData.get("alignment"),
      // Calcule les caractéristiques finales en ajoutant les bonus de race.
      strength: strength + (selectedRace ? selectedRace.strength_bonus : 0),
      dexterity: dexterity + (selectedRace ? selectedRace.dexterity_bonus : 0),
      constitution: constitution + (selectedRace ? selectedRace.constitution_bonus : 0),
      inteligence: inteligence + (selectedRace ? selectedRace.inteligence_bonus : 0),
      wisdom: wisdom + (selectedRace ? selectedRace.wisdom_bonus : 0),
      charisma: charisma + (selectedRace ? selectedRace.charisma_bonus : 0),
    };
    // Dispatch l'action createCharacter avec characterData et gère la réponse.
    dispatch(createCharacter(characterData))
      .unwrap()
      .then((createdCharacter) => {
        // Redirige vers la feuille de personnage du personnage créé en cas de succès.
        navigate("/tool/character-creator/character-sheet", { state: { characterId: createdCharacter.id } });
      })
      .catch((error) => console.error("Error creating character:", error));
  };

  return (
    <form className="pl-8 pr-8 pt-3" onSubmit={handleSubmit}>
      <div className="pb-10 mx-auto sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid md:grid-cols-2 md:items-start md:gap-x-8">
            <Tab.Group as="div" className="flex flex-col-reverse">
              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                <Tab.Panel key="Character-Creator">
                  {videoError ? (
                    <img
                      className="h-full w-full object-cover object-center rounded-3xl"
                      src="/images/forge-2.jpg"
                      alt=""
                    />
                  ) : (
                    <video
                      className="h-full w-full object-cover object-center sm:rounded-3xl rounded-lg"
                      autoPlay
                      loop
                      muted
                      src="/f1d4f024-a7f4-499e-8f09-25d29fc9f551.mp4"
                      onError={handleError}
                    >
                    </video>
                  )}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-50">
                Outil de création
              </h1>

              <div>
                <div className="mb-5 sm:w-1/3 w-full">
                  <label
                    htmlFor="jet-de-sauvegarde"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Nom du personnage
                  </label>
                  <div className="mt-1 mb-1">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        className="w-full ml-1 flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="ex : Mandolphina"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-5 sm:col-span sm:w-1/3 w-full">
                  <label
                    htmlFor="races"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Races
                  </label>
                  <div className="mt-2">
                    <select
                      id="races"
                      value={selectedRace?.id || ""}
                      name="races"
                      autoComplete="races-name"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                      onChange={handleRaceChange}
                    >
                      <option value="" disabled>Sélectionner une race</option>
                      {races.map((race) => (
                        <option key={race.id} value={race.id}>
                          {race.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-5 sm:col-span-1 sm:w-1/3 w-full">
                  <label
                    htmlFor="classes"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Classes
                  </label>
                  <div className="mt-2">
                    <select
                      id="classes"
                      name="classes"
                      value={selectedClass || ""}
                      autoComplete="classes-name"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                      onChange={(e) => setSelectedClass(e.target.value)}
                    >
                      <option value="" disabled>Sélectionner une classe</option>
                      {classes.map((classe) => (
                        <option key={classe.id} value={classe.id}>
                          {classe.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-2 sm:col-span-1 sm:w-1/3 w-full">
                  <label
                    htmlFor="backgrounds"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Personnalités et Historiques
                  </label>
                  <div className="mt-2">
                    <select
                      id="backgrounds"
                      name="backgrounds"
                      value={selectedBackground || ""}
                      autoComplete="backgrounds-name"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                      onChange={(e) => setSelectedBackground(e.target.value)}
                    >
                      <option value="" disabled>Sélectionner un historique</option>
                      {backgrounds.map((background) => (
                        <option key={background.id} value={background.id}>
                          {background.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mb-5 sm:col-span-1 sm:w-1/3 w-full">
                  <label
                    htmlFor="alignment"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Alignement
                  </label>
                  <div className="mt-2">
                    <select
                      id="alignment"
                      name="alignment"
                      value={alignment || ""}
                      autoComplete="alignment"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                      onChange={(e) => setAlignment(e.target.value)}
                    >
                      <option value="" disabled>Sélectionner un alignement</option>
                      {alignments.map((alignment) => (
                        <option key={alignment.index} value={alignment.name}>
                          {alignment.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="w-2/3 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:grid-rows-3">
                <div className="sm:col-span-1 grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-1 sm:grid-cols-2 sm:grid-rows-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="jet-de-sauvegarde"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Force
                    </label>
                    <div className="mt-1 mb-1">
                      <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                        <select
                          id="strength"
                          name="strength"
                          value={strength || ""}
                          autoComplete="strength"
                          className="text-center block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 [&_*]:text-white"
                          onChange={(e) => handleCaractChange(e, 'strength')}
                        >
                          <option value="" disabled>Sélectionner une valeur</option>
                          {Array.from({ length: 18 }, (_, i) => i + 1).map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Bonus Race
                    </label>
                    <div className="w-20 col-span-1">
                      <div className="mt-1">
                      <div className={`flex rounded-md ${selectedRace && selectedRace.strength_bonus > 0 ? "bg-green-500" : "bg-white/5"} ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500`}>
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            value={selectedRace ? `+${selectedRace.strength_bonus}` : ''}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Total
                    </label>
                    <div className="w-20 col-span-1">
                      <div className="mt-1">
                      <div className={`flex rounded-md bg-red-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500`}>
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            value={strength + (selectedRace ? selectedRace.strength_bonus : 0)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-1 grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-1 sm:grid-cols-2 sm:grid-rows-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="jet-de-sauvegarde"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Dextérité
                    </label>
                    <div className="mt-1 mb-1">
                      <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                        <select
                          id="dexterity"
                          name="dexterity"
                          value={dexterity || ""}
                          autoComplete="dexterity"
                          className="text-center block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 [&_*]:text-white"
                          onChange={(e) => handleCaractChange(e, 'dexterity')}
                        >
                          <option value="" disabled>Sélectionner une valeur</option>
                          {Array.from({ length: 18 }, (_, i) => i + 1).map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Bonus Race
                    </label>
                    <div className="w-20 col-span-1">
                      <div className="mt-1">
                      <div className={`flex rounded-md ${selectedRace && selectedRace.dexterity_bonus > 0 ? "bg-green-500" : "bg-white/5"} ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500`}>
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            value={selectedRace ? `+${selectedRace.dexterity_bonus}` : ''}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Total
                    </label>
                    <div className="w-20 col-span-1">
                      <div className="mt-1">
                      <div className={`flex rounded-md bg-red-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500`}>
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            value={dexterity + (selectedRace ? selectedRace.dexterity_bonus : 0)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-1 grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-1 sm:grid-cols-2 sm:grid-rows-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="jet-de-sauvegarde"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Constitution
                    </label>
                    <div className="mt-1 mb-1">
                      <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                        <select
                          id="constitution"
                          name="constitution"
                          value={constitution || ""}
                          autoComplete="constitution"
                          className="text-center block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 [&_*]:text-white"
                          onChange={(e) => handleCaractChange(e, 'constitution')}
                        >
                          <option value="" disabled>Sélectionner une valeur</option>
                          {Array.from({ length: 18 }, (_, i) => i + 1).map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Bonus Race
                    </label>
                    <div className="w-20 col-span-1">
                      <div className="mt-1">
                      <div className={`flex rounded-md ${selectedRace && selectedRace.constitution_bonus > 0 ? "bg-green-500" : "bg-white/5"} ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500`}>
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            value={selectedRace ? `+${selectedRace.constitution_bonus}` : ''}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Total
                    </label>
                    <div className="w-20 col-span-1">
                      <div className="mt-1">
                      <div className={`flex rounded-md bg-red-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500`}>
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            value={constitution + (selectedRace ? selectedRace.constitution_bonus : 0)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-1 grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-1 sm:grid-cols-2 sm:grid-rows-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="jet-de-sauvegarde"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      inteligence
                    </label>
                    <div className="mt-1 mb-1">
                      <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                        <select
                          id="inteligence"
                          name="inteligence"
                          value={inteligence || ""}
                          autoComplete="inteligence"
                          className="text-center block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 [&_*]:text-white"
                          onChange={(e) => handleCaractChange(e, 'inteligence')}
                        >
                          <option value="" disabled>Sélectionner une valeur</option>
                          {Array.from({ length: 18 }, (_, i) => i + 1).map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Bonus Race
                    </label>
                    <div className="w-20 col-span-1">
                      <div className="mt-1">
                      <div className={`flex rounded-md ${selectedRace && selectedRace.inteligence_bonus > 0 ? "bg-green-500" : "bg-white/5"} ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500`}>
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            value={selectedRace ? `+${selectedRace.inteligence_bonus}` : ''}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Total
                    </label>
                    <div className="w-20 col-span-1">
                      <div className="mt-1">
                      <div className={`flex rounded-md bg-red-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500`}>
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            value={inteligence + (selectedRace ? selectedRace.inteligence_bonus : 0)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-1 grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-1 sm:grid-cols-2 sm:grid-rows-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="jet-de-sauvegarde"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Sagesse
                    </label>
                    <div className="mt-1 mb-1">
                      <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                        <select
                          id="wisdom"
                          name="wisdom"
                          value={wisdom || ""}
                          autoComplete="wisdom"
                          className="text-center block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 [&_*]:text-white"
                          onChange={(e) => handleCaractChange(e, 'wisdom')}
                        >
                          <option value="" disabled>Sélectionner une valeur</option>
                          {Array.from({ length: 18 }, (_, i) => i + 1).map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Bonus Race
                    </label>
                    <div className="w-20 col-span-1">
                      <div className="mt-1">
                      <div className={`flex rounded-md ${selectedRace && selectedRace.wisdom_bonus > 0 ? "bg-green-500" : "bg-white/5"} ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500`}>
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            value={selectedRace ? `+${selectedRace.wisdom_bonus}` : ''}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Total
                    </label>
                    <div className="w-20 col-span-1">
                      <div className="mt-1">
                      <div className={`flex rounded-md bg-red-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500`}>
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            value={wisdom + (selectedRace ? selectedRace.wisdom_bonus : 0)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-1 grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-1 sm:grid-cols-2 sm:grid-rows-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="jet-de-sauvegarde"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Charisme
                    </label>
                    <div className="mt-1 mb-1">
                      <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                        <select
                          id="charisma"
                          name="charisma"
                          value={charisma || ""}
                          autoComplete="charisma"
                          className="text-center block w-full rounded-md border-0 bg-gray-800 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 [&_*]:text-white"
                          onChange={(e) => handleCaractChange(e, 'charisma')}
                        >
                          <option value="" disabled>Sélectionner une valeur</option>
                          {Array.from({ length: 18 }, (_, i) => i + 1).map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Bonus Race
                    </label>
                    <div className="w-20 col-span-1">
                      <div className="mt-1">
                      <div className={`flex rounded-md ${selectedRace && selectedRace.charisma_bonus > 0 ? "bg-green-500" : "bg-white/5"} ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500`}>
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            value={selectedRace ? `+${selectedRace.charisma_bonus}` : ''}
                          />
                        </div>
                      </div>
                    </div>

                  </div>
                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Total
                    </label>
                    <div className="w-20 col-span-1">
                      <div className="mt-1">
                      <div className={`flex rounded-md bg-red-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500`}>
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            value={charisma + (selectedRace ? selectedRace.charisma_bonus : 0)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="mt-8 flex items-center justify-start gap-x-6">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  title={!isFormValid ? "Veuillez renseigner tous les champs pour continuer." : ""}
                  className={`rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${isFormValid ? 'bg-blue-500 hover:bg-green-400 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form >
  );
}

export default CharacterCreator;
