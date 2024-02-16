import alignments from "../../../data/alignments.json";

import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createCharacter,
  fetchBackgrounds,
  fetchClasses,
  fetchRaces,
} from "../../../store/slices/characterSlice.js";

function CharacterCreator() {
  const [selectedRace, setSelectedRace] = useState(null);
  const [strength, setStrength] = useState(10);
  const [dexterity, setDexterity] = useState(10);
  const [constitution, setConstitution] = useState(10);
  const [inteligence, setinteligence] = useState(10);
  const [wisdom, setWisdom] = useState(10);
  const [charisma, setCharisma] = useState(10);
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { races, classes, backgrounds } = useSelector(
    (state) => state.character
  );

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

  const handleRaceChange = (event) => {
    const raceId = parseInt(event.target.value, 10);
    const race = races.find((r) => r.id === raceId);
    setSelectedRace(race);
  };

  const handleError = () => {
    setVideoError(true);
  };

  useEffect(() => {
    dispatch(fetchRaces());
    dispatch(fetchClasses());
    dispatch(fetchBackgrounds());
  }, [dispatch]);

  console.log('Races data:', races);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const characterData = {
      user_id: user.id,
      name: formData.get("name"),
      race_id: parseInt(formData.get("races"), 10),
      classe_id: parseInt(formData.get("classes"), 10),
      background_id: parseInt(formData.get("backgrounds"), 10),
      alignment: formData.get("alignment"),
      strength: parseInt(formData.get("strength"), 10),
      dexterity: parseInt(formData.get("dexterity"), 10),
      constitution: parseInt(formData.get("constitution"), 10),
      inteligence: parseInt(formData.get("inteligence"), 10),
      wisdom: parseInt(formData.get("wisdom"), 10),
      charisma: parseInt(formData.get("charisma"), 10),
    };
    console.log("characterData:", characterData);
    dispatch(createCharacter(characterData))
      .unwrap()
      .then((createdCharacter) => {
        console.log("Character created successfully:", createdCharacter);
        console.log("Character name :", characterData.name);
        navigate("/tool/character-creator/character-sheet");
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
                      className="h-full w-full object-cover object-center rounded-3xl"
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
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Kirikou"
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
                      name="races"
                      autoComplete="races-name"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                      onChange={handleRaceChange}
                    >
                      <option value="" disabled selected>Sélectionner une race</option>
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
                      autoComplete="classes-name"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                    >
                      <option value="" disabled selected>Sélectionner une classe</option>
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
                      autoComplete="backgrounds-name"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                    >
                      <option value="" disabled selected>Sélectionner un historique</option>
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
                      autoComplete="alignment"
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                    >
                      <option value="" disabled selected>Sélectionner un alignement</option>
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
                      <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                        <select
                          name="strength"
                          id="strength"
                          autoComplete="strength"
                          className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
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
                        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
                        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
                      <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                        <select
                          name="dexterity"
                          id="dexterity"
                          autoComplete="dexterity"
                          className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
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
                        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
                        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
                      <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                        <select
                          name="constitution"
                          id="constitution"
                          autoComplete="constitution"
                          className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
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
                        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
                        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
                      <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                        <select
                          name="inteligence"
                          id="inteligence"
                          autoComplete="inteligence"
                          className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
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
                        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
                        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
                      <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                        <select
                          name="wisdom"
                          id="wisdom"
                          autoComplete="wisdom"
                          className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
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
                        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
                        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
                      <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                        <select
                          name="charisma"
                          id="charisma"
                          autoComplete="charisma"
                          className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
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
                        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
                        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
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
                  className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Générer
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
