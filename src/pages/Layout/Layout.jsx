import React from 'react';
import Buton from '../../../Compo/Buton';
import { FaFilter } from 'react-icons/fa';


function Layout() {

  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row'>
        <div className='d-flex flex-column  col-sm-7' >
          <h3 style={{ color: '#092c4c' }}>Layout List</h3>
          <h5 style={{ fontWeight: 400, color: '#092c4c' }}>Layout List</h5>
        </div>
        <div className='col-sm-5' style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <i class="fa fa-print" onClick={handleClick} style={{ color: 'blue', fontSize: 25, marginRight: 10 }}></i>
          <i class="fa-solid fa-file-pdf" onClick={handleClick} style={{ color: 'red', fontSize: 25, marginRight: 10 }}></i>
          <i class="fa fa-file-excel-o" onClick={handleClick} style={{ color: 'green', fontSize: 25, marginRight: 10 }}></i>
          <Buton onClick={handleClick}>Add new Layout</Buton>
          <Buton onClick={handleClick}>Import Layout</Buton>
        </div>

      </div>

      <div className="p-4 mt-4" style={{ backgroundColor: 'white', borderRadius: 5, border: '1px solid #d9d9d9' }}>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            style={{ maxWidth: '300px' }}
          />
          <button
            className="btn"
            style={{ backgroundColor: '#ff9f43', color: 'white', padding: '8px 10px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center' }}
          >
            <FaFilter size={16} />
          </button>
        </div>
        <hr />

        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-dark">
           
            </thead>
            <tbody>
           
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Layout;
