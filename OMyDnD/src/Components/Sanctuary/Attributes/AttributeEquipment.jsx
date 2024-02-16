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
      <img src="../images/equipment/equipment.jpg" className="h-full w-8/12 object-cover object-center sm:rounded-lg mx-auto" />


   <div className="grid">
    <table className="bg-gray-700 text-gray-50 rounded-lg p-2">
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
        <td>{item.name}</td>  
        <td>{item.weapon_range}</td>  
        <td>{item.cost}</td>  
        <td>{item.damage_type}</td>
        <td>{item.damage_dice}</td> 
        <td>{item.weight}</td>  
        <td>{item.properties}</td> 
      </tr>
    ))}
 </tbody>
   
   </table> 

   <table className="bg-gray-700 text-gray-50 rounded-lg p-2">
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
        <td>{item.name}</td>  
        <td>{item.weapon_range}</td>  
        <td>{item.cost}</td>  
        <td>{item.damage_type}</td>
        <td>{item.damage_dice}</td> 
        <td>{item.weight}</td>  
        <td>{item.properties}</td> 
      </tr>

    ))}
 </tbody>
   
   </table>

      <table className="bg-gray-700 text-gray-50 rounded-lg p-2">
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
        <td>{item.name}</td>  
        <td>{item.armor_category}</td>  
        <td>{item.base}</td>  
        <td>{item.dex_bonus}</td>
        <td>{item.str_minimum}</td> 
        <td>{item.stealth_disadvantage}</td>  
        <td>{item.weight}</td>
        <td>{item.cost}</td>  
      </tr>

    ))}
 </tbody>
   
   </table>  
   </div>
    </main></div>
    )} 

  export default AttributeEquipment;