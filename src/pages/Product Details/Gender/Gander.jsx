import React, { useRef, useState, useEffect } from 'react';
import { FaFilter, FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Buton from '../../../Compo/Buton';
import CreateGander from './CreateGander';
import ApiCall from '../../../Apicall/ApiCall';
import EditGander from './EditGander';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';

function Gander() {
  const createRef = useRef(null);
  const refClose = useRef(null);
  const createEditRef = useRef(null);
  const refEditClose = useRef(null);

  const [Ganders, setGanders] = useState([]); 
  const [sortColumn, setSortColumn] = useState('productGanderName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);  
  const [selectedGanderId, setSelectedGanderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Added state for search query
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(Ganders.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const fetchGanders = async (query = '') => {
    try {
      const url = query
        ? `http://localhost:5022/api/v1/ProductGander/GetProductGanderByName?name=${query}&organizationId=1&companyId=1`
        : 'http://localhost:5022/api/v1/ProductGander/GetAllAppModal/list?organizationId=1&companyId=1';

      const response = await ApiCall({
        url,
        method: 'GET',
      });

      if (response && response.data) {
        setGanders(response.data);
      } else {
        throw new Error('Failed to load Ganders.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data');
    }
  };

  useEffect(() => {
    fetchGanders();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchGanders(query);
  };

  const fetch = () => {
    fetchGanders(searchQuery); // Re-fetch data on update
  };

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleDelete = async (GanderId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/ProductGander/DeleteProductGander/${GanderId}?organizationId=1&companyId=1`,
          method: 'DELETE',
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire('Deleted', 'The Gander has been deleted.', 'success');
          setGanders(Ganders.filter(Gander => Gander.id !== GanderId));
        } else {
          Swal.fire('Error', 'Failed to delete Gander', 'error');
        }
      } catch (error) {
        console.error('Error during delete:', error);
        Swal.fire('Error', 'An error occurred while deleting the Gander', 'error');
      }
    }
  };

  const handleEdit = (GanderId) => {
    setSelectedGanderId(GanderId);
    createEditRef.current.click();  
  };

  const sortedGanders = [...Ganders].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const paginatedGanders = sortedGanders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Gander List</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Ganders</h5>
        </div>
        <div className='col-sm-5' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <i className="fa fa-print text-primary fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Print button clicked!')} ></i>
          <i className="fa-solid fa-file-pdf text-danger fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer " onClick={() => alert('PDF button clicked!')} ></i>
          <i className="fa fa-file-excel-o fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Excel button clicked!')} style={{ Gander: 'green' }}></i>
          <Buton onClick={() => createRef.current.click()}>Add Gander</Buton>
        </div>
      </div>

      <div className="p-4 mt-4" style={{ backgroundColor: 'white', borderRadius: 5, border: '1px solid #d9d9d9' }}>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            value={searchQuery}
            onChange={handleSearch}
            style={{ maxWidth: '300px' }}
          />
          <button className="btn" style={{ backgroundColor: '#ff9f43', color: 'white', padding: '8px 10px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center' }}>
            <FaFilter size={16} />
          </button>
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
                      Gander Name
                      <button onClick={() => handleSort('productGanderName')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'productGanderName' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 ,textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedGanders.map((Gander) => (
                  <tr key={Gander.id}>
                    <td style={{ fontSize: 16 }}>{Gander.productGanderName}</td>
                    <td style={{ fontSize: 16, textAlign: 'center' }}>
                      <div className="d-flex gap-2 justify-content-center">
                        <button className="btn" onClick={() => handleDelete(Gander.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <FaTrash size={16} title="Delete" color='red' />
                        </button>
                        <button className="btn" onClick={() => handleEdit(Gander.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
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
      <CreateGander open={createRef} close={refClose} onclick={fetch} />
      <EditGander open={createEditRef} close={refEditClose} selectedGanderId={selectedGanderId} onclick={fetch} />
    </div>
  );
}

export default Gander;
