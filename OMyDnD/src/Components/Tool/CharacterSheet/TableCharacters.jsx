import { useSelector } from 'react-redux';

function TableCharacters() {
    const character = useSelector((state) => state.character.selectedCharacter);
    console.log('Character:', character);


    return (
        <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-7">
                    <div className='sm:col-span-3'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                            Nom du personnage
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="name"
                                className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={character?.name}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3 sm:col-start-1">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                            Race
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                readOnly
                                name="race"
                                id="race"
                                autoComplete="race"
                                className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={character?.race_name}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-white">
                            Personnalité et Historique
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                readOnly
                                name="background"
                                id="background"
                                autoComplete="background"
                                className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={character?.background_name}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                            Classe
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                readOnly
                                name="classe"
                                id="classe"
                                autoComplete="classe"
                                className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={character?.classe_name}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-white">
                            Alignement
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                readOnly
                                name="alignment"
                                id="alignment"
                                autoComplete="alignment"
                                className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={character?.alignment}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-white">
                            Level
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="level"
                                id="level"
                                autoComplete="level"
                                className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={character?.level}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-1">
                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-white">
                            Experience
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="experience"
                                id="experience"
                                autoComplete="experience"
                                className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={character?.experience}
                            />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-y-4 sm:grid-cols-4 mt-8'>
                    <div className='sm:col-span-1'>
                        <label
                            htmlFor="total"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            starting_health
                        </label>
                        <div className="w-20 col-span-1">
                            <div className="mt-1">
                                <div className="flex rounded-md bg-orange-600 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        defaultValue={character?.classe_starting_health}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='sm:col-span-1'>
                        <label
                            htmlFor="total"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            health_dice
                        </label>
                        <div className="w-20 col-span-1">
                            <div className="mt-1">
                                <div className="flex rounded-md bg-orange-600 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        defaultValue={character?.classe_health_dice}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='sm:col-span-1 sm:col-start-1'>
                        <label
                            htmlFor="total"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            health
                        </label>
                        <div className="w-20 col-span-1">
                            <div className="mt-1">
                                <div className="flex rounded-md bg-green-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        defaultValue={character?.health}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='sm:col-span-1'>
                        <label
                            htmlFor="total"
                            className="block text-sm font-medium leading-6 text-white"
                        >
                            bonus_health
                        </label>
                        <div className="w-20 col-span-1">
                            <div className="mt-1">
                                <div className="flex rounded-md bg-green-500 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-gray-500">
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-full text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                        defaultValue={character?.bonus_health}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TableCharacters;
