import { useEffect, useState } from "react";

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
  
    useEffect(() => {
        const newIndex = Math.floor(Math.random() * images.length);
        setCurrentIndex(newIndex);
    }, []);

  return (
    <div className="bg-gray-900 m-2">
      <main className="pb-10 mx-auto max-w-full sm:px-6 sm:pt-16 lg:px-8 flex flex-col place-items-center" >
      <div className="bg-gray-900/75 m-2 bg-center p-2 rounded-lg">
      <h1 className="text-3xl font-bold tracking-tight text-gray-50 ">Il semblerait que vous vous soyez trompé de porte ...</h1>
      </div>
      <img src={`${images[currentIndex]}`} 
              className="h-full w-3/5 object-cover object-center sm:rounded-lg mx-auto" />
      <div className="bg-gray-400/75 m-2 bg-center p-2 rounded-lg ">
      <a className="text-gray-800 bg-transparent " href="/">Prendre la fuite ?</a>
      </div>
      </main>
    </div>
  );
};

export default NotFound;