import React, { useEffect, useState } from 'react';
import ApiCall from '../../Apicall/ApiCall';

const Testing = () => {
  const [poBalanceQuantity, setPoBalanceQuantity] = useState(null);
  const [loading2, setLoading2] = useState(false);

  // For example purpose, hardcoding these:
  const selectedPurchaseOrder = 3020; // or get from props/state
  const [selectedProductVariantId, setSelectedProductVariantId] = useState(123); // example initial value

  const fetchPoBalanceQuantity = async () => {
    setLoading2(true);
    try {
      const response = await ApiCall({
        url: `http://localhost:5022/api/v1/PurchseOrderDetails/GetPoBalanceQuantityAndPoQuantity?purchaseOrderMainId=${selectedPurchaseOrder}&productVariantMainId=${selectedProductVariantId}`,
        method: "GET",
      });

      if (response?.data && response.data.length > 0) {
        const data = response.data[0];
        setPoBalanceQuantity(Number(data.poBalanceQuantity));
        console.log("API Response:", response.data);
      } else {
        throw new Error("Failed to fetch PO balance quantity.");
      }
    } catch (error) {
      console.error("Error fetching PO balance quantity:", error);
      setPoBalanceQuantity(null);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    if (selectedProductVariantId) {
      fetchPoBalanceQuantity();
    }
  }, [selectedProductVariantId]);

  return (
    <div className="container mt-4">
      <h2>PO Balance Quantity</h2>
      {loading2 ? (
        <p>Loading...</p>
      ) : poBalanceQuantity !== null ? (
        <p>{poBalanceQuantity}</p>
      ) : (
        <p>No PO balance quantity data available.</p>
      )}

      {/* For testing, a simple input to change selectedProductVariantId */}
      <div className="mt-3">
        <label>
          Select Product Variant ID:{" "}
          <input
            type="number"
            value={selectedProductVariantId}
            onChange={(e) => setSelectedProductVariantId(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
};

export default Testing;
