import { Link } from "react-router-dom";

const pages = [
    {
        id: 1,
        name: "Races",
        href: "/sanctuary/races",
        imageSrc:
        "/images/races-logo.png",
        imageAlt:
        "",
    },
    {
        id: 2,
        name: "Classes",
        href: "/sanctuary/classes",
        imageSrc:
        "/images/classes-logo.png",
        imageAlt:
        "",
    },
    {
        id: 3,
        name: "Personnalités et historiques",
        href: "/sanctuary/backgrounds",
        imageSrc:
        "/images/background-logo.png",
        imageAlt:
        "",
    },
    {
        id: 4,
        name: "Caractéristiques",
        href: "/sanctuary/abilities",
        imageSrc:
        "/images/caracteristiques-logo.png",
        imageAlt:
        "",
    },
    {
        id: 5,
        name: "Équipements",
        href: "/sanctuary/equipments",
        imageSrc:
        "/images/equipements-logo.png",
        imageAlt:
        "",
    },
    {
        id: 6,
        name: "Altérations d'état",
        href: "/sanctuary/conditions",
        imageSrc:
        "/images/alterations-logo.png",
        imageAlt:
        "",
    },
    {
        id: 7,
        name: "Sorts",
        href: "/sanctuary/spells",
        imageSrc:
        "/images/sorts-logo.png",
        imageAlt:
        "",
    },
    {
        id: 8,
        name: "Dons",
        href: "/sanctuary/skills",
        imageSrc:
        "/images/dons-logo.png",
        imageAlt:
        "",
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
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-transparent xl:aspect-h-8 xl:aspect-w-7">
                    <img
                    src={page.imageSrc}
                    alt={page.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>
                <h3 className="text-center mt-4 text-md text-gray-500">{page.name}</h3>
                </Link>
            ))}
            </div>
            </div>
        </div>
    );
    }
    
    export default Sanctuary;
    