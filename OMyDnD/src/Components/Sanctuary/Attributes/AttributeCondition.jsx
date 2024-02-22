import conditions from "../../../data/conditions.json";

function AttributeCondition() {
 
  const jsonData = conditions;

  return ( 
    <div className="bg-gray-900">
    <main className="pb-10 mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
      <img src="../images/conditions/alteration.jpg" className="h-full w-8/12 object-cover object-center sm:rounded-lg mx-auto" />

      <div className="lg:grid">
      <div className="text-gray-50 p-2 m-3 lg:grid lg:grid-cols-2 lg:gap-x-8 grid place-content-around">
  
    {jsonData.map((item, index) => (
        
        <div key={index} className="bg-gray-700 rounded-lg m-2 p-1"> 
        <div className="p-2 uppercase font-semibold bg-gray-800 rounded-lg text-center m-2">{item.name}</div>  
        <p className="text-justify p-2">{item.description}</p>  
      </div>

))}

</div>
</div>
    </main></div>
    )} 

  export default AttributeCondition;