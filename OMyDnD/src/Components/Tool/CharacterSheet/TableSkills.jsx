/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addCharacterSkill,
    deleteCharacterSkill,
    fetchCharacter,
} from "../../../store/slices/characterSlice.js";

function TableSkills({ masteryBonus, userId, caractBonusCalculator }) {
    const dispatch = useDispatch();
    const character = useSelector((state) => state.character.selectedCharacter);

    const skills = useMemo(
        () => [
            { id: "1", name: "Acrobaties", attribute: "dexterity" },
            { id: "2", name: "Arcanes", attribute: "inteligence" },
            { id: "3", name: "Athlétisme", attribute: "strength" },
            { id: "4", name: "Discrétion", attribute: "dexterity" },
            { id: "5", name: "Dressage", attribute: "wisdom" },
            { id: "6", name: "Escamotage", attribute: "dexterity" },
            { id: "7", name: "Histoire", attribute: "inteligence" },
            { id: "8", name: "Intimidation", attribute: "charisma" },
            { id: "9", name: "Intuition", attribute: "wisdom" },
            { id: "10", name: "Investigation", attribute: "inteligence" },
            { id: "11", name: "Médecine", attribute: "wisdom" },
            { id: "12", name: "Nature", attribute: "inteligence" },
            { id: "13", name: "Perception", attribute: "wisdom" },
            { id: "14", name: "Persuasion", attribute: "charisma" },
            { id: "15", name: "Religion", attribute: "inteligence" },
            { id: "16", name: "Représentation", attribute: "charisma" },
            { id: "17", name: "Survie", attribute: "wisdom" },
            { id: "18", name: "Tromperie", attribute: "charisma" },
        ],
        []
    );

    const [checkedSkills, setCheckedSkills] = useState({});

    useEffect(() => {
        if (character && character.skills) {
            const skillsCheckedStatus = skills.reduce((acc, skill) => {
                acc[skill.id] = character.skills.some(s => s === parseInt(skill.id));
                return acc;
            }, {});
            setCheckedSkills(skillsCheckedStatus);
        }
    }, [character, skills]);

    const handleCheckboxChange = async (skillId) => {
        const isChecked = checkedSkills[skillId];

        if (isChecked) {
            await dispatch(
                deleteCharacterSkill({ userId, characterId: character.id, skillId })
            );
        } else {
            await dispatch(
                addCharacterSkill({ userId, characterId: character.id, skillId })
            );
        }
        dispatch(fetchCharacter({ userId, characterId: character.id }));
    };

    const calculateTotalBonus = (skill) => {
        const attributeBonus = caractBonusCalculator && character?.[skill.attribute] ? caractBonusCalculator(character[skill.attribute]) : 0;
        const isSkillChecked = !!checkedSkills[skill.id];
        const masteryBonusValue = isNaN(masteryBonus) ? 0 : masteryBonus;
        return attributeBonus + (isSkillChecked ? masteryBonusValue : 0);
    };

    const determineInputClass = (skill) => {
        const totalBonus = calculateTotalBonus(skill);
        if (checkedSkills[skill.id]) {
            return "bg-green-500";
        } else if (totalBonus < 0) {
            return "bg-red-500";
        } else if (totalBonus > 0) {
            return "bg-blue-500";
        } else {
            return "text-white bg-white/5";
        }
    };

    if (!userId) {
        console.error("Erreur : userId est undefined");
        return;
    }

    return (
        <fieldset>
            <legend className="sr-only">Compétences</legend>
            <div className="flex flex-wrap justify-center">
                {skills.map((skill) => (
                    <div
                        key={skill.id}
                        className="relative flex items-start p-2 custom-border w-48"
                    >
                        <div className="flex h-6 items-center">
                            <input
                                id={`skill-${skill.id}`}
                                aria-describedby={`${skill.name}-description`}
                                name={skill.name}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                onChange={() => handleCheckboxChange(skill.id)}
                                checked={!!checkedSkills[skill.id]}
                            />
                        </div>
                        <div className="flex h-10 items-center">
                            <input
                                id={`skill-${skill.id}-second`}
                                aria-describedby={`${skill.name}-description`}
                                name={`${skill.name}-second`}
                                type="number"
                                className={`ml-2 h-10 w-10 text-center rounded border-gray-300 text-black focus:ring-indigo-600 ${determineInputClass(skill)}`}
                                value={calculateTotalBonus(skill)}
                                readOnly
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
