import { useParams } from "react-router-dom";
import { Disclosure, Tab } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

import races from "../../../data/races.json";
import classes from "../../../data/classes.json";
import backgrounds from "../../../data/backgrounds.json";

function CoreFeatureRace() {
  const { featureType, featureId } = useParams();

  let data;
  let feature;

  switch (featureType) {
    case "races":
      data = races;
      break;
    case "classes":
      data = classes;
      break;
    case "backgrounds":
      data = backgrounds;
      break;
    default:
      data = [];
  }

  // Trouver la caractéristique spécifique par son index en string
  feature = data.find((item) => item.index === featureId);

  if (!feature) {
    return <div>Caractéristique non trouvée</div>;
  }

  return (
    <div className="bg-gray-900">
      {/* Mobile menu */}

      <main className="pb-10 mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Tab.Group as="div" className="flex flex-col-reverse">
              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                <Tab.Panel key={feature.index}>
                  <img
                    src={feature.imageUrl}
                    alt={feature.alt}
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
                  Description
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <p className="text-lg text-gray-50 text-justify">
                  {feature.description}
                </p>
              </div>
            </div>
                
              <section aria-labelledby="details-heading">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>
                <div className="mt-8">
                  {Object.entries(feature.traits).map(
                    ([chapterKey, chapter]) => (
                      <Disclosure key={chapterKey} as="div" className="mt-2">
                        {({ open }) => (
                          <>
                            <div className="flex flex-wrap justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-50 bg-gray-800 rounded-lg">
                              <div className="w-full bg-gray-600 rounded-lg mb-2 p-1 text-center uppercase font-bold">{chapter.name}</div> <p className="text-justify p-2">{chapter.description}</p>
                            </div>
                          </>
                        )}
                      </Disclosure>
                    )
                  )}
                </div>
              </section>
              <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>
                <div className="lg:grid lg:items-start lg:gap-x-8 mt-6">
                  {Object.entries(feature.details).map(
                    ([chapterKey, chapter]) => (
                      <Disclosure key={chapterKey} as="div" className="mt-2">
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-50 bg-gray-800 rounded-lg  hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                              <span>{chapter.name}</span>
                              <span>
                                {open ? (
                                  <MinusIcon className="h-5 w-5" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" />
                                )}
                              </span>
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-md text-gray-50 text-justify">
                              {chapter.content}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )
                  )}
                </div>
            </div>


            <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1"></div>
            <section aria-labelledby="details-heading" className="lg:grid lg:items-start lg:gap-x-8 mt-6">
                <h2 id="details-heading" className="sr-only">
                  Sous-races
                </h2>
              <div className="mt-4">
                <p className="text-3xl tracking-tight text-gray-500 p-2">
                  {feature.sub_races.title}
                </p>
                <p className="text-gray-50 text-justify text-lg p-3">
                  {feature.sub_races.description}
                </p>
                {Object.entries(feature.sub_races)
                  .filter(([key]) => key.startsWith("choice"))
                  .map(([key, value]) => (
                    <Disclosure key={key} as="div" className="mt-2 bg-gray-800 rounded-lg">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-50 bg-gray-800 rounded-lg  hover:bg-gray-600  focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                            <span>{value.name}</span>
                            <span>
                              {open ? (
                                <MinusIcon className="h-5 w-5" />
                              ) : (
                                <PlusIcon className="h-5 w-5" />
                              )}
                            </span>
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-md text-gray-50 text-justify">
                            <p>{value.description}</p>
                            {value.bonuses &&
                              Object.entries(value.bonuses).map(
                                ([bonusKey, bonusValue]) => (
                                  <div key={bonusKey}>
                                    <h4 className="font-semibold bg-gray-600 rounded-lg p-1.5 mt-5">
                                      {bonusValue.name}
                                    </h4>
                                    <p>{bonusValue.description}</p>
                                  </div>
                                )
                              )}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
              </div>
              </section>
          
        </div>
      </main>
    </div>
  );
}

export default CoreFeatureRace;
