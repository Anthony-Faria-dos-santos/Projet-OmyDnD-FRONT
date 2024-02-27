import { useState } from "react"; // Importation du hook useState de react pour gérer les états locaux.
import { useDispatch } from "react-redux"; // Importation du hook useDispatch de react-redux pour dispatcher des actions Redux.
import { signUpUser } from "../../../store/slices/authSlice.js"; // Importation de l'action signUpUser depuis son fichier de définition.
import { useNavigate } from "react-router-dom"; // Importation du hook useNavigate de react-router-dom pour la navigation.
import { ModalSucces } from "./ModalSucces.jsx"; // Importation du composant ModalSucces pour afficher une modale de succès.

function SignUp() {
  const dispatch = useDispatch(); // Initialisation du dispatch grâce au hook useDispatch.
  const navigate = useNavigate(); // Initialisation de la fonction navigate grâce au hook useNavigate.
  // Déclaration des états locaux pour le formulaire d'inscription avec le hook useState.
  const [email, setEmail] = useState(""); // État pour l'email de l'utilisateur.
  const [pseudo, setPseudo] = useState(""); // État pour le nom d'utilisateur.
  const [password, setPassword] = useState(""); // État pour le mot de passe.
  const [confirmPassword, setConfirmPassword] = useState(""); // État pour le mot de passe à confirmer.
  const [error, setError] = useState(""); // État pour les erreurs.
  const [showModal, setShowModal] = useState(false); // État pour afficher ou masquer la modale de succès.

  const validatePassword = () => { // Définition de la fonction validatePassword pour valider le mot de passe.
    if (password !== confirmPassword) { // Si le mot de passe et le mot de passe à confirmer ne correspondent pas.
      setError("Les mots de passe ne correspondent pas"); // Met à jour l'état des erreurs.
      return false;
    }
    if (password.length < 8) { // Si le mot de passe contient moins de 8 caractères.
      setError("Le mot de passe doit contenir au moins 8 caractères"); // Met à jour l'état des erreurs.
      return false;
    }
    return true;
  };

  // Définition de la fonction handleSubmit qui sera appelée lors de la soumission du formulaire.
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut de soumission de formulaire (rechargement de la page).
    if (validatePassword()) {
      dispatch(signUpUser({ email, pseudo, password })) // Dispatch de l'action signUpUser avec email, pseudo, et password comme payload.
        .unwrap() // Renvoie les données de réponse.
        .then(() => { // Gère la résolution de la promesse.
          localStorage.setItem("signupSuccess", "true"); // Stocke une variable dans le localStorage pour indiquer une inscription réussie.
          setShowModal(true); // Active l'affichage de la modale
          setTimeout(() => {
            setShowModal(false); // Désactive l'affichage de la modale après 3 secondes
            navigate("/signin"); // Redirige l'utilisateur vers la page de connexion après 3 secondes
          }, 3000);
          setEmail(""); // Réinitialise l'état de l'email.
          setPseudo(""); // Réinitialise l'état du nom d'utilisateur.
          setPassword(""); // Réinitialise l'état du mot de passe.
          setConfirmPassword(""); // Réinitialise l'état du mot de passe à confirmer.
          setError(""); // Réinitialise l'état des erreurs.
        })
        .catch((error) => { // Gère les erreurs.
          const errorMessage = error?.error || "Une erreur inattendue est survenue."; // Stocke le message d'erreur ou un message par défaut.
          setError(errorMessage) // Met à jour l'état des erreurs.
        });
    }
  };

  return (


    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-50">
          Créez un compte utilisateur
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-50"
            >
              Nom d&apos;utilisateur
            </label>
            <div className="mt-2">
              <input
                id="pseudo"
                name="pseudo"
                type="text"
                autoComplete="name"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)} // Met à jour l'état du nom d'utilisateur à chaque changement.
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-50"
            >
              Adresse Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Met à jour l'état de l'email à chaque changement.
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-50"
              >
                Mot de passe
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Met à jour l'état du mot de passe à chaque changement.
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-50"
              >
                Confirmez votre mot de passe
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // Met à jour l'état du mot de passe à chaque changement.
              />
            </div>
          </div>

          <div className="text-red-500">
            {error && <p>{error}</p>}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              S&apos;inscrire
            </button>
          </div>
        </form>
      </div>
      {showModal && <ModalSucces />} {/* Si showModal est vrai, affiche le composant ModalSucces */}
    </div>

  );
}

export default SignUp;
