import React, { useState } from 'react'; // Importe React et le Hook useState pour gérer l'état local du composant.
import { useDispatch } from 'react-redux'; // Importe le Hook useDispatch pour permettre l'envoi d'actions Redux.
import { signInUser } from '../../../store/slices/authSlice.js'; // Importe l'action signInUser depuis le slice d'authentification.
import { FormField, Button, Form } from 'semantic-ui-react'

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
    <div className='flex flex-col justify-center items-center h-screen'>
    <Form onSubmit={handleSubmit} className='flex flex-col m-8 w-80'>
      <FormField>
      <label htmlFor="email"><p className='text-xl uppercase'>L'adresse mail : </p></label>
      <input
        className='custom-size'
        type="email"
        placeholder="Email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Met à jour l'état local email lors de chaque saisie.
      />
      </FormField>
      <FormField>
      <label htmlFor="password"><p className='text-xl uppercase'>Mot de passe : </p></label>
      <input
        className='custom-size'
        type="password"
        placeholder="Mot de passe"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Met à jour l'état local password lors de chaque saisie.
      /></FormField>
      <Button type="submit" className="register-button">Connexion</Button>
      
    </Form>
    </div>
  );
}

export default SignIn;
