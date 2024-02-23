import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

function Profil() {

  const API_URL = import.meta.env.VITE_API_URL;

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(token && user);

  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePseudoChange = (event) => {
      setPseudo(event.target.value);
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

  const handleEmailConfirmChange = (event) => {
    setEmailConfirm(event.target.value);
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

const updatePseudo = (userId, newpseudo) => {
  axios.patch(`${API_URL}/api/users/${userId}/profile/pseudo`, { pseudo: newpseudo })
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

const deleteUser = (userId, emailConfirm) => {
  console.log(user.id + emailConfirm)
  console.log(typeof(user.id));
  axios.delete(`${API_URL}/api/users/${userId}/delete`, { data : {email: emailConfirm }})
      .then(response => {
          console.log('Compte supprimé avec succes :', response.data);
          // Handle success
      })
      .catch(error => {
          console.error('Erreur de suppression du compte :', error);
          // Handle error
      });
};

const handleSubmitDelete = (event) => {
  event.preventDefault();
  if (emailConfirm !== user.email) {
    setErrorMessage("L'email rentré est invalide");
      return;
  }

    // Show the modal for confirmation
    $('.ui.basic.modal').modal('show');
  };

const handleConfirmDelete = () => {

  deleteUser(user.id, user.email);
  setSuccessMessage("Utilisateur supprimé avec succès !")
}

const handleSubmit = (event) => {
  event.preventDefault();
  // Check if passwords match
  if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas")
      return;
  }

  if(email.length > 4) {
  updateEmail(user.id, email);
  setSuccessMessage("Email mis à jour avec succès!");
  }

  if(pseudo.length > 3 && pseudo !== user.pseudo) {
  updatePseudo(user.id, pseudo);
  setSuccessMessage("Pseudo mis à jour avec succès !");
  }

  if (password.length > 8) {
  updatePassword(user.id, password, oldPassword);
  setSuccessMessage("Mot de passe mis à jour avec succès!")
  }

};

  return (
    <div className="bg-gray-900 rounded-lg p-4 w-fit mx-auto mt-8">
      {isLoggedIn ? (
        
        <div>
           {successMessage && <div className="bg-gray-50 rounded-lg p-2 text-center font-semibold text-green-700 text-lg">{successMessage}</div>}
      {errorMessage && <div className="bg-gray-50 rounded-lg p-2 text-center font-semibold text-red-700 text-lg">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="flex items-center justify-around">
      <div className="bg-gray-700 rounded-lg p-3 m-4 h-fit">
        
        <div className="bg-gray-800 p-2 m-2 rounded-lg">
          <label htmlFor="email"  className="text-gray-50">Modifier l'adresse mail actuelle <strong>({user.email})</strong> : </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="ml-2 rounded-lg p-1"
                /></div>
        <div className="bg-gray-800 p-2 m-2 rounded-lg"><label htmlFor="pseudo" className="text-gray-50">Modifier le pseudo actuel <strong>({user.pseudo})</strong> :</label>
                <input
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    value={pseudo}
                    onChange={handlePseudoChange}
                    className="ml-2 rounded-lg p-1"
                />
                </div>
                <div className="bg-gray-800 p-2 m-2 rounded-lg"><label htmlFor="password" className="text-gray-50">Mot de passe actuel :</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={oldPassword}
                    onChange={handleOldPassword}
                    className="ml-2 rounded-lg p-1"
                />
                </div>
        <div className="bg-gray-800 p-2 m-2 rounded-lg"><label htmlFor="password" className="text-gray-50">Mot de passe :</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="ml-2 rounded-lg p-1"
                />
                </div>
        <div className="bg-gray-800 p-2 m-2 rounded-lg"><label htmlFor="confirmPassword" className="text-gray-50">Confirmation du mot de passe :</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="ml-2 rounded-lg p-1"
                /></div>
                <button type="submit" className="bg-gray-50 text-gray-900 p-2 rounded-lg m-2 hover:bg-gray-800 hover:text-gray-50 duration-300 ">Sauvegarder les modifications</button>
      </div>
      </form>
      <form onSubmit={handleSubmitDelete} className="flex items-center justify-around bg-gray-700 p-2 rounded-lg">
          <div className="bg-gray-800 rounded-lg p-2"><label htmlFor="email"  className="text-gray-50">Rentrer votre email pour <strong>supprimer votre compte</strong> : </label>
          <input
                    type="email"
                    id="emailConfirm"
                    name="emailConfirm"
                    value={emailConfirm}
                    onChange={handleEmailConfirmChange}
                    className="ml-2 rounded-lg p-1"
                /></div>
                
          <button type="submit" className="bg-gray-50 rounded-lg text-gray-900 p-2 m-2 hover:bg-gray-800 hover:text-gray-50 duration-300">Supprimer son compte</button>
          <div className="ui basic modal">
            <div class="content">
    <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
  </div>
  <div class="actions">
    <div class="ui red basic cancel inverted button">
      <i class="remove icon"></i>
      No
    </div>
    <div class="ui green ok inverted button" onClick={handleConfirmDelete}>
      <i class="checkmark icon"></i>
      Yes
    </div>
  </div>
  </div>
          </form>
      </div>
      ):( 
        <div></div>
      )}
    </div>
  );
}

export default Profil;