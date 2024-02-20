import spells from "../../../data/spells.json";

function AttributeSpell() {
  const jsonData = spells;

  return (
    <div className="bg-gray-900">
      <main className="pb-10 mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <img
          src="../images/spells/spells.jpg"
          className="h-full w-8/12 object-cover object-center sm:rounded-lg mx-auto"
        />

        <div className="lg:grid lg:grid-cols-3 place-content-around mt-10">
          {jsonData.map((item, index) => (
            <div className="bg-gray-800 rounded-lg p-2 m-2" key={index}>
              <div className="text-gray-50 bg-gray-900 rounded-lg p-2 font-semibold uppercase text-center">
                {item.name}
              </div>
              <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">
                {item.desc}
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
                Temps d'incantation: {item.casting_time}
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
  );
}

export default AttributeSpell;
