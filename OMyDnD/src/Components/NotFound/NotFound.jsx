import { useEffect, useState } from "react";
import './style.scss';

const images = [
  "../images/notfound/1.jpg",
  "../images/notfound/2.jpg",
  "../images/notfound/3.jpg",
  "../images/notfound/4.jpg",
  "../images/notfound/5.jpg",
  "../images/notfound/6.jpg",
  "../images/notfound/7.jpg",
  "../images/notfound/8.jpg",
  "../images/notfound/9.jpg",
  "../images/notfound/10.jpg",
  "../images/notfound/11.jpg",
  "../images/notfound/12.jpg",
  "../images/notfound/13.jpg",
  "../images/notfound/14.jpg",
];

const NotFound = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rolling, setRolling] = useState(false);
    const [diceValue, setDiceValue] = useState(null);

    useEffect(() => {
        const newIndex = Math.floor(Math.random() * images.length);
        setCurrentIndex(newIndex);
    }, []);

    const rollDice = () => {
      const newValue = Math.floor(Math.random() * 20) + 1;
      setDiceValue(newValue);
      setRolling(true);
      setTimeout(() => {
          setRolling(false);
          if (newValue !== 1) {
              setTimeout(() => {
                  window.location.href = "/"; // Redirection vers la page d'accueil
              }, 1000); // Rediriger après 1 seconde
          }
      }, 1000); // Arrêter l'animation après 1 seconde
  };

  return (
    <div className="bg-gray-900 m-2">
      <main className="pb-10 mx-auto max-w-full sm:px-6 sm:pt-16 lg:px-8 flex flex-col place-items-center" >
        <div className="bg-gray-900/75 m-2 bg-center p-2 rounded-lg">
          <h1 className="text-3xl font-bold tracking-tight text-gray-50 ">Il semblerait que vous vous soyez trompé de porte ...</h1>
        </div>
        <img src={`${images[currentIndex]}`} className="h-full w-3/5 object-cover object-center sm:rounded-lg mx-auto" />
        <div className="bg-gray-400/75 m-2 bg-center p-2 rounded-lg">
          <div className="text-gray-800 bg-transparent" >Prendre la fuite ?(cliquez ci-dessous)</div>
        </div>
        <div className="dice-container">
          <div className={`dice ${rolling ? 'rolling' : ''}`} onClick={rollDice}>
              {diceValue && <div className="dice-value">{diceValue}</div>}
          </div>
        </div>
        {diceValue === 1 && <div className="bg-gray-400/75 m-2 bg-center p-2 rounded-lg">Echec critique ! Retentez votre chance !</div>}
      </main>
    </div>
  );
};

export default NotFound;