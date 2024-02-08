
import React, { useState } from 'react'; // Importation de React pour utiliser les hooks et JSX.
import { useDispatch } from 'react-redux'; // Importation du hook useDispatch de react-redux pour dispatcher des actions Redux.
import { signUpUser } from '../../../store/slices/authSlice.js'; // Importation de l'action signUpUser depuis son fichier de définition.
import { FormField, Button, Form } from 'semantic-ui-react'

function SignUp() {
  
  const dispatch = useDispatch(); // Initialisation du dispatch grâce au hook useDispatch.
  // Déclaration des états locaux pour le formulaire d'inscription avec le hook useState.
  const [email, setEmail] = useState(''); // État pour l'email de l'utilisateur.
  const [username, setUsername] = useState(''); // État pour le nom d'utilisateur.
  const [password, setPassword] = useState(''); // État pour le mot de passe.
  const [confirmPassword, setConfirmPassword] = useState(''); // État pour le mot de passe à confirmer.
  const [error, setError] = useState(''); // État pour les erreurs.

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      console.log("Les mots de passe ne correspondent pas");
      return false;
    }
    return true;
  };

  // Définition de la fonction handleSubmit qui sera appelée lors de la soumission du formulaire.
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut de soumission de formulaire (rechargement de la page).
    if (validatePassword()){
    dispatch(signUpUser({ email, username, password })); // Dispatch de l'action signUpUser avec email, username, et password comme payload.
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Form onSubmit={handleSubmit} className='flex flex-col m-8 w-80'>
      <FormField>
      <label htmlFor="username"><p className='text-xl uppercase'>Nom d'utilisateur : </p></label>
      <input
      className='custom-size'
        type="text"
        placeholder="Nom d'utilisateur"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Met à jour l'état du nom d'utilisateur à chaque changement.
      />
      </FormField>
      <FormField>
      <label htmlFor="email"><p className='text-xl uppercase'>adresse e-mail : </p></label>
      <input
      className='custom-size'
        type="email"
        placeholder="Email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Met à jour l'état de l'email à chaque changement.
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
        onChange={(e) => setPassword(e.target.value)} // Met à jour l'état du mot de passe à chaque changement.
      />
      </FormField>
      <FormField>
      <label htmlFor="confirmPassword"><p className='text-xl uppercase'>Confirmation : </p></label>
      <input
      className='custom-size'
        type="password"
        placeholder="Confirmez votre mot de passe"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)} // Met à jour l'état du mot de passe à chaque changement.
      />
      </FormField>
      {error && <p>{error}</p>}
      <Button type="submit" className="register-button">S'inscrire</Button>
    </Form>
    </div>
  );
}

export default SignUp;
