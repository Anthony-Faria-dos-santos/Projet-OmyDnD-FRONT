import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacter, deleteCharacter } from '../../../store/slices/characterSlice.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { caractBonusCalculator } from '../../../utils/bonusCalculator.js';
import TableCharacters from "./TableCharacters.jsx";

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('submit');
};


function CharacterSheet() {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user?.id);
  const character = useSelector((state) => state.character.selectedCharacter);
  const status = useSelector((state) => state.character.status);
  const error = useSelector((state) => state.character.error);
  const location = useLocation();
  const characterId = location.state?.characterId;
  const navigate = useNavigate();

  console.log('UserID:', userId);
  console.log('CharacterID:', characterId);
  // console.log('Character:', character);

  useEffect(() => {
    if (characterId && userId) {
      dispatch(fetchCharacter({ userId, characterId }));
    }
  }, [dispatch, userId, characterId]);

  const handleDeleteCharacter = (characterId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce personnage ?")) {
      dispatch(deleteCharacter({userId, characterId}))
        .unwrap()
        .then(() => {
          navigate("/characters");
        })
        .catch((error) => {
          alert("Erreur lors de la suppression du personnage: " + error);
        });
    }
};

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form className="pl-8 pr-8 pt-3" onSubmit={handleSubmit}>
      <div className="pb-10 mx-auto sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid md:grid-cols-2 md:items-start md:gap-x-8">
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 ">
              <TableCharacters />

              <div className="mb-5 w- mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5 sm:grid-rows-2">
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
                          defaultValue={character?.strength}
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
                        <div className="flex rounded-md bg-orange-600 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            defaultValue={caractBonusCalculator(character?.strength)}
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
                      Dextérité
                    </label>
                    <div className="mt-1 mb-1">
                      <div className="flex rounded-md bg-blue-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                        <input
                          type="text"
                          name="dexterity"
                          id="dexterity"
                          autoComplete="dexterity"
                          className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                          defaultValue={character?.dexterity}
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
                        <div className="flex rounded-md bg-orange-600 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            defaultValue={caractBonusCalculator(character?.dexterity)}
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
                      Constitution
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
                          defaultValue={character?.constitution}
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
                        <div className="flex rounded-md bg-orange-600 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            defaultValue={caractBonusCalculator(character?.constitution)}
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
                      inteligence
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
                          defaultValue={character?.inteligence}
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
                        <div className="flex rounded-md bg-orange-600 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            defaultValue={caractBonusCalculator(character?.inteligence)}
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
                      Sagesse
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
                          defaultValue={character?.wisdom}
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
                        <div className="flex rounded-md bg-orange-600 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            defaultValue={caractBonusCalculator(character?.wisdom)}
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
                      Charisme
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
                          defaultValue={character?.charisma}
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
                        <div className="flex rounded-md bg-orange-600 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                          <input
                            type="text"
                            readOnly
                            className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                            defaultValue={caractBonusCalculator(character?.charisma)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-start gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
              >
                Générer
              </button>
              <button 
              onClick={() => handleDeleteCharacter(character.id)} 
              className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </form >
  );
}

export default CharacterSheet;
