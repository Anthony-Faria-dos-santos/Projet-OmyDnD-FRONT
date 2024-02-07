
import React, { useState } from 'react'; // Importation de React pour utiliser les hooks et JSX.

import { useDispatch } from 'react-redux'; // Importation du hook useDispatch de react-redux pour dispatcher des actions Redux.

import { signUpUser } from '../index.js'; // Importation de l'action signUpUser depuis son fichier de définition.

// Définition du composant fonctionnel SignUp.
function SignUp() {
  
  const dispatch = useDispatch(); // Initialisation du dispatch grâce au hook useDispatch.
  // Déclaration des états locaux pour le formulaire d'inscription avec le hook useState.
  const [email, setEmail] = useState(''); // État pour l'email de l'utilisateur.
  const [username, setUsername] = useState(''); // État pour le nom d'utilisateur.
  const [password, setPassword] = useState(''); // État pour le mot de passe.

  // Définition de la fonction handleSubmit qui sera appelée lors de la soumission du formulaire.
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut de soumission de formulaire (rechargement de la page).
    // Dispatch de l'action signUpUser avec email, username, et password comme payload.
    dispatch(signUpUser({ email, username, password }));
  };

  // Rendu du formulaire d'inscription.
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Nom d'utilisateur : </label>
      <input
        type="username"
        placeholder="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Met à jour l'état du nom d'utilisateur à chaque changement.
      />
      <label htmlFor="email">L'adresse mail : </label>
      <input
        type="email"
        placeholder="Email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Met à jour l'état de l'email à chaque changement.
      />
      <label htmlFor="password">Mot de passe : </label>
      <input
        type="password"
        placeholder="Mot de passe"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Met à jour l'état du mot de passe à chaque changement.
      />
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default SignUp;
