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
  const backgroundImageUrl = images[currentIndex];
  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <main className="pb-10 max-w-full sm:px-6 lg:px-8 flex flex-col items-center justify-center bg-gray-900 bg-opacity-60 rounded-lg h-full w-full">
        <div className="text-center mb-4">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-50 p-5">Il semblerait que vous vous soyez trompé de porte ...</h1>
        </div>

        <button onClick={rollDice} className="mb-5 mt-4 px-4 py-2 bg-gray-400 text-gray-800 rounded-lg focus:outline-none">
          Prendre la fuite ? (cliquez ci-dessous)
        </button>
        <div className="dice-container">
          {/* Dé avec animation */}
          <div className={`dice ${rolling ? 'rolling' : ''}`} onClick={rollDice}>
            {/* Valeur du dé initial */}
            <div className="dice-value">{diceValue !== null ? diceValue : 20}</div>
          </div>
        </div>
        {diceValue === 1 && (
          <div className="mt-4 bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">
            Echec critique ! Retentez votre chance !
          </div>
        )}
      </main>
    </div>
  );
};

export default NotFound;