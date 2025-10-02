import React, { useEffect, useState } from "react";

const ViewProgress = () => {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Fetch from backend data.json
  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const res = await fetch("http://localhost:5000/data");
        const json = await res.json();
        setData(json);
        setDataLoading(false);
      } catch (err) {
        setDataLoading(false);
        console.error("Error fetching data:", err);
      }
    };
    if(data.length === 0){
      fetchData();
    }
  }, []);


  if (dataLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }
  else {
    if (data.length === 0) {
      return <div className="p-4 text-center">No Data</div>;
    }
  }

  // Use the "names" array from the first object as column headers
  const headers = data[0].names;

  return (
    <div className="w-full p-4 overflow-auto bg-neutral-50 rounded shadow">
      <table className="min-w-full border border-gray-300 text-center text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-1 border">Sr No</th>
            {headers.map((head, i) => (
              <th key={i} className="px-2 py-1 border whitespace-nowrap">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id} className="hover:bg-gray-100">
              <td className="px-2 py-1 border">{i + 1}</td>
              {headers.map((head, j) => (
                <td
                  key={j}
                  className={`px-2 py-1 border whitespace-nowrap`}
                >
                  {row[head]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default ViewProgress;