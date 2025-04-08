

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../../Compo/Footer';
import Buton from '../../../Compo/Buton';

function EditGRNMain() {
  const navigate = useNavigate();

   
  const [grnDetails, setGrnDetails] = useState([
    { id: 1, itemCode: 'ITM001', itemName: 'Product A' },
    { id: 2, itemCode: 'ITM002', itemName: 'Product B' },
    { id: 3, itemCode: 'ITM003', itemName: 'Product C' },
  ]);

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row mb-3'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Edit GRNMain</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your GRNMain Updation</h5>
        </div>
        <div className='col-sm-4' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => navigate("/GRNMain/GRNMain")}>Move to GRN Main</Buton>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', padding: 10, border: "1px solid #d6d4d4" }}>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Item Code</th>
              <th>Item Name</th>
            </tr>
          </thead>
          <tbody>
            {grnDetails.map((detail, index) => (
              <tr key={index}>
                <td>{detail.id}</td>
                <td>{detail.itemCode}</td>
                <td>{detail.itemName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}

export default EditGRNMain;