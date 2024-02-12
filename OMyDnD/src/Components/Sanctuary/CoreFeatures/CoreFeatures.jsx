import { Link, Outlet, useParams } from "react-router-dom";
import races from "../../../data/races.json";
import classes from "../../../data/classes.json";
import backgrounds from "../../../data/backgrounds.json";

function CoreFeatures() {
  const { featureType } = useParams();
  let data;
  let pageTitle;

  switch (featureType) {
    case "races":
      data = races;
      pageTitle = "Races";
      break;
    case "classes":
      data = classes;
      pageTitle = "Classes";
      break;
    case "backgrounds":
      data = backgrounds;
      pageTitle = "Personnalités et Historiques";
      break;
    default:
      data = [];
      pageTitle = "Page";
  }

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Découvrez les {pageTitle}
          </h2>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        >
          {data.map((data) => (
            <li key={data.name} className="rounded-2xl bg-gray-800 px-8 py-10">
              <img
                className="mx-auto h-48 w-48 rounded-2xl md:h-56 md:w-56 object-cover object-top"
                src={data.imageUrl}
                alt={data.alt}
              />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">
                {data.name}
              </h3>
              <p className="text-sm leading-6 text-gray-400 text-justify description-clamp">
                {data.description}
              </p>
              <Link
                    to={`/sanctuary/${featureType}/${data.index}`}
                    className="font-semibold text-gray-400 hover:text-gray-100 inline-flex justify-center"
                  >
                    Voir plus
                  </Link>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default CoreFeatures;
