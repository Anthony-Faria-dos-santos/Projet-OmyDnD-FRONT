import { useEffect, useState } from "react";
import './style.scss';

// Tableau contenant les chemins des images
const images = [
  "/images/notfound/1.jpg",
  "/images/notfound/2.jpg",
  "/images/notfound/3.jpg",
  "/images/notfound/4.jpg",
  "/images/notfound/5.jpg",
  "/images/notfound/6.jpg",
  "/images/notfound/7.jpg",
  "/images/notfound/8.jpg",
  "/images/notfound/9.jpg",
  "/images/notfound/10.jpg",
  "/images/notfound/11.jpg",
  "/images/notfound/12.jpg",
  "/images/notfound/13.jpg",
  "/images/notfound/14.jpg",
];

const NotFound = () => {
  // État pour suivre l'index de l'image actuelle
  const [currentIndex, setCurrentIndex] = useState(0);
  // État pour contrôler l'état de l'animation du dé
  const [rolling, setRolling] = useState(false);
  // État pour stocker la valeur du dé
  const [diceValue, setDiceValue] = useState(null);

  // Effet pour initialiser l'index de l'image lors du premier rendu
  useEffect(() => {
    const newIndex = Math.floor(Math.random() * images.length);
    setCurrentIndex(newIndex);
  }, []);

  // Fonction pour lancer l'animation du dé et rediriger si la valeur est différente de 1
  const rollDice = () => {
    const newValue = Math.floor(Math.random() * 20) + 1;
    setDiceValue(newValue); // Définit la nouvelle valeur du dé
    setRolling(true); // Active l'animation du dé
    setTimeout(() => {
      setRolling(false);
      if (newValue !== 1) {
        setTimeout(() => {
          window.location.href = "/"; // Redirection vers la page d'accueil après 1 seconde
        }, 1000);
      }
    }, 1000); // Désactive l'animation du dé après 1 seconde
  };

  return (
    <div className="bg-gray-900 m-2">
      <main className="pb-10 mx-auto max-w-full sm:px-6 sm:pt-16 lg:px-8 flex flex-col place-items-center" >
        {/* Zone de texte indiquant l'échec critique si la valeur du dé est 1 */}
        {diceValue === 1 && <div className="bg-gray-400/75 m-2 bg-center p-2 rounded-lg">Echec critique ! Retentez votre chance !</div>}
        {/* Conteneur principal */}
        <div className="bg-gray-900/75 m-2 bg-center p-2 rounded-lg">
          <h1 className="text-3xl font-bold tracking-tight text-gray-50 ">Il semblerait que vous vous soyez trompé de porte ...</h1>
        </div>
        {/* Image aléatoire */}
        <img src={`${images[currentIndex]}`} className="h-full w-3/5 object-cover object-center sm:rounded-lg mx-auto" />
        {/* Bouton pour lancer le dé */}
        <div className="bg-gray-400/75 m-2 bg-center p-2 rounded-lg">
          <div className="text-gray-800 bg-transparent" onClick={rollDice}>Prendre la fuite ? (cliquez ci-dessous)</div>
        </div>
        {/* Conteneur du dé */}
        <div className="dice-container">
          {/* Dé avec animation */}
          <div className={`dice ${rolling ? 'rolling' : ''}`} onClick={rollDice}>
            {/* Valeur du dé initial */}
            <div className="dice-value">{diceValue !== null ? diceValue : 20}</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;