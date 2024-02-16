import { useParams } from "react-router-dom";
import { Disclosure, Tab } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

import classes from "../../../data/classes.json";

function formatKey(key) {
  // Remplace les underscores par des espaces et met en majuscule la première lettre de chaque mot
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function CoreFeatureClass() {
  const { featureType, featureId } = useParams();

  let data;
  let feature;

  switch (featureType) {
    case "classes":
      data = classes;
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
                  {feature.trait}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <p className="text-lg text-gray-50 text-justify">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
          <section aria-labelledby="details-heading" className="mt-12 p-3">
            <h2 id="details-heading" className="sr-only">
              Additional details
            </h2>
            <div className="lg:grid lg:items-start lg:gap-x-8">
              {Object.entries(feature.class_abilities).map(
                ([key, item]) =>
                  item.name && (
                    <Disclosure key={key} as="div" className="mt-2">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-gray-50 bg-gray-800 rounded-lg hover:bg-gray-600 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                            <span>{item.name}</span>
                            <span>
                              {open ? (
                                <MinusIcon className="h-5 w-5" />
                              ) : (
                                <PlusIcon className="h-5 w-5" />
                              )}
                            </span>
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-md text-gray-50 text-justify">
                            {item.description}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
              )}
            </div>
          </section>
          <section aria-labelledby="details-heading" className="mt-12 p-3">
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <p className="text-xl font-bold tracking-tight text-gray-50">
                Point de vie
              </p>

              <div className="mt-1">
                <h3 className="sr-only">Description</h3>
                <p className="text-md text-gray-50 text-justify">
                  {Object.keys(feature.class_abilities.health).map((key) => (
                    <li className="list-none mb-2" key={key}>
                      {formatKey(key)} :<br />{" "}
                      {feature.class_abilities.health[key]}
                    </li>
                  ))}
                </p>
              </div>
            </div>
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <p className="text-xl font-bold tracking-tight text-gray-50">
                Maîtrises
              </p>

              <div className="mt-1">
                <h3 className="sr-only">Description</h3>
                <p className="text-md text-gray-50 text-justify">
                  {Object.keys(feature.class_abilities.masteries).map((key) => (
                    <li className="list-none mb-2" key={key}>
                      {formatKey(key)} :<br />{" "}
                      {feature.class_abilities.masteries[key]}
                    </li>
                  ))}
                </p>
              </div>
            </div>
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <p className="text-xl font-bold tracking-tight text-gray-50">
                Équipement
              </p>

              <div className="mt-1">
                <h2 className="sr-only">feature information</h2>
                <p className="text-md tracking-tight text-gray-50">
                  {feature.class_abilities.equipement.description}
                </p>
              </div>

              <div className="mt-1">
                <h3 className="sr-only">Description</h3>
                <p className="text-md text-gray-50 text-justify">
                  {Object.keys(feature.class_abilities.equipement.choices).map(
                    (key) => (
                      <li className="list-none" key={key}>
                        {feature.class_abilities.equipement.choices[key]}
                      </li>
                    )
                  )}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default CoreFeatureClass;
