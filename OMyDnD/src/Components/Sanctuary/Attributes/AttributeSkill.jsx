import skills from "../../../data/talents.json";

function AttributeSkill() {
 
  const jsonData = skills;

  return ( 
    <div className="bg-gray-900">
    <main className="pb-10 mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
      <img src="../images/talents/talents.jpg" className="h-full w-8/12 object-cover object-center sm:rounded-lg mx-auto" />


    <div className="p-2 bg-gray-800 rounded-lg mt-8">
      {jsonData.map((item, index) => (
        <div className="bg-gray-800 rounded-lg p-2 m-2" key={index}>
          <div className="text-gray-50 bg-gray-900 rounded-lg p-2 font-semibold uppercase text-center">{item.name}</div>
          <div className="bg-gray-800 italic text-gray-50 rounded-lg m-2 p-2 text-justify">{item.description}</div>
          <div className="grid grid-cols-2">
          <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">1- {item.choices.choice_1}</div>
          <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">2- {item.choices.choice_2}</div>
          {item.choices.choice_3 && (
            <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">3- {item.choices.choice_3}</div>
          )}
          {item.choices.choice_4 && (
            <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">4- {item.choices.choice_4}</div>
          )}
          {item.choices.choice_5 && (
            <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">5- {item.choices.choice_5}</div>
          )}
          {item.choices.choice_6 && (
            <div className="bg-gray-700 text-gray-50 rounded-lg m-2 p-2 text-justify">6- {item.choices.choice_6}</div>
          )}
          </div>
        </div>
      ))}
    </div>
    </main></div>
    )} 

  export default AttributeSkill;