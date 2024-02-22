import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

function Profil() {

  const API_URL = import.meta.env.VITE_API_URL;

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token && user);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
  };
    
  const handleOldPassword = (event) => {
    setOldPassword(event.target.value);
};

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
  };

    const handleConfirmPasswordChange = (event) => {
      setConfirmPassword(event.target.value);
  };


const updateEmail = (userId, newEmail) => {
  axios.patch(`${API_URL}/api/users/${userId}/profile/email`, { email: newEmail })
      .then(response => {
          console.log('Email modifié avec succes:', response.data);
          // Handle success
      })
      .catch(error => {
          console.error('Erreur de modification de email:', error);
          // Handle error
      });
};

const updateUsername = (userId, newUsername) => {
  axios.patch(`${API_URL}/api/users/${userId}/profile/pseudo`, { pseudo: newUsername })
      .then(response => {
          console.log('Pseudo modifié avec succes:', response.data);
          // Handle success
      })
      .catch(error => {
          console.error('Erreur de modification du pseudo:', error);
          // Handle error
      });
};

const updatePassword = (userId, newPassword, oldPassword) => {
  axios.patch(`${API_URL}/api/users/${userId}/profile/password`, { password: newPassword, oldPassword: oldPassword })
      .then(response => {
          console.log('Mot de passe modifié avec succes:', response.data);
          // Handle success
      })
      .catch(error => {
          console.error('Erreur de modification de mot de passe :', error);
          // Handle error
      });
};

const deleteUser = (userId) => {
  axios.delete(`${API_URL}/api/users/${userId}`)
      .then(response => {
          console.log('Compte supprimé avec succes :', response.data);
          // Handle success
      })
      .catch(error => {
          console.error('Erreur de suppression du compte :', error);
          // Handle error
      });
};

const handleSubmit = (event) => {
  event.preventDefault();

  // Check if passwords match
  if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
  }

  if(email.length > 4) {
  updateEmail(user.id, email);
  }

  if(username > 3 && username !== user.pseudo) {
  updateUsername(user.id, username);
  }

  if (password > 8) {
  updatePassword(user.id, password, oldPassword);
  }

};

  return (
    <div className="bg-gray-700 rounded-lg p-4 w-fit mx-auto mt-8">
      {isLoggedIn ? (
      <form onSubmit={handleSubmit} className="flex items-center justify-around">
        <div className="bg-gray-800 m-4 rounded-lg p-5 w-fit text-center ">
        <img src="https://placeholder.co/200" className="rounded-lg" />
        <button type="button" onClick={deleteUser} className="bg-gray-50 rounded-lg text-gray-900 p-2 m-2">Supprimer son compte</button>
      </div>
      <div className="bg-gray-800 rounded-lg p-3 m-4 h-fit">
        
        <div className="bg-gray-700 p-2 m-2 rounded-lg">
          <label htmlFor="email"  className="text-gray-50 underline font-semibold underline-offset-2 decoration-double">{user.email} : </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="ml-2 rounded-lg p-1"
                /></div>
        <div className="bg-gray-700 p-2 m-2 rounded-lg"><label htmlFor="username"  className="text-gray-50 underline font-semibold underline-offset-2 decoration-double ">{user.pseudo} :</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="ml-2 rounded-lg p-1"
                /></div>
                <div className="bg-gray-700 p-2 m-2 rounded-lg"><label htmlFor="password" className="text-gray-50 underline font-semibold underline-offset-2 decoration-double">Mot de passe actuel :</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={oldPassword}
                    onChange={handleOldPassword}
                    className="ml-2 rounded-lg p-1"
                />
                </div>
        <div className="bg-gray-700 p-2 m-2 rounded-lg"><label htmlFor="password" className="text-gray-50 underline font-semibold underline-offset-2 decoration-double">Mot de passe :</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="ml-2 rounded-lg p-1"
                />
                </div>
        <div className="bg-gray-700 p-2 m-2 rounded-lg"><label htmlFor="confirmPassword" className="text-gray-50 underline font-semibold underline-offset-2 decoration-double">Confirmation du mot de passe :</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="ml-2 rounded-lg p-1"
                /></div>
                <button type="submit" className="bg-gray-50 text-gray-900 p-2 rounded-lg m-2 ">Sauvegarder les modifications</button>
      </div>
      </form>
      ):( 
        <div></div>
      )}
    </div>
  );
}

export default Profil;