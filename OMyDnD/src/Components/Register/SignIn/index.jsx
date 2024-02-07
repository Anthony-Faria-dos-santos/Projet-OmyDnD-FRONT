import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signInUser } from '../index.js'; // Assurez-vous d'avoir le chemin correct

function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, username, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">L'adresse mail : </label>
      <input
        type="email"
        placeholder="Email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="username">Nom d'utilisateur : </label>
      <input
        type="username"
        placeholder="Nom d'utilisateur"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Mot de passe : </label>
      <input
        type="password"
        placeholder="Mot de passe"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Connexion</button>
    </form>
  );
}

export default SignIn;
