import React, { useRef, useState, useEffect } from 'react';
import { FaFilter, FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Buton from '../../../Compo/Buton';
import CreateGrade from './CreateGrade';
import ApiCall from '../../../Apicall/ApiCall';
import EditGrade from './EditGrade';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';

function Grade() {
  const createRef = useRef(null);
  const refClose = useRef(null);
  const createEditRef = useRef(null);
  const refEditClose = useRef(null);

  const [Grades, setGrades] = useState([]); // Renamed for clarity
  const [sortColumn, setSortColumn] = useState('productGradeName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);  
  const [selectedGradeId, setSelectedGradeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Added state for search query
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(Grades.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Updated to include the search query as a parameter
  const fetchGrades = async (query = '') => {
    try {
      const url = query
        ? `http://localhost:5022/api/v1/ProductGrade/GetProductGradeByName?name=${query}&organizationId=1&companyId=1`
        : 'http://localhost:5022/api/v1/ProductGrade/GetAllAppModal/list?organizationId=1&companyId=1';

      const response = await ApiCall({
        url,
        method: 'GET',
      });

      if (response && response.data) {
        setGrades(response.data);
      } else {
        throw new Error('Failed to load Grades.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data');
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetch = () => {
    fetchGrades(searchQuery); // Re-fetch data when the search query changes
  };

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleDelete = async (GradeId) => {
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
          url: `http://localhost:5022/api/v1/ProductGrade/DeleteProductGrade/${GradeId}?organizationId=1&companyId=1`,
          method: 'DELETE',
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire('Deleted', 'The Grade has been deleted.', 'success');
          setGrades(Grades.filter(Grade => Grade.id !== GradeId));
        } else {
          Swal.fire('Error', 'Failed to delete Grade', 'error');
        }
      } catch (error) {
        console.error('Error during delete:', error);
        Swal.fire('Error', 'An error occurred while deleting the Grade', 'error');
      }
    }
  };

  const handleEdit = (GradeId) => {
    setSelectedGradeId(GradeId);
    createEditRef.current.click();  
  };

  const sortedGrades = [...Grades].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const paginatedGrades = sortedGrades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchGrades(query); // Fetch grades with search query
  };

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Grade List</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Grades</h5>
        </div>
        <div className='col-sm-5' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <i className="fa fa-print text-primary fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Print button clicked!')} ></i>
          <i className="fa-solid fa-file-pdf text-danger fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer " onClick={() => alert('PDF button clicked!')} ></i>
          <i className="fa fa-file-excel-o fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Excel button clicked!')} style={{ Grade: 'green' }}></i>
          <Buton onClick={() => createRef.current.click()}>Add Grade</Buton>
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
                      Grade Name
                      <button onClick={() => handleSort('productGradeName')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'productGradeName' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 ,textAlign:'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedGrades.map((Grade) => (
                  <tr key={Grade.id}>
                    <td style={{ fontSize: 16 }}>{Grade.productGradeName}</td>
                    <td style={{ fontSize: 16, textAlign: 'center' }}>
                      <div className="d-flex gap-2 justify-content-center">
                        <button className="btn" onClick={() => handleDelete(Grade.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <FaTrash size={16} title="Delete" color='red' />
                        </button>
                        <button className="btn" onClick={() => handleEdit(Grade.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
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
      <CreateGrade open={createRef} close={refClose} onclick={fetch} />
      <EditGrade open={createEditRef} close={refEditClose} selectedGradeId={selectedGradeId} onclick={fetch} />
    </div>
  );
}

export default Grade;
