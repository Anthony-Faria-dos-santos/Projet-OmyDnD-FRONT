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
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { races, classes, backgrounds } = useSelector(
    (state) => state.character
  );

  const handleError = () => {
    setVideoError(true);
  };

  useEffect(() => {
    dispatch(fetchRaces());
    dispatch(fetchClasses());
    dispatch(fetchBackgrounds());
  }, [dispatch]);

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
                    >
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
                      {alignments.map((alignment) => (
                        <option key={alignment.index} value={alignment.name}>
                          {alignment.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="w-1/2 mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:grid-rows-3">
                <div className="sm:col-span-1">
                  <label
                    htmlFor="jet-de-sauvegarde"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Force
                  </label>
                  <div className="mt-1 mb-1">
                    <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="number"
                        name="strength"
                        id="strength"
                        autoComplete="strength"
                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="10"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="jet-de-sauvegarde"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Dextérité
                  </label>
                  <div className="mt-1 mb-1">
                    <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="number"
                        name="dexterity"
                        id="dexterity"
                        autoComplete="dexterity"
                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="10"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="jet-de-sauvegarde"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Constitution
                  </label>
                  <div className="mt-1 mb-1">
                    <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="number"
                        name="constitution"
                        id="constitution"
                        autoComplete="constitution"
                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="10"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="jet-de-sauvegarde"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Intelligence
                  </label>
                  <div className="mt-1 mb-1">
                    <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="number"
                        name="inteligence"
                        id="inteligence"
                        autoComplete="inteligence"
                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="10"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="jet-de-sauvegarde"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Sagesse
                  </label>
                  <div className="mt-1 mb-1">
                    <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="number"
                        name="wisdom"
                        id="wisdom"
                        autoComplete="wisdom"
                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="10"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="jet-de-sauvegarde"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Charisme
                  </label>
                  <div className="mt-1 mb-1">
                    <div className="w-full flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="number"
                        name="charisma"
                        id="charisma"
                        autoComplete="charisma"
                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="10"
                      />
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
    </form>
  );
}

export default CharacterCreator;
