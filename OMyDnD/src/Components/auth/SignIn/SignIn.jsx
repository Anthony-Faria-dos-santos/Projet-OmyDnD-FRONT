import { useState } from "react"; // Importe React et le Hook useState pour gérer l'état local du composant.
import { useDispatch, useSelector } from "react-redux"; // Importe le Hook useDispatch pour permettre l'envoi d'actions Redux.
import { signInUser } from "../../../store/slices/authSlice.js"; // Importe l'action signInUser depuis le slice d'authentification.
import { useNavigate } from 'react-router-dom';

function SignIn() {
  // Déclare le composant fonctionnel SignIn.
  const dispatch = useDispatch(); // Initialise useDispatch pour envoyer des actions à l'état global Redux.
  const [email, setEmail] = useState(""); // Crée un état local pour l'email avec un setter, initialisé à une chaîne vide.
  const [password, setPassword] = useState(""); // Crée un état local pour le mot de passe avec un setter, initialisé à une chaîne vide.
  const errorMessage = useSelector((state) => state.auth.error); // Récupère le message d'erreur depuis le state global Redux.
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // Définit la fonction handleSubmit appelée lors de la soumission du formulaire.
    e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page).
    dispatch(signInUser({ email, password })); // Envoie l'action signInUser avec email, nom d'utilisateur, et mot de passe comme payload.
    setEmail(""); // Réinitialise l'état de l'email à une chaîne vide.
    setPassword(""); // Réinitialise l'état du mot de passe à une chaîne vide.
    navigate("/sanctuary");
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-50">
          Se connecter
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
              Adresse Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete=""
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
          <div></div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Se connecter
            </button>
          </div>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignIn;
