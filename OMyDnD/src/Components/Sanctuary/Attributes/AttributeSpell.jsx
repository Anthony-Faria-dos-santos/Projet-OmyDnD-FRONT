import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const SearchForm = () => {
  const [type, setType] = useState('');
  const [value, setValue] = useState('');

  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/api/options/spells/?type=${type}&value=${value}`
      );

      const data = await response.json();
      if (data.error) {
        return setData([]);
      }
      setData(data);
    } catch (error) {
      console.error(error);
      // Gérer l'erreur (message d'alerte, etc.)
    }
  };

  return (
    <div className="bg-gray-900 m-2">
      <main className="pb-10 mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 flex flex-col place-items-center">
        <img src="/images/spells/spells.jpg" className="h-full w-8/12 object-cover object-center sm:rounded-lg mx-auto" />

        <div className="p-2 bg-gray-800 rounded-lg mt-8 w-2/6">

          <form onSubmit={handleSubmit}
            className="space-y-6"
            action="#"
            method="GET">
            <label htmlFor="type"
              className="block text-sm font-medium leading-6 text-gray-50">
              Que voulez-vous rechercher ?
            </label>
            <select
              id="type"
              name="type"
              className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 [&_*]:text-black"
              value={type}
              onChange={(e) => setType(e.target.value)}>

              <option value="" disabled>Choisissez un type</option>
              <option value="name">Nom</option>
              <option value="range">Distance</option>
              <option value="casting_time">Temps d&apos;incantation</option>
              <option value="level">Niveau</option>
              <option value="school">Ecole de magie</option>
              <option value="class">Classe</option>
              <option value="archetype">Archétype</option>
              <option value="domains">Domaine</option>
              <option value="oaths">Serment</option>
              <option value="circles">Cercle</option>
              <option value="patrons">Patron</option>
            </select>
            <input
              type="text"
              id="value"
              name="value"
              className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              placeholder="Votre recherche"
              value={value} onChange={(e) => setValue(e.target.value)} />
            <button type="submit"
              className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
              Rechercher
            </button>
          </form>

        </div>

        <div className="lg:grid lg:grid-cols-3 place-content-around mt-10">
          {data.map((item, index) => (
            <div className="bg-gray-800 rounded-lg p-2 m-2" key={index}>
              <div className="text-gray-50 bg-gray-900 rounded-lg p-2 font-semibold uppercase text-center">
                {item.name}
              </div>
              <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                {item.description}
              </div>

              {item.higher_level && (
                <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                  Haut niveau: {item.higher_level}
                </div>
              )}

              <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                Portée: {item.range}
              </div>
              <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                Composantes: {item.components}
              </div>

              {item.material && (
                <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                  Type de composants: {item.material}
                </div>
              )}

              <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                Rituel nécessaire: {item.ritual}
              </div>
              <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                Durée: {item.duration}
              </div>
              <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                Concentration: {item.concentration}
              </div>
              <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                Temps d&apos;incantation: {item.casting_time}
              </div>
              <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                Niveau requis: {item.level}
              </div>
              <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                Ecole: {item.school}
              </div>
              <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                Classe: {item.class}
              </div>
              {item.archetype && (
                <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                  Archètype: {item.archetype}
                </div>
              )}
              {item.domains && (
                <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                  Domaine: {item.domains}
                </div>
              )}
              {item.oaths && (
                <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                  Serment: {item.oaths}
                </div>
              )}
              {item.circles && (
                <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                  Cercle: {item.circles}
                </div>
              )}
              {item.patrons && (
                <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                  Patron: {item.patrons}
                </div>
              )}
            </div>
          ))}
        </div>

      </main>
    </div>
  )
};

export default SearchForm;