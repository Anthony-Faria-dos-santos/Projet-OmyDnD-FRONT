// Importation des outils nécessaires depuis Redux Toolkit et Axios pour les requêtes HTTP.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initialisation de l'état pour la gestion de l'authentification.
const initialState = {
  user: null, // Aucun utilisateur connecté par défaut.
  token: localStorage.getItem("token"), // Tente de récupérer un token JWT stocké localement.
  status: "idle", // État initial de la requête (idle, loading, succeeded, failed).
  error: null, // Aucune erreur par défaut.
};

// Crée une action asynchrone pour l'enregistrement d'un utilisateur.
export const signUpUser = createAsyncThunk(
  "auth/signUp", // Identifie l'action.
  async (userData, { rejectWithValue }) => { // Fonction asynchrone prenant les données utilisateur.
    try {
      const response = await axios.post("/api/users/signup", userData); // Envoie une requête POST pour l'inscription.
      return response.data; // Renvoie les données de l'utilisateur.
    } catch (error) {
      return rejectWithValue(error.response.data); // Gère les erreurs en renvoyant les données d'erreur.
    }
  }
);

// Crée une action asynchrone pour la connexion d'un utilisateur.
export const signInUser = createAsyncThunk(
  "auth/signin", // Identifie l'action.
  async (userData, { rejectWithValue }) => { // Fonction asynchrone prenant les données utilisateur.
    try {
      const response = await axios.post("/api/users/signin", userData); // Envoie une requête POST pour la connexion.
      localStorage.setItem("token", response.data.token); // Stocke le token reçu dans le localStorage.
      return response.data; // Renvoie les données de l'utilisateur et le token.
    } catch (error) {
      return rejectWithValue(error.response.data); // Gère les erreurs en renvoyant les données d'erreur.
    }
  }
);

// Crée une action asynchrone pour la suppression d'un compte utilisateur.
export const deleteUser = createAsyncThunk(
  "auth/delete", // Identifie l'action.
  async (slug, { getState, rejectWithValue }) => { // Fonction asynchrone sans données d'entrée directe.
    const token = getState().auth.token; // Récupère le token depuis l'état global.
    try {
      // Envoie une requête DELETE pour supprimer le compte, en utilisant le token pour l'authentification.
      const response = await axios.delete(`/api/users/${slug}`, { 
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token"); // Supprime le token du localStorage.
      return response.data; // Renvoie les données de réponse.
    } catch (error) {
      return rejectWithValue(error.response.data); // Gère les erreurs en renvoyant les données d'erreur.
    }
  }
);

// Crée un slice Redux pour l'authentification.
const authSlice = createSlice({
  name: "auth", // Nom du slice.
  initialState, // État initial.
  reducers: {
    logout(state) { // Reducer pour la déconnexion.
      localStorage.removeItem("token"); // Supprime le token du localStorage.
      state.user = null; // Réinitialise l'utilisateur à null.
      state.token = null; // Réinitialise le token à null.
    },
  },
  extraReducers: (builder) => { // Traite les actions asynchrones.
    builder
      .addCase(signUpUser.pending, (state) => { // Gère l'état pendant l'inscription.
        state.status = "loading"; // Indique que l'action est en cours.
      })
      // Gère l'état après une inscription réussie.
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload.user; // Met à jour l'utilisateur.
        state.token = action.payload.token; // Met à jour le token.
        state.status = "succeeded"; // Indique que l'action a réussi.
      })
      // Gère l'état après une inscription échouée.
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed"; // Indique que l'action a échoué.
        state.error = action.payload.message; // Met à jour l'erreur.
      })
      .addCase(signInUser.pending, (state) => { // Gère l'état pendant la connexion.
        state.status = "loading"; // Indique que l'action est en cours.
      })
      // Gère l'état après une connexion réussie.
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload.user; // Met à jour l'utilisateur.
        state.token = action.payload.token; // Met à jour le token.
        state.status = "succeeded"; // Indique que l'action a réussi.
      })
      // Gère l'état après une connexion échouée.
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed"; // Indique que l'action a échoué.
        state.error = action.payload.message; // Met à jour l'erreur.
      })
      .addCase(deleteUser.pending, (state) => { // Gère l'état pendant la suppression de compte.
        state.status = "loading"; // Indique que l'action est en cours.
      })
      // Gère l'état après une suppression de compte réussie.
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null; // Réinitialise l'utilisateur à null.
        state.token = null; // Réinitialise le token à null.
        state.status = "succeeded"; // Indique que l'action a réussi.
      })
      // Gère l'état après une suppression de compte échouée.
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed"; // Indique que l'action a échoué.
        state.error = action.payload.message; // Met à jour l'erreur.
      });      
  },
});

// Exporte l'action de déconnexion pour utilisation dans les composants.
export const { logout } = authSlice.actions;

// Exporte le reducer pour intégration dans le store global.
export default authSlice.reducer;
