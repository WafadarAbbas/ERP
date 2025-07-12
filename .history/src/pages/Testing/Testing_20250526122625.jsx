import React, { useEffect, useState } from 'react';
import ApiCall from '../../Apicall/ApiCall';

const Testing = () => {
  const [poBalanceQuantity, setPoBalanceQuantity] = useState(null);
  const [loading2, setLoading2] = useState(false);

  const selectedPurchaseOrder = 3020;
  const selectedProductVariantId = 17;

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
    fetchPoBalanceQuantity();
  }, []);

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
    </div>
  );
};

export default Testing;
