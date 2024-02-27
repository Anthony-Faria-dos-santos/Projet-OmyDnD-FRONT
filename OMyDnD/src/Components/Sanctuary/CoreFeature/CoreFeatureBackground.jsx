import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import NotFound from "../../NotFound/NotFound.jsx";

import backgrounds from "../../../data/backgrounds.json";

function CoreFeatureBackground() {
  const { featureType, featureId } = useParams();

  let data;
  let feature;

  switch (featureType) {
    case "backgrounds":
      data = backgrounds;
      break;
    default:
      data = [];
  }

  // Trouver la caractéristique spécifique par son index en string
  feature = data.find((item) => item.index === featureId);

  if (!feature) {
    return <NotFound />;
  }

  return ( <div className="bg-gray-900">
  <main className="pb-10 mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
    <div className="mx-auto max-w-2xl lg:max-w-none">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
        <Tab.Group as="div" className="flex flex-col-reverse m-2">
          <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
            <Tab.Panel key={feature.index}>
              <img
                src={feature.imageUrl}
                alt={feature.alt}
                aria-label={feature.aria}
                className="h-full w-full object-cover object-center sm:rounded-lg"
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        {/* feature info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-50">
            {feature.name}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">feature information</h2>
            <p className="text-3xl tracking-tight text-gray-500">
              {feature.trait}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-lg text-gray-50 text-justify">
              {feature.description}
            </p>
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-10 bg-gray-700 rounded-lg">
              <div className="bg-gray-800 rounded-lg text-xl font-bold tracking-tight text-gray-50 text-center uppercase">
                Ensemble de départ
              </div>

              <div className="mt-1 p-1">
                <h3 className="sr-only">Description</h3>
                <div className="p-1 bg-gray-600 font-semibold rounded-lg text-gray-50">Compétences de départ</div>
                <p className="text-md p-2 text-gray-50 text-justify">
                {feature.starting_proficiencies}
                </p>
              </div>

              <div className="mt-1 p-1">
                <h3 className="sr-only">Description</h3>Logo de deux mains jointes qui s'ouvrent sur une goutte d'eau.
                <div className="p-1 bg-gray-600 font-semibold rounded-lg text-gray-50">Outils maîtrisés</div>
                <p className="text-md p-2 text-gray-50 text-justify">
                {feature.mastered_tools}
                </p>
              </div>

              <div className="mt-1 p-1">
                <h3 className="sr-only">Description</h3>
                <div className="p-1 bg-gray-600 font-semibold rounded-lg text-gray-50">Langues supplémentaires</div>
                <p className="text-md p-2 text-gray-50 text-justify">
                {feature.language_options}
                </p>
              </div>

              <div className="mt-1 p-1">
                <h3 className="sr-only">Description</h3>
                <div className="p-1 bg-gray-600 font-semibold rounded-lg text-gray-50">Equipement de départ</div>
                <p className="text-md p-2 text-gray-50 text-justify">
                {feature.starting_equipment}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* En-dessous, infos supplémentaires */}

      <section aria-labelledby="details-heading" className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mt-6">
                <h2 id="details-heading" className="sr-only">
                  Bonus de l&apos;historique
                </h2>
              <div className="mt-4">
                <p className="text-3xl tracking-tight text-gray-500 p-2">
                  {feature.feature.name}
                </p>
                <p className="text-gray-50 text-justify text-lg p-3">
                  {feature.feature.description}
                </p>
              </div>

              <div className="bg-gray-600 rounded-lg mt-10 m-2">
                <div className="bg-gray-700 rounded-lg text-xl font-bold tracking-tight text-gray-50 text-center uppercase leading-4 p-2">Traits <br /> <span className= "text-sm lowercase">(Choisissez en {feature.personality_traits.choose})</span></div>
      <div className="p-1 text-gray-50"><ol>
        {feature.personality_traits.from.map((item, index) => (
          <li className="bg-gray-700 rounded-lg p-1 m-1 list-disc list-inside" key={index}>{item.string}</li>
        ))}
      </ol></div>
      </div>
              </section>


              {/* Les choix de liens, passifs */}

              <section aria-labelledby="details-heading" className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-4 mt-6">
            <h2 id="details-heading" className="sr-only">Choix d&apos;historique</h2>
            <div className="bg-gray-600 rounded-lg mt-10 m-2">
            <div className="bg-gray-700 rounded-lg text-xl font-bold tracking-tight text-gray-50 text-center uppercase leading-4 p-2">Idéaux <br /> <span className= "text-sm lowercase">(Choisissez en {feature.ideals.choose})</span></div>
            <div className="p-1 text-gray-50"><ol>
        {feature.ideals.from.map((item, index) => (
          <li className="bg-gray-700 rounded-lg p-1 m-1.5 list-disc list-inside" key={index}>{item.string}</li>
        ))}
      </ol></div>
            </div>

            <div className="bg-gray-600 rounded-lg mt-10 m-2">
            <div className="bg-gray-700 rounded-lg text-xl font-bold tracking-tight text-gray-50 text-center uppercase leading-4 p-2">Liens <br /> <span className= "text-sm lowercase">(Choisissez en {feature.bonds.choose})</span></div>
            <div className="p-1 text-gray-50"><ol>
        {feature.bonds.from.map((item, index) => (
          <li className="bg-gray-700 rounded-lg p-1 m-1.5 list-disc list-inside" key={index}>{item.string}</li>
        ))}
      </ol></div>
            </div>

            <div className="bg-gray-600 rounded-lg mt-10 m-2">
            <div className="bg-gray-700 rounded-lg text-xl font-bold tracking-tight text-gray-50 text-center uppercase leading-4 p-2">Défauts <br /> <span className= "text-sm lowercase">(Choisissez en {feature.flaws.choose})</span></div>
            <div className="p-1 text-gray-50"><ol>
        {feature.flaws.from.map((item, index) => (
          <li className="bg-gray-700 rounded-lg p-1 m-1.5 list-disc list-inside" key={index}>{item.string}</li>
        ))}
      </ol></div>
            </div>

              </section>

    </div>
  </main>
</div> );
}

export default CoreFeatureBackground;
