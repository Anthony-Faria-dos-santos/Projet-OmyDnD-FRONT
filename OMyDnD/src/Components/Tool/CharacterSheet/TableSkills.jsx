function TableSkills() {
    const skills = [
        { id: "acrobaties", name: "Acrobaties" },
        { id: "arcanes", name: "Arcanes" },
        { id: "athletisme", name: "Athlétisme" },
        { id: "discretion", name: "Discrétion" },
        { id: "dressage", name: "Dressage" },
        { id: "escamotage", name: "Escamotage" },
        { id: "histoire", name: "Histoire" },
        { id: "intimidation", name: "Intimidation" },
        { id: "intuition", name: "Intuition" },
        { id: "investigation", name: "Investigation" },
        { id: "medecine", name: "Médecine" },
        { id: "nature", name: "Nature" },
        { id: "perception", name: "Perception" },
        { id: "persuasion", name: "Persuasion" },
        { id: "religion", name: "Religion" },
        { id: "representation", name: "Représentation" },
        { id: "survie", name: "Survie" },
        { id: "tromperie", name: "Tromperie" },
    ];

    return (
        <fieldset>
            <legend className="sr-only">Compétences</legend>
            <div className="flex flex-wrap justify-center">
                {skills.map(skill => (
                    <div key={skill.id} className="relative flex items-start p-2 custom-border w-48">
                        <div className="flex h-6 items-center">
                            <input
                                id={skill.id}
                                aria-describedby={`${skill.id}-description`}
                                name={skill.id}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="flex h-10 items-center">
                            <input
                                id={`${skill.id}-second`}
                                aria-describedby={`${skill.id}-description`}
                                name={`${skill.id}-second`}
                                type="number"
                                className="ml-2 h-10 w-10 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                            <label htmlFor={skill.id} className="font-medium text-white">
                                {skill.name}
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </fieldset>
    );
}

export default TableSkills;
