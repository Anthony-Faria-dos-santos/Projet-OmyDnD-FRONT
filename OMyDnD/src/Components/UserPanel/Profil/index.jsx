import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';

function Profil() {
  const API_URL = import.meta.env.VITE_API_URL;

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePseudoChange = (event) => setPseudo(event.target.value);
  const handleOldPasswordChange = (event) => setOldPassword(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);
  const handleEmailConfirmChange = (event) => setEmailConfirm(event.target.value);

  const updateEmail = (userId, newEmail) => {
    axios.patch(`${API_URL}/api/users/${userId}/profile/email`, { email: newEmail })
      .then(response => {
        console.log('Email modifié avec succes:', response.data);
        setSuccessMessage("Email mis à jour avec succès!");
        setErrorMessage('');
        dispatch(logout());
      })
      .catch(error => {
        setErrorMessage(error?.response.data.error || 'Erreur de modification de email:');
        setSuccessMessage('');
        console.log(error);
      });
  };

  const updatePseudo = (userId, newpseudo) => {
    axios.patch(`${API_URL}/api/users/${userId}/profile/pseudo`, { pseudo: newpseudo })
      .then(response => {
        console.log('Pseudo modifié avec succes:', response.data);
        setSuccessMessage('Pseudo modifié avec succes:', response.data);
        setErrorMessage('');
        dispatch(logout());
      })
      .catch(error => {
        setErrorMessage(error?.response.data.error || 'Erreur de modification du pseudo:', error);
        setSuccessMessage('');
      });
  };

  const updatePassword = (userId, newPassword, oldPassword) => {
    axios.patch(`${API_URL}/api/users/${userId}/profile/password`, { password: newPassword, oldPassword: oldPassword })
      .then(response => {
        console.log('Mot de passe modifié avec succes:', response.data);
        setSuccessMessage("Mot de passe modifié avec succès!");
        setErrorMessage('');
        dispatch(logout());
      })
      .catch(error => {
        setErrorMessage(error?.response.data.error || 'Erreur de modification de mot de passe :', error);
        setSuccessMessage('');
      });
  };

  const deleteUser = (userId, emailConfirm) => {
    console.log(user.id + emailConfirm)
    console.log(typeof (user.id));
    axios.delete(`${API_URL}/api/users/${userId}/delete`, { data: { email: emailConfirm } })
      .then(response => {
        console.log('Compte supprimé avec succes :', response.data);
        setSuccessMessage("Utilisateur supprimé avec succès !");
        setErrorMessage('');
        dispatch(logout());
      })
      .catch(error => {
        setErrorMessage(error?.response.data.error || 'Erreur de suppression du compte :', error);
        setSuccessMessage('');
      });
  };

  const handleSubmitDelete = (event) => {
    event.preventDefault();
    if (emailConfirm !== user.email) {
      setErrorMessage("L'email rentré est invalide");
      setSuccessMessage('');
      return;
    }
    setModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteUser(user.id, emailConfirm);
    setSuccessMessage("Utilisateur supprimé avec succès !");
    dispatch(logout());
    localStorage.removeItem("token");
    setModalOpen(false);
    navigate('/signin');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas")
      return;
    }
    if (email.length > 4) {
      updateEmail(user.id, email);
    }
    if (pseudo.length > 3 && pseudo !== user.pseudo) {
      updatePseudo(user.id, pseudo);
      setSuccessMessage("Pseudo mis à jour avec succès !");
    }
    if (password.length > 8) {
      updatePassword(user.id, password, oldPassword);
      setSuccessMessage("Mot de passe mis à jour avec succès!")
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <h2 className="mt-10 text-center text-4xl font-bold tracking-tight text-gray-50">
          Profil de {user?.pseudo}
        </h2>
        <h4 className="mt-0 text-center text-xl font-bold tracking-tight text-gray-50">
          <strong>({user?.email})</strong>
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 mt-10 sm:mx-auto sm:w-full sm:max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-3"
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-lg">
            <h4 className="text-green-500 font-bold tracking-tight text-gray-50">
              <strong>Entrez chaque champs que vous voulez modifier</strong>
            </h4>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-50"
            >
              Entrez votre nouvelle adresse email :
            </label>
            <div className="mt-2">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="pseudo"
              className="block text-sm font-medium leading-6 text-gray-50"
            >
              Entrez votre nouveau pseudo :
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="pseudo"
                name="pseudo"
                value={pseudo}
                onChange={handlePseudoChange}
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium leading-6 text-gray-50"
              >
                Mot de passe actuel :
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-50"
              >
                Nouveau mot de passe :
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-50"
              >
                Confirmation du nouveau mot de passe :
              </label>
            </div>
            <div className="mt-2">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="text-red-500">
            <button
              type="submit"
              className="mt-6 mb-6 flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Sauvegarder les modifications
            </button>
          </div>
        </form>
        <form onSubmit={handleSubmitDelete} className="space-y-6"
        >
          <div>
            <div className="mb-3 sm:mx-auto sm:w-full sm:max-w-lg">
              <h4 className="text-red-500 font-bold tracking-tight text-gray-50">
                <strong>Supprimer le compte ({user?.pseudo})</strong>
              </h4>
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium leading-6 text-gray-50"
              >
                Rentrer votre email actuelle pour <strong>supprimer votre compte</strong> :
              </label>
            </div>
            <div className="mt-2">
              <input
                type="email"
                id="emailConfirm"
                name="emailConfirm"
                value={emailConfirm}
                onChange={handleEmailConfirmChange}
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="text-red-500">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Supprimer son compte
            </button>
          </div>
          <div>
            {successMessage && <div className="bg-gray-50 rounded-lg p-2 text-center font-semibold text-green-700 text-lg">{successMessage}</div>}
            {errorMessage && <div className="bg-gray-50 rounded-lg p-2 text-center font-semibold text-red-700 text-lg">{errorMessage}</div>}
          </div>
        </form>
      </div>
      <Modal
        basic
        onClose={() => setModalOpen(false)}
        onOpen={() => setModalOpen(true)}
        open={modalOpen}
        size='small'>
        <Header icon>
          <Icon name='archive' />
          Supprimer le compte
        </Header>
        <Modal.Content>
          <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={() => setModalOpen(false)}>
            <Icon name='remove' /> Non
          </Button>
          <Button color='green' inverted onClick={handleConfirmDelete}>
            <Icon name='checkmark' /> Oui
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default Profil;
