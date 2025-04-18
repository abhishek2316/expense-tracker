import React from "react";

const InfoCards = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div
        className={`w-14 h-14 flex justify-center items-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div className="flex flex-col justify-center">
        <h6 className="text-gray-500 font-medium text-sm">{label}</h6>
        <span className="text-xl font-bold">${value}</span>
      </div>
    </div>
  );
};


// const InfoCards = ({ icon, label, value, color }) => {
//   // console.log("Rendering InfoCard:", label, value);

//   return (
//     <div className={`p-4 rounded shadow text-white ${color}`}>
//       <div className="text-2xl mb-2">{icon}</div>
//       <div className="text-sm">{label}</div>
//       <div className="text-xl font-bold">{value}</div>
//     </div>
//   );
// };


export default InfoCards;