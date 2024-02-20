import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addCharacterNote,
    deleteCharacterNote,
    updateCharacterNote,
    fetchCharacter,
} from '../../../store/slices/characterSlice';

function TableNotes() {
    const dispatch = useDispatch();
    const character = useSelector(state => state.character.selectedCharacter);
    const [newNoteContent, setNewNoteContent] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editingNoteContent, setEditingNoteContent] = useState('');

    // Fonction pour analyser la structure de la note "{id,contenu}"
    function parseNote(noteStr) {
        if (typeof noteStr === 'string') {
            const parts = noteStr.slice(1, -1).split(',');
            if (parts.length === 2) {
                return { id: parts[0], content: parts[1] };
            }
        }
        return null;
    }

    useEffect(() => {
        if (character && character.notes) {
            const note = character.notes.find(parseNote);
            if (note) {
                setEditingNoteId(note.id);
                setEditingNoteContent(note.content);
            }
        }
    }, [character]);

    // Dans votre composant TableNotes, après l'ajout de la note
    const handleAddNote = async () => {
        if (!newNoteContent.trim()) return;
        await dispatch(addCharacterNote({
            userId: character.user_id, // Assurez-vous que l'ID de l'utilisateur est correct
            characterId: character.id,
            noteData: { content: newNoteContent }
        }));
        setNewNoteContent('');
        // Optionnel : Rafraîchir les notes
        dispatch(fetchCharacter({ userId: character.user_id, characterId: character.id }));
    };


    const handleStartEditing = (note) => {
        setEditingNoteId(note.id);
        setEditingNoteContent(note.content);
    };

    const handleSaveEdit = async () => {
        await dispatch(updateCharacterNote({
            userId: character.user_id,
            characterId: character.id,
            noteId: editingNoteId,
            noteData: { content: editingNoteContent }
        }));
        setEditingNoteId(null);
        setEditingNoteContent('');
        dispatch(fetchCharacter({ userId: character.user_id, characterId: character.id }));
    };

    const handleDeleteNote = async (noteId) => {
        await dispatch(deleteCharacterNote({
            userId: character.user_id,
            characterId: character.id,
            noteId
        }));
        dispatch(fetchCharacter({ userId: character.user_id, characterId: character.id }));
    };

    if (!character) return <div>Chargement des notes...</div>;

    return (


        <div className="pl-8 pr-8 pt-3 pb-10 flex flex-col">
            <textarea
                type="text"
                rows={5}
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="mx-auto block p-4 pt-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Ajouter une nouvelle note..." />
            <button
                type="button"
                onClick={handleAddNote}
                className="mx-auto m-5 rounded-md inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
                Ajouter
            </button>

            <ul className='mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8'>
                {character.notes && character.notes.map((noteStr, index) => {
                    const note = parseNote(noteStr);
                    if (!note) return null;

                    return (
                        <li key={index}
                        className='rounded-2xl bg-gray-800 px-8 py-10 flex flex-col'>
                            {editingNoteId === note.id ? (
                                <>
                                    <textarea
                                        value={editingNoteContent}
                                        rows={4}
                                        className="block p-4 pt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setEditingNoteContent(e.target.value)} />

                                    <button
                                        type="button"
                                        onClick={() => handleSaveEdit(note.id)}
                                        className="mx-auto m-5 rounded-md relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                    >
                                        Sauvegarder
                                    </button>
                                </>
                            ) : (
                                <>
                                    
                                    <textarea
                                        value={note.content}
                                        rows={6}
                                        readOnly
                                        className="block p-4 pt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        onChange={(e) => setEditingNoteContent(e.target.value)} />

                                    <span className="isolate inline-flex rounded-md shadow-sm">
                                        <button
                                            type="button"
                                            onClick={() => handleStartEditing(note)}
                                            className="mt-5 mr-3 relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                        >
                                            Modifier
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleDeleteNote(note.id)}
                                            className="mt-5 relative -ml-px inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                        >
                                            Supprimer
                                        </button>
                                    </span>
                                </>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>

    );
}

export default TableNotes;
