import abilities from "../../../data/abilities.json";

function AttributeAbility() {
 
  const jsonData = abilities;

  return ( 
    <div className="bg-gray-900">
    <main className="pb-10 mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
      <img src="../images/abilities/ability.jpg" className="h-full w-8/12 object-cover object-center sm:rounded-lg mx-auto" />


    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 place-content-around mt-10">
      {jsonData.map((item, index) => (
        <div className="bg-gray-800 rounded-lg p-2 m-2" key={index}>
          <div className="text-gray-50 bg-gray-900 rounded-lg p-2 font-semibold uppercase text-center">{item.full_name}</div>
          <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">{item.description}</div>
          {item.skills.map((skill, skillIndex) => (
            <div className="bg-gray-700 text-gray-50 rounded-lg m-2" key={skillIndex}>
              <div className="bg-gray-600 text-gray-50 rounded-lg p-2 font-semibold text-center uppercase">{skill.name}</div>
              <div className="p-2 text-justify">{skill.description}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
    </main></div>
    )} 

  export default AttributeAbility;