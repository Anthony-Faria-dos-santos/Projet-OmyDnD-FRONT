import { useState, useEffect } from "react"; // Importe React et les Hooks useState et useEffect pour gérer l'état local du composant.
import { useDispatch, useSelector } from "react-redux"; // Importe le Hook useDispatch pour permettre l'envoi d'actions Redux.
import { signInUser, initializeAuth } from "../../../store/slices/authSlice.js"; // Importe l'action signInUser pour permettre la connexion d'un utilisateur.
import { useNavigate } from 'react-router-dom';

function SignIn() {
  // Déclare le composant fonctionnel SignIn.
  const dispatch = useDispatch(); // Initialise useDispatch pour envoyer des actions à l'état global Redux.
  const [email, setEmail] = useState(""); // Crée un état local pour l'email avec un setter, initialisé à une chaîne vide.
  const [password, setPassword] = useState(""); // Crée un état local pour le mot de passe avec un setter, initialisé à une chaîne vide.
  const { error, isAuthenticated, status } = useSelector((state) => state.auth); // Extrait l'erreur, l'état d'authentification et le statut de l'état global Redux.
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(signInUser({ email, password }));
      if (signInUser.fulfilled.match(response)) {
        navigate("/");
      } else {
        console.error("Échec de la connexion");
      }
    } catch (error) {
      console.error("Erreur lors de la tentative de connexion", error);
    }
  };

  useEffect(() => {
    dispatch(initializeAuth()); // Initialise l'authentification au montage du composant
  }, [isAuthenticated, dispatch, navigate]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-50">
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
        {status === 'loading' && <p className="text-green-500">Connexion en cours...</p>}
      {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default SignIn;
