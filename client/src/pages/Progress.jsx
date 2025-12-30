// import { useEffect, useState } from "react";
// import api from "../services/api";

// export default function Progress() {
//   const [data, setData] = useState(null);

//   console.log("Progress Data:", data);
//   useEffect(() => {
//     api.get("/progress/user").then(res => setData(res.data));
//   }, []);

//   if (!data) return <p className="text-center">Loading...</p>;

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
//       <h2 className="text-xl font-bold mb-4 text-center">
//         Your Learning Progress
//       </h2>

//       <div className="w-full bg-gray-200 rounded-full h-4">
//         <div
//           className="bg-blue-600 h-4 rounded-full"
//           style={{ width: `${data.percentage}%` }}
//         />
//       </div>

//       <p className="text-center mt-4 font-semibold">
//         {data.percentage}% Completed
//       </p>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import api from "../services/api";

export default function Progress() {
  const [data, setData] = useState(null);

  console.log("Progress Data:", data);
  useEffect(() => {
    api.get("/progress/levels").then(res => setData(res.data));
  }, []);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  const ProgressBar = ({ label, value, color }) => (
    <div className="mb-5">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{label}</span>
        <span>{value}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`${color} h-4 rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6 text-center">
        📊 Learning Progress
      </h2>

      <ProgressBar
        label="Easy Level"
        value={data?.levels?.EASY}
        color="bg-green-500"
      />

      <ProgressBar
        label="Medium Level"
        value={data?.levels?.MEDIUM}
        color="bg-yellow-500"
      />

      <ProgressBar
        label="Hard Level"
        value={data?.levels?.HARD}
        color="bg-red-500"
      />

      <hr className="my-6" />

      <ProgressBar
        label="Overall Progress"
        value={data?.overall}
        color="bg-blue-600"
      />
    </div>
  );
}
