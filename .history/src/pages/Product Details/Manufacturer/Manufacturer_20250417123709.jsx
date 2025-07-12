import React, { useRef, useState, useEffect } from 'react';
import { FaFilter, FaEdit, FaTrash, FaArrowUp, FaArrowDown,FaSync } from 'react-icons/fa';
import Buton from '../../../Compo/Buton';
import CreateManufacturer from './CreateManufacturer';
import ApiCall from '../../../Apicall/ApiCall';
import EditManufacturer from './EditManufacturer';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';

function Manufacturer() {
  const createRef = useRef(null);
  const refClose = useRef(null);
  const createEditRef = useRef(null);
  const refEditClose = useRef(null);

  const [manufacturers, setManufacturers] = useState([]);
  const [sortColumn, setSortColumn] = useState('manfacturerName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);
  const [selectedManufacturerId, setSelectedManufacturerId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(manufacturers.length / itemsPerPage);

  const handleIdReset = () => {
  setSelectedManufacturerId(null);
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const fetchManufacturers = async (query = '') => {
    try {
      const response = await ApiCall({
        url: query
          ? `http://localhost:5022/api/v1/ProductManufacturer/GetProductManufacturerByName?name=${query}&organizationId=1&companyId=1`
          : 'http://localhost:5022/api/v1/ProductManufacturer/GetAllAppModal/list?organizationId=1&companyId=1',
        method: 'GET',
      });

      if (response && response.data) {
        setManufacturers(response.data);
      } else {
        throw new Error('Failed to load manufacturers.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data');
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);
  const fetch = () => {
    fetc(searchQuery);  
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchManufacturers(query);
  };

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleDelete = async (manufacturerId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/ProductManufacturer/DeleteProductManufacturer/${manufacturerId}?organizationId=1&companyId=1`,
          method: 'DELETE',
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire('Deleted', 'The manufacturer has been deleted.', 'success');
          setManufacturers(manufacturers.filter((manufacturer) => manufacturer.id !== manufacturerId));
        } else {
          Swal.fire('Error', 'Failed to delete manufacturer', 'error');
        }
      } catch (error) {
        console.error('Error during delete:', error);
        Swal.fire('Error', 'An error occurred while deleting the manufacturer', 'error');
      }
    }
  };

  const handleEdit = (manufacturerId) => {
    setSelectedManufacturerId(manufacturerId);
    createEditRef.current.click();
  };

  const sortedManufacturers = [...manufacturers].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const paginatedManufacturers = sortedManufacturers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRefresh = () => {
    window.location.reload(); 
     
  };

  return (
    <div style={{ marginTop: 10 }}>
      <div className="d-flex justify-content-between row">
        <div className="d-flex flex-column col-sm-7">
          <h3>Manufacturer List</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Manufacturers</h5>
        </div>
        <div className="col-sm-5" style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Buton onClick={() => createRef.current.click()}>Add Manufacturer</Buton>
        </div>
      </div>

      <div className="p-4 mt-4" style={{ backgroundColor: 'white', borderRadius: 5, border: '1px solid #d9d9d9' }}>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            placeholder="Search by Name..."
            value={searchQuery}
            onChange={handleSearch}
            className="form-control"
            style={{ maxWidth: '300px' }}
          />
            <div className="d-flex justify-content-between align-items-center ">
            <button  onClick={handleRefresh} className="btn me-2" style={{ backgroundColor: '#ff9f43', color: 'white', padding: '8px 10px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center' }}>
            <FaSync  size={16} />
          </button>
          <button className="btn" style={{ backgroundColor: '#ff9f43', color: 'white', padding: '8px 10px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center' }}>
            <FaFilter size={16} />
          </button>
          </div>
        </div>
        <hr />

        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      Manufacturer 
                      <button onClick={() => handleSort('manfacturerName')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'manfacturerName' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Address
                      <button onClick={() => handleSort('manfacturerAddress')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'manfacturerAddress' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                     City
                      <button onClick={() => handleSort('manfacturerCity')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'manfacturerCity' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                     Country
                      <button onClick={() => handleSort('manfacturerCountry')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'manfacturerCountry' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Ntn-VatNo
                      <button onClick={() => handleSort('manfacturerNtnVatNo')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'manfacturerNtnVatNo' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 ,textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedManufacturers.map((Manufacturer) => (
                  <tr key={Manufacturer.id}>
                    <td style={{ fontSize: 16 }}>{Manufacturer.manfacturerName}</td>
                    <td style={{ fontSize: 16 }}>{Manufacturer.manfacturerAddress}</td>
                    <td style={{ fontSize: 16 }}>{Manufacturer.manfacturerCity}</td>
                    <td style={{ fontSize: 16 }}>{Manufacturer.manfacturerCountry}</td>
                    <td style={{ fontSize: 16 }}>{Manufacturer.manfacturerNtnVatNo}</td>
                    <td style={{ fontSize: 16, textAlign: 'center' }}>
                      <div className="d-flex gap-2 justify-content-center">
                        <button className="btn" onClick={() => handleDelete(Manufacturer.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <FaTrash size={16} title="Delete" color='red' />
                        </button>
                        <button className="btn" onClick={() => handleEdit(Manufacturer.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <FaEdit size={16} title="Edit" color='#ff9f43' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn"
            style={{ backgroundColor: "#ff9f43", color: "white" }}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-3 align-self-center">Page {currentPage} of {totalPages}</span>
          <button
            className="btn"
            style={{ backgroundColor: "#ff9f43", color: "white" }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer/>

      <CreateManufacturer open={createRef} close={refClose} onclick={fetch} />
      <EditManufacturer open={createEditRef} close={refEditClose} selectedManufacturerId={selectedManufacturerId} onclick={fetch}onIdReset={handleIdReset}  />
    </div>
  );
}

export default Manufacturer;
