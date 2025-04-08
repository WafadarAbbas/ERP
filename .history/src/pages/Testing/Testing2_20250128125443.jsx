import React, { useState } from "react";

const Testing2 = () => {
  const [purchseOrderDetails, setPurchseOrderDetails] = useState([
    {
      id: 1,
      poQuantity: 10,
      grnQuantity: 5,
      poBalanceQuantity: 5,
      grnBatchId: "Batch-001",
      grnStoreId: "Store-001",
    },
    {
      id: 2,
      poQuantity: 20,
      grnQuantity: 15,
      poBalanceQuantity: 5,
      grnBatchId: "Batch-002",
      grnStoreId: "Store-002",
    },
    {
      id: 3,
      poQuantity: 50,
      grnQuantity: 25,
      poBalanceQuantity: 25,
      grnBatchId: "Batch-003",
      grnStoreId: "Store-003",
    },
  ]);

  const handleSubmit = () => {
    console.log("Final Purchase Order Details Submitted:", purchseOrderDetails);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Purchase Order Details</h1>
      <table className="table-auto w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">PO Quantity</th>
            <th className="border border-gray-300 px-4 py-2">GRN Quantity</th>
            <th className="border border-gray-300 px-4 py-2">PO Balance Quantity</th>
            <th className="border border-gray-300 px-4 py-2">GRN Batch ID</th>
            <th className="border border-gray-300 px-4 py-2">GRN Store ID</th>
          </tr>
        </thead>
        <tbody>
          {purchseOrderDetails.map((detail) => (
            <tr key={detail.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{detail.id}</td>
              <td className="border border-gray-300 px-4 py-2">{detail.poQuantity}</td>
              <td className="border border-gray-300 px-4 py-2">{detail.grnQuantity}</td>
              <td className="border border-gray-300 px-4 py-2">
                {detail.poBalanceQuantity}
              </td>
              <td className="border border-gray-300 px-4 py-2">{detail.grnBatchId}</td>
              <td className="border border-gray-300 px-4 py-2">{detail.grnStoreId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Submit Data
      </button>
    </div>
  );
};

export default Testing2;
