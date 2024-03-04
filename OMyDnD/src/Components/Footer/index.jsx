import { Link } from "react-router-dom";

function Footer() {

  return (
    <footer className="bg-white border-solid border-b-gray-700 border-b-4">

      <div className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1"></div>
      
      <div className="bg-gray-900  p-2">

        <p className="text-xs sm:text-base text-gray-50 text-center">
        Atlas des Royaumes oubliés - <Link to="/legals" relative="path">Mentions légles</Link>
        </p>

        <p className="text-xs sm:text-base text-gray-50 text-center">
          Ce site est un contenu de fan non officiel autorisé dans le cadre de la Politique des contenus de fans. Ni approuvé, ni promu par Wizards. Certaines parties des matériaux utilisés sont la propriété de Wizards of the Coast. ©Wizards of the Coast LLC.
        </p>
        
      </div>
      
    </footer>
  );
}

export default Footer;