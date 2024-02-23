import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCharactersByUser } from '../../../store/slices/characterSlice.js';

function Characters() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector(state => state.auth.user?.id);
  const characters = useSelector((state) => state.character.characters);
  const status = useSelector((state) => state.character.status);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCharactersByUser(userId));
    }
  }, [userId, dispatch]);

  const handleCharacterSelect = (characterId) => {
    navigate('/tool/character-creator/character-sheet', { state: { characterId } });
  };

  if (status === 'loading') {
    return <div>Loading characters...</div>;
  }

  if (status === 'failed') {
    return <div>Failed to load characters</div>;
  }

  const sortedCharacters = [...characters].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Tous vos personnages</h2>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        >
          {sortedCharacters.map((character) => (
            <li key={character.id} className="rounded-2xl bg-gray-800 px-8 py-10" onClick={() => handleCharacterSelect(character.id)}>
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">{character.name}</h3>
              <p className="text-sm leading-6 text-gray-400">{`Level: ${character.level} | Status: ${character.status}`}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Characters;
