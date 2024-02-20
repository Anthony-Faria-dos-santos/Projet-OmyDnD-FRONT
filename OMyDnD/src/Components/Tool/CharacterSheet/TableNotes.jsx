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

    function parseNote(noteStr) {
        if (typeof noteStr === 'string') {
            const commaIndex = noteStr.indexOf(',');
            if (commaIndex !== -1) {
                const id = noteStr.substring(1, commaIndex);
                const content = noteStr.substring(commaIndex + 1, noteStr.length - 1);
                return { id, content };
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

    const handleAddNote = async () => {
        if (!newNoteContent.trim()) return;
        await dispatch(addCharacterNote({
            userId: character.user_id,
            characterId: character.id,
            noteData: { content: newNoteContent }
        }));
        setNewNoteContent('');
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


        <div className="pt-3 pb-10 flex flex-col flex-wrap">
            <div className='flex flex-col'>
                <textarea
                    type="text"
                    rows={5}
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    className="w-1/2 mt-28 flex-col mx-auto block p-4 pt-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Ajouter une nouvelle note..." />
                <button
                    type="button"
                    onClick={handleAddNote}
                    className="mx-auto m-5 rounded-md inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                >
                    Ajouter
                </button>
            </div>

            <ul className='p-10 flex flex-wrap gap-10 mt-10 justify-center'>
                {character.notes && character.notes.map((noteStr, index) => {
                    const note = parseNote(noteStr);
                    if (!note) return null;

                    return (
                        <li key={index}
                        className='w-1/3 rounded-2xl bg-gray-800 px-8 py-10 flex flex-col'>
                            {editingNoteId === note.id ? (
                                <>
                                    <textarea
                                        value={editingNoteContent}
                                        rows={5}
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
                                        rows={5}
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
