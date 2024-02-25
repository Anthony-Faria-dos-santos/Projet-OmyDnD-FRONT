import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteCharacter,
  fetchCharacter,
  updateCharacter,
} from "../../../store/slices/characterSlice.js";
import {
  caractBonusCalculator,
  masteryBonusCalculator,
} from "../../../utils/bonusCalculator.js";
import TableCharacters from "./TableCharacters.jsx";
import TableSkills from "./TableSkills.jsx";
import Loader from "../../Loader/index.jsx";

function CharacterSheet() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);
  const character = useSelector((state) => state.character.selectedCharacter);
  const status = useSelector((state) => state.character.status);
  const error = useSelector((state) => state.character.error);
  const location = useLocation();
  const characterId = location.state?.characterId;
  const navigate = useNavigate();
  const masteryBonus = masteryBonusCalculator(character?.level);

  const [armorClass, setArmorClass] = useState('');
  const [inspiration, setInspiration] = useState('');
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [health, setHealth] = useState('');
  const [bonusHealth, setBonusHealth] = useState('');
  const [experience, setExperience] = useState('');
  const [alignment, setAlignment] = useState('');

  useEffect(() => {
    if (characterId && userId) {
      dispatch(fetchCharacter({ userId, characterId }));
    }
  }, [dispatch, userId, characterId]);

  useEffect(() => {
    if (character) {
      setArmorClass(character.armor_class || '');
      setInspiration(character.inspiration || '');
      setName(character.name || '');
      setLevel(character.level || '');
      setHealth(character.health || '');
      setBonusHealth(character.bonus_health || '');
      setExperience(character.experience || '');
      setAlignment(character.alignment || '');
    }
  }, [character]);

  const handleArmorClassChange = (event) => {
    setArmorClass(event.target.value);
  };

  const handleInspirationChange = (event) => {
    setInspiration(event.target.value);
  };

  const handleDeleteCharacter = (characterId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce personnage ?")) {
      dispatch(deleteCharacter({ userId, characterId }))
        .unwrap()
        .then(() => {
          navigate("/characters");
        })
        .catch((error) => {
          alert("Erreur lors de la suppression du personnage: " + error);
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCharacter = {
      armor_class: parseInt(armorClass),
      name,
      level: parseInt(level),
      health: parseInt(health),
      bonus_health: parseInt(bonusHealth),
      experience: parseInt(experience),
      inspiration: parseInt(inspiration),
      alignment,
    };
    try {
      await dispatch(updateCharacter({
        userId,
        characterId: character.id,
        characterData: updatedCharacter,
      })).unwrap();
      await dispatch(fetchCharacter({ userId, characterId: character.id })).unwrap();
    } catch (error) {
      console.error('Failed to update or fetch the character:', error);
    }
  };


  if (status === "loading") return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <form className="pl-8 pr-8 pt-3" onSubmit={handleSubmit}>
      <div className="pb-10 mx-auto sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid md:grid-cols-1 md:items-start md:gap-x-8">
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 ">
              <TableCharacters
                setName={setName}
                setLevel={setLevel}
                setHealth={setHealth}
                setBonusHealth={setBonusHealth}
                setExperience={setExperience}
                setInspiration={setInspiration}
                setAlignment={setAlignment}
              />

              <div className=" mt-10 grid grid-cols-2 gap-x-6 sm:grid-cols-3 sm:grid-rows-2 sm:w-1/2 sm:mx-auto">
                <div className="sm:col-span-1 grid grid-cols-2 grid-rows-1 gap-x-1 gap-y-1 sm:grid-cols-2 sm:grid-rows-2">
                  <div className="w-15 col-span-1">
                    <label
                      htmlFor="jet-de-sauvegarde"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Force
                    </label>
                    <div className="mt-1 mb-1">
                      <div className="flex rounded-md bg-blue-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                        <input
                          type="text"
                          readOnly
                          name="strength"
                          id="strength"
                          autoComplete="strength"
                          className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                          defaultValue={character?.strength || ""}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Bonus
                    </label>
                    <div className="w-15 col-span-1">
                      <div className="mt-1">
                        <div className="flex rounded-md bg-orange-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            defaultValue={caractBonusCalculator(
                              character?.strength || ""
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-1 grid grid-cols-2 grid-rows-1 gap-x-1 gap-y-1 sm:grid-cols-2 sm:grid-rows-2">
                  <div className="w-15 col-span-1">
                    <label
                      htmlFor="jet-de-sauvegarde"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Dext..
                    </label>
                    <div className="mt-1 mb-1">
                      <div className="flex rounded-md bg-blue-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                        <input
                          type="text"
                          readOnly
                          name="dexterity"
                          id="dexterity"
                          autoComplete="dexterity"
                          className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                          defaultValue={character?.dexterity || ""}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Bonus
                    </label>
                    <div className="w-15 col-span-1">
                      <div className="mt-1">
                        <div className="flex rounded-md bg-orange-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            defaultValue={caractBonusCalculator(
                              character?.dexterity || ""
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-1 grid grid-cols-2 grid-rows-1 gap-x-1 gap-y-1 sm:grid-cols-2 sm:grid-rows-2">
                  <div className="w-15 col-span-1">
                    <label
                      htmlFor="jet-de-sauvegarde"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Const..
                    </label>
                    <div className="mt-1 mb-1">
                      <div className="flex rounded-md bg-blue-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                        <input
                          type="text"
                          readOnly
                          name="constitution"
                          id="constitution"
                          autoComplete="constitution"
                          className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                          defaultValue={character?.constitution || ""}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Bonus
                    </label>
                    <div className="w-15 col-span-1">
                      <div className="mt-1">
                        <div className="flex rounded-md bg-orange-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            defaultValue={caractBonusCalculator(
                              character?.constitution || ""
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-1 grid grid-cols-2 grid-rows-1 gap-x-1 gap-y-1 sm:grid-cols-2 sm:grid-rows-2">
                  <div className="w-15 col-span-1">
                    <label
                      htmlFor="jet-de-sauvegarde"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      intel..
                    </label>
                    <div className="mt-1 mb-1">
                      <div className="flex rounded-md bg-blue-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                        <input
                          type="text"
                          readOnly
                          name="inteligence"
                          id="inteligence"
                          autoComplete="inteligence"
                          className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                          defaultValue={character?.inteligence || ""}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Bonus
                    </label>
                    <div className="w-15 col-span-1">
                      <div className="mt-1">
                        <div className="flex rounded-md bg-orange-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            defaultValue={caractBonusCalculator(
                              character?.inteligence || ""
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-1 grid grid-cols-2 grid-rows-1 gap-x-1 gap-y-1 sm:grid-cols-2 sm:grid-rows-2">
                  <div className="w-15 col-span-1">
                    <label
                      htmlFor="jet-de-sauvegarde"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Sage..
                    </label>
                    <div className="mt-1 mb-1">
                      <div className="flex rounded-md bg-blue-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                        <input
                          type="text"
                          readOnly
                          name="wisdom"
                          id="wisdom"
                          autoComplete="wisdom"
                          className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                          defaultValue={character?.wisdom || ""}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Bonus
                    </label>
                    <div className="w-15 col-span-1">
                      <div className="mt-1">
                        <div className="flex rounded-md bg-orange-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            defaultValue={caractBonusCalculator(
                              character?.wisdom || ""
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-1 grid grid-cols-2 grid-rows-1 gap-x-1 gap-y-1 sm:grid-cols-2 sm:grid-rows-2">
                  <div className="w-15 col-span-1">
                    <label
                      htmlFor="jet-de-sauvegarde"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Char..
                    </label>
                    <div className="mt-1 mb-1">
                      <div className="flex rounded-md bg-blue-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                        <input
                          type="text"
                          readOnly
                          name="charisma"
                          id="charisma"
                          autoComplete="charisma"
                          className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                          defaultValue={character?.charisma || ""}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Bonus
                    </label>
                    <div className="w-15 col-span-1">
                      <div className="mt-1">
                        <div className="flex rounded-md bg-orange-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            defaultValue={caractBonusCalculator(
                              character?.charisma || ""
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:w-1/2 sm:mx-auto sm:grid-cols-3 gap-x-2">
                <div className="w-15 col-span-1">
                  <label
                    htmlFor="jet-de-sauvegarde"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    B. Maitrise
                  </label>
                  <div className="mt-1 mb-1">
                    <div className="flex rounded-md bg-blue-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                      <input
                        type="text"
                        readOnly
                        name="bonus_maitrise"
                        id="bonus_maitrise"
                        autoComplete="bonus_maitrise"
                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        defaultValue={masteryBonus || ""}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-15 col-span-1">
                  <label
                    htmlFor="jet-de-sauvegarde"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    C. D&apos;armure
                  </label>
                  <div className="mt-1 mb-1">
                    <div className="flex rounded-md bg-green-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                      <input
                        type="number"
                        name="armor_class"
                        id="armor_class"
                        autoComplete="armor_class"
                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                        value={armorClass || ""}
                        onChange={handleArmorClassChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-15 col-span-1">
                  <label
                    htmlFor="jet-de-sauvegarde"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Initiative
                  </label>
                  <div className="mt-1 mb-1">
                    <div className="flex rounded-md bg-blue-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                      <input
                        type="text"
                        readOnly
                        name="initiative"
                        id="initiative"
                        autoComplete="initiative"
                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        defaultValue={caractBonusCalculator(
                          character?.dexterity || ""
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-15 col-span-1">
                  <label
                    htmlFor="jet-de-sauvegarde"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Vitesse
                  </label>
                  <div className="mt-1 mb-1">
                    <div className="flex rounded-md bg-blue-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                      <input
                        type="text"
                        readOnly
                        name="race_speed"
                        id="race_speed"
                        autoComplete="race_speed"
                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        defaultValue={character?.race_speed || ""}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-15 col-span-1">
                  <label
                    htmlFor="jet-de-sauvegarde"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Percéption .p
                  </label>
                  <div className="mt-1 mb-1">
                    <div className="flex rounded-md bg-blue-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                      <input
                        type="text"
                        readOnly
                        name="perception"
                        id="perception"
                        autoComplete="perception"
                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        defaultValue={caractBonusCalculator(character?.wisdom) + 10 || ""}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-15 col-span-1 mb-8">
                  <label
                    htmlFor="jet-de-sauvegarde"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Inspiration
                  </label>
                  <div className="mt-1 mb-1">
                    <div className="flex rounded-md bg-green-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                      <input
                        type="number"
                        name="inspiration"
                        id="inspiration"
                        autoComplete="inspiration"
                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-black focus:ring-0 sm:text-sm sm:leading-6"
                        value={inspiration || ""}
                        onChange={handleInspirationChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-5 text-center text-red-500">!! Valider les modifications avant de choisir un skill !!</p>
            <div className="mb-8 mt-5 flex items-center justify-center gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
              >
                Valider les modifications
              </button>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="total"
                className="block text-sm font-medium leading-6 text-white"
              >
                Équipement de départ de classe
              </label>
              <div className="mb-8 col-span-1">
                <div className="mt-1">
                  <div className="flex rounded-md bg-white ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                    <div className="m-2 w-full text-center flex-1 py-1.5 pl-1 text-black sm:text-sm sm:leading-6 rounded-md bg-white ring-1 ring-inset ring-white/10">
                      {character?.classe_starting_equipment_options}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="total"
                className="block text-sm font-medium leading-6 text-white"
              >
                Équipement de départ d&apos;Historique
              </label>
              <div className="mb-8 col-span-1">
                <div className="mt-1">
                  <div className="flex rounded-md bg-white ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                    <div className="m-2 w-full text-center flex-1 py-1.5 pl-1 text-black sm:text-sm sm:leading-6 rounded-md bg-white ring-1 ring-inset ring-white/10">
                      {character?.background_starting_equipment}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <TableSkills
              masteryBonus={masteryBonus}
              userId={userId}
              caractBonusCalculator={caractBonusCalculator}
            />

            <div className="mt-8 flex items-center justify-center gap-x-6">
              <button
                onClick={() => handleDeleteCharacter(character.id)}
                className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
              >
                Supprimer le personnage
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CharacterSheet;
