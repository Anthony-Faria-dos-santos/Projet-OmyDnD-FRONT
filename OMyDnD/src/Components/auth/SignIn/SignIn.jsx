import React, { useState } from 'react'; // Importe React et le Hook useState pour gérer l'état local du composant.
import { useDispatch } from 'react-redux'; // Importe le Hook useDispatch pour permettre l'envoi d'actions Redux.
import { signInUser } from '../../../store/slices/authSlice.js'; // Importe l'action signInUser depuis le slice d'authentification.

function SignIn() { // Déclare le composant fonctionnel SignIn.
  const dispatch = useDispatch(); // Initialise useDispatch pour envoyer des actions à l'état global Redux.
  const [email, setEmail] = useState(''); // Crée un état local pour l'email avec un setter, initialisé à une chaîne vide.
  const [username, setUsername] = useState(''); // Crée un état local pour le nom d'utilisateur avec un setter, initialisé à une chaîne vide.
  const [password, setPassword] = useState(''); // Crée un état local pour le mot de passe avec un setter, initialisé à une chaîne vide.

  const handleSubmit = (e) => { // Définit la fonction handleSubmit appelée lors de la soumission du formulaire.
    e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page).
    dispatch(signInUser({ email, username, password })); // Envoie l'action signInUser avec email, nom d'utilisateur, et mot de passe comme payload.
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">L'adresse mail : </label>
      <input
        type="email"
        placeholder="Email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Met à jour l'état local email lors de chaque saisie.
      />
      <label htmlFor="username">Nom d'utilisateur : </label>
      <input
        type="username"
        placeholder="Nom d'utilisateur"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Met à jour l'état local username lors de chaque saisie.
      />
      <label htmlFor="password">Mot de passe : </label>
      <input
        type="password"
        placeholder="Mot de passe"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Met à jour l'état local password lors de chaque saisie.
      />
      <button type="submit">Connexion</button>
    </form>
  );
}

export default SignIn;
