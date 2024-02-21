import { useSelector } from 'react-redux';

function TableCharacters() {
    const character = useSelector((state) => state.character.selectedCharacter);
    console.log('Character:', character);

    const characterAttributes = [
        { label: "Nom du personnage", id: "name", value: character?.name, type: "text", readOnly: false, colSpan: "sm:col-span-3" },
        { label: "Race", id: "race_name", value: character?.race_name, type: "text", readOnly: true, colSpan: "sm:col-span-3 sm:col-start-1" },
        { label: "Personnalité et Historique", id: "background_name", value: character?.background_name, type: "text", readOnly: true, colSpan: "sm:col-span-3" },
        { label: "Classe", id: "classe_name", value: character?.classe_name, type: "text", readOnly: true, colSpan: "sm:col-span-3" },
        { label: "Alignement", id: "alignment", value: character?.alignment, type: "text", readOnly: true, colSpan: "sm:col-span-2" },
        { label: "Level", id: "level", value: character?.level, type: "number", readOnly: false, colSpan: "sm:col-span-1" },
        { label: "Experience", id: "experience", value: character?.experience, type: "number", readOnly: false, colSpan: "sm:col-span-1" },
        { label: "Vie de départ", id: "starting_health", value: character?.classe_starting_health, type: "number", readOnly: true, colSpan: "sm:col-span-1" },
        { label: "Dé de vie", id: "health_dice", value: character?.classe_health_dice, type: "number", readOnly: true, colSpan: "sm:col-span-1" },
        { label: "Vie", id: "health", value: character?.health, type: "number", readOnly: false, colSpan: "sm:col-span-1" },
        { label: "Bonus de vie", id: "bonus_health", value: character?.bonus_health, type: "number", readOnly: false, colSpan: "sm:col-span-1" },
        { label: "Langues", id: "race_languages", value: character?.race_languages, type: "text", readOnly: true, colSpan: "sm:col-span-2 justify-start" },
        { label: "Traits", id: "race_traits", value: character?.race_traits, type: "text", readOnly: true, colSpan: "sm:col-span-7" },
        { label: "Outils maîtrisés", id: "background_mastered_tools", value: character?.background_mastered_tools, type: "text", readOnly: true, colSpan: "sm:col-span-2" },
        { label: "Atouts Personnalité et Historique", id: "background_feature", value: character?.background_feature, type: "text", readOnly: true, colSpan: "sm:col-span-2" },
    ];

    return (
        <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7">
                    {characterAttributes.map((attr, index) => (
                        <div key={index} className={`${attr.colSpan}`}>
                            <label htmlFor={attr.id} className="block text-sm font-medium leading-6 text-white">
                                {attr.label}
                            </label>
                            <div className="mt-2 rounded-md  ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                                <input
                                    type={attr.type}
                                    name={attr.id}
                                    id={attr.id}
                                    autoComplete={attr.id}
                                    readOnly={attr.readOnly}
                                    className={`text-center block w-full rounded-md border-gray-300 py-1.5 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${attr.readOnly === false ? 'bg-green-500' : 'text-white bg-white/5'}`}
                                    defaultValue={attr.value}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TableCharacters;
