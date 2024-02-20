import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
    races: [],
    classes: [],
    backgrounds: [],
    characters: [],
    selectedCharacter: null,
    notes: [],
    status: 'idle',
    error: null,
};

export const fetchRaces = createAsyncThunk('character/fetchRaces', async () => {
    const response = await axios.get(`${API_URL}/api/charactercreator/races`);
    return response.data;
});

export const fetchClasses = createAsyncThunk('character/fetchClasses', async () => {
    const response = await axios.get(`${API_URL}/api/charactercreator/classes`);
    return response.data;
});

export const fetchBackgrounds = createAsyncThunk('character/fetchBackgrounds', async () => {
    const response = await axios.get(`${API_URL}/api/charactercreator/backgrounds`);
    return response.data;
});

export const createCharacter = createAsyncThunk(
    'character/createCharacter',
    async (characterData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/api/charactercreator/creator`, characterData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCharactersByUser = createAsyncThunk(
    'character/fetchCharactersByUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/api/users/${userId}/characters`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchCharacter = createAsyncThunk(
    'character/fetchCharacter',
    async ({ userId, characterId }, { rejectWithValue }) => {
        console.log('fetchCharacter called with:', { userId, characterId });
        try {
            const response = await axios.get(`${API_URL}/api/users/${userId}/characters/${characterId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateCharacter = createAsyncThunk(
    'character/updateCharacter',
    async ({ userId, characterId, characterData }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        if (!token) {
            return rejectWithValue('Token non trouvé');
        }
        try {
            const response = await axios.patch(`${API_URL}/api/users/${userId}/characters/${characterId}`, characterData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);


export const deleteCharacter = createAsyncThunk(
    'character/deleteCharacter',
    async ({ userId, characterId }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        if (!token) {
            return rejectWithValue('Token non trouvé');
        }
        try {
            await axios.delete(`${API_URL}/api/users/${userId}/characters/${characterId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return characterId;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

// Ajouter une note
export const addCharacterNote = createAsyncThunk(
    'character/addCharacterNote',
    async ({ userId, characterId, noteData }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axios.post(`${API_URL}/api/users/${userId}/characters/${characterId}/notes`, noteData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Modifier une note
export const updateCharacterNote = createAsyncThunk(
    'character/updateCharacterNote',
    async ({ userId, characterId, noteId, noteData }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await axios.patch(`${API_URL}/api/users/${userId}/characters/${characterId}/notes/${noteId}`, noteData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Supprimer une note
export const deleteCharacterNote = createAsyncThunk(
    'character/deleteCharacterNote',
    async ({ userId, characterId, noteId }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            await axios.delete(`${API_URL}/api/users/${userId}/characters/${characterId}/notes/${noteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return noteId;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRaces.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRaces.fulfilled, (state, action) => {
                state.races = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchRaces.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchClasses.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchClasses.fulfilled, (state, action) => {
                state.classes = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchClasses.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchBackgrounds.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBackgrounds.fulfilled, (state, action) => {
                state.backgrounds = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchBackgrounds.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createCharacter.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createCharacter.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.characters.push(action.payload);
            })
            .addCase(createCharacter.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : action.error.message;
            })
            .addCase(fetchCharacter.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharacter.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedCharacter = action.payload;
            })
            .addCase(fetchCharacter.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : action.error.message;
            })
            .addCase(fetchCharactersByUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCharactersByUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.characters = action.payload;
            })
            .addCase(fetchCharactersByUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : action.error.message;
            })
            .addCase(deleteCharacter.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCharacter.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.characters = state.characters.filter((character) => character.id !== action.payload);
            })
            .addCase(deleteCharacter.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : action.error.message;
            })
            .addCase(updateCharacter.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCharacter.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedCharacter = action.payload;
            })
            .addCase(updateCharacter.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : action.error.message;
            })
            .addCase(addCharacterNote.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCharacterNote.fulfilled, (state, action) => {
                if (!state.selectedCharacter.notes) {
                    state.selectedCharacter.notes = [];
                }
                state.selectedCharacter.notes.push(action.payload);
            })
            .addCase(addCharacterNote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : action.error.message;
            })
            .addCase(updateCharacterNote.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateCharacterNote.fulfilled, (state, action) => {
                const index = state.selectedCharacter.notes.findIndex(note => note.id === action.payload.id);
                if (index !== -1) {
                    state.selectedCharacter.notes[index] = action.payload;
                }
            })
            .addCase(updateCharacterNote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : action.error.message;
            })
            .addCase(deleteCharacterNote.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteCharacterNote.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedCharacter.notes = state.selectedCharacter.notes.filter((note) => note.id !== action.payload);
            })
            .addCase(deleteCharacterNote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.error : action.error.message;
            });
    },
});

export default characterSlice.reducer;
