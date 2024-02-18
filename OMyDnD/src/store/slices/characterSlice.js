import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
    races: [],
    classes: [],
    backgrounds: [],
    characters: [],
    selectedCharacter: null,
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

export const deleteCharacter = createAsyncThunk(
    'character/deleteCharacter',
    async ({userId, characterId}, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        if (!token) {
            return rejectWithValue('Token non trouvé');
        }
        try {
            const response = await axios.delete(`${API_URL}/api/users/${userId}/characters/${characterId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return characterId;
        } catch (error) {
            return rejectWithValue(error.toString());
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
            });
    },
});

export default characterSlice.reducer;
