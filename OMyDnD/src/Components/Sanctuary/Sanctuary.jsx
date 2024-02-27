import { Link } from "react-router-dom";

const pages = [
    {
        id: 1,
        name: "Races",
        href: "/sanctuary/races",
        imageSrc:
        "/images/sanctuary/races-logo-2.png",
        imageAlt:
        "Logo d'un rond en fer forgé qui entoure un arbre.",
    },
    {
        id: 2,
        name: "Classes",
        href: "/sanctuary/classes",
        imageSrc:
        "/images/sanctuary/classes-logo-2.png",
        imageAlt:
        "Logo de plusieurs types d'armes différentes qui s'entrecroisent.",
    },
    {
        id: 3,
        name: "Personnalités et historiques",
        href: "/sanctuary/backgrounds",
        imageSrc:
        "/images/sanctuary/background-logo.png",
        imageAlt:
        "Logo d'un livre dont un losange ressort des pages.",
    },
    {
        id: 4,
        name: "Caractéristiques",
        href: "/sanctuary/abilities",
        imageSrc:
        "/images/sanctuary/caracteristiques-logo.png",
        imageAlt:
        "Logo d'un cercle ailé divisé verticalement par le centre, bleu d'un côté et rouge de l'autre.",
    },
    {
        id: 5,
        name: "Équipements",
        href: "/sanctuary/equipments",
        imageSrc:
        "/images/sanctuary/equipements-logo-2.png",
        imageAlt:
        "Logo d'une armure en fer avec des épaulières ailées.",
    },
    {
        id: 6,
        name: "Altérations d'état",
        href: "/sanctuary/conditions",
        imageSrc:
        "/images/sanctuary/alterations-logo.png",
        imageAlt:
        "Logo d'une potion à moitié verte et rouge.",
    },
    {
        id: 7,
        name: "Sorts",
        href: "/sanctuary/spells",
        imageSrc:
        "/images/sanctuary/sorts-logo-3.png",
        imageAlt:
        "Logo d'un globe de verre enflammée.",
    },
    {
        id: 8,
        name: "Dons",
        href: "/sanctuary/skills",
        imageSrc:
        "/images/sanctuary/dons-logo-3.png",
        imageAlt:
        "Logo de deux mains jointes qui s'ouvrent sur une goutte d'eau.",
    }
    ];
    
    function Sanctuary() {
    return (
        <div className="bg-transparent">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Pages accessible</h2>
    
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {pages.map((page) => (
                <Link key={page.id} to={page.href} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-800 xl:aspect-h-8 xl:aspect-w-7 p-2">
                    <img
                    src={page.imageSrc}
                    alt={page.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>
                <h3 className="text-center mt-4 text-md text-gray-300">{page.name}</h3>
                </Link>
            ))}
            </div>
            </div>
        </div>
    );
    }
    
    export default Sanctuary;
    