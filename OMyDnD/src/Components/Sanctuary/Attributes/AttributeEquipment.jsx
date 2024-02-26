import simpleWeapons from "../../../data/simple.weapons.json";
import warWeapons from "../../../data/war.weapons.json";
import armors from "../../../data/armors.json";
import weaponsProperties from "../../../data/weapons.properties.json";

function AttributeEquipment() {
 
  const jsonDataWeapons = simpleWeapons;
  const jsonDataWarWeapons = warWeapons;
  const jsonDataArmor = armors;
  const jsonDataProperties = weaponsProperties;

  return ( 
    <div className="bg-gray-900">
    <main className="pb-10 mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
      <img src="/images/equipment/equipment.jpg"
      alt="Illustration d'une salle remplie d'armes médiévales disposées le long des murs, ainsi que d'étagères garnies de livres." 
      aria-label="C'est une image représentant une salle médiévale avec une table en bois au centre, entourée d'armes et de livres accrochés aux murs."
      className="h-full w-8/12 object-cover object-center sm:rounded-lg mx-auto mb-8" />

   <div className="lg:grid">
   
   <h1 className="text-3xl font-bold tracking-tight text-gray-50 text-center">
                Propriétés des armes
              </h1>

 <div className="text-gray-50 p-2 m-3 lg:grid lg:grid-cols-2 lg:gap-x-8 grid place-content-around">
    {jsonDataProperties.map((item, index) => (
   
      <div key={index} className="bg-gray-700 rounded-lg m-2 p-1"> 
      <div className="p-2 uppercase font-semibold bg-gray-800 rounded-lg text-center m-2">{item.name}</div> 
        <p className="text-justify p-2">{item.desc}</p>   
      </div>
    
    ))}
 </div>

 <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1 mb-6"></div>

 <h1 className="text-3xl font-bold tracking-tight text-gray-50 text-center">
                Armes communes
              </h1>

<div className="overflow-x-auto">
    <table className="bg-gray-700 text-gray-50 rounded-lg p-1 m-2 border-separate border-spacing-2 overflow-x-auto table-fixed w-[1050px]">
    <thead>
      <tr>
        <th className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Nom</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Portée</th>
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Cout</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Type de dégat</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Dès de dommage</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Poids</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Propriétés</th> 
      </tr>
    </thead>

  <tbody>
    {jsonDataWeapons.map((item, index) => (
    
      <tr key={index}> 
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.name}</td>  
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.weapon_range}</td>  
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.cost}</td>  
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.damage_type}</td>
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.damage_dice}</td> 
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.weight}</td>  
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.properties}</td> 
      </tr>
    ))}
 </tbody>
 </table>
  </div> 

  <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1 mb-6"></div>
  
  <h1 className="text-3xl font-bold tracking-tight text-gray-50 text-center">
                Armes de guerre
              </h1>

   <div className="overflow-x-auto">
   <table className="bg-gray-700 text-gray-50 rounded-lg p-1 m-2 border-separate border-spacing-2 overflow-x-auto table-fixed w-[1050px]">
    <thead>
      <tr>
        <th className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Nom</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Portée</th>
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Cout</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Type de dégat</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Dès de dommage</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Poids</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Propriétés</th> 
      </tr>
    </thead>

  <tbody>
    {jsonDataWarWeapons.map((item, index) => (
    
      <tr key={index}> 
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.name}</td>  
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.weapon_range}</td>  
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.cost}</td>  
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.damage_type}</td>
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.damage_dice}</td> 
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.weight}</td>  
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.properties}</td> 
      </tr>

    ))}
 </tbody>
   </table>
      </div>

      <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1 mb-6"></div>

      <h1 className="text-3xl font-bold tracking-tight text-gray-50 text-center">
                Armures
              </h1>

      <div className="overflow-x-auto">
      <table className="bg-gray-700 text-gray-50 rounded-lg p-1 m-2 border-separate border-spacing-2 overflow-x-auto table-fixed w-[1050px]">
    <thead>
      <tr>
        <th className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Nom</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Catégorie</th>
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">CA</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Bonus de dextérité</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Force minimum</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Désavantage</th> 
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Poids</th>
        <th  className="p-2 uppercase font-semibold bg-gray-800 rounded-lg">Coût</th> 
      </tr>
    </thead>

  <tbody>
    {jsonDataArmor.map((item, index) => (
    
      <tr key={index}> 
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.name}</td>  
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.armor_category}</td>  
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.base}</td>  
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.dex_bonus}</td>
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.str_minimum}</td> 
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.stealth_disadvantage}</td>  
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.weight}</td>
        <td className="p-1 border border-solid border-1 border-gray-900 hover:bg-gray-50 hover:text-gray-900 transition-all">{item.cost}</td>  
      </tr>

    ))}
 </tbody> 
 
 </table> 
 </div>

 <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1 mb-6"></div>
   </div>
    </main></div>
    )} 

  export default AttributeEquipment;