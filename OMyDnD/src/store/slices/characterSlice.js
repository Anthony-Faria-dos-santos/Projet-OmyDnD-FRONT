import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const initialState = {
    races: [],
    classes: [],
    backgrounds: [],
    characters: [],
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
            });
            // const characters = useSelector(state => state.character.characters); // Récupère les personnages.// À utiliser dans le composant profil.
    },
});

export default characterSlice.reducer;
