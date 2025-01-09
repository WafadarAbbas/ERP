
import React, { useRef, useState, useEffect } from 'react';
import { FaFilter, FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaSync, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Buton from '../../../Compo/Buton';
import CreateGRNMain from './CreateGRNMain';
import ApiCall from '../../../Apicall/ApiCall';
import EditGRNMain from './EditGRNMain';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
 

function GRNMain() {
   const navigate = useNavigate(); 
 

  const [GRNMain, setGRNMain] = useState([]);
  const [sortColumn, setSortColumn] = useState('grnInvoiceNo');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);
  const [selectedGRNMainId, setSelectedGRNMainId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 6;
  const [fillerStatusFilter, setfillerStatusFilter] = useState(null);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  
const toggleFilterOptions = () => {
  setShowFilterOptions(!showFilterOptions);
}; 

const handleRadioChange = (event) => {
  const value = event.target.value === "all" ? null : event.target.value === "true";
  setfillerStatusFilter(value);
  fetchGRNMain(searchQuery, value);
};
  const handleIdReset = () => {
    setSelectedGRNMainId(0);
  };

   
  const fetchGRNMain = async (query = '' ) => {
    try {
      let url = `http://localhost:5022/api/v1/GRNMain/GetAllGRNMain?organizationId=1&companyId=1`;
      
      const response = await ApiCall({
        url: url,
        method: 'GET',
      });

      if (response && response.data) {
        setGRNMain(response.data);
      } else {
        throw new Error('Failed to load GRN Main.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data');
    }
  };

  useEffect(() => {
    fetchGRNMain();
  }, []);

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleDelete = async (GRNMainId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });
    console.log(GRNMainId);
    

    if (result.isConfirmed) {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/GRNMain/DeleteGRNMain/${GRNMainId}?organizationId=1&companyId=1`,
          method: 'DELETE',
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire('Deleted', 'The GRN Main has been deleted.', 'success');
          setGRNMain(GRNMain.filter(GRNMain => GRNMain.id !== GRNMainId));
        } else {
          Swal.fire('Error', 'Failed to delete GRN Main', 'error');
        }
      } catch (error) {
        console.error('Error during delete:', error);
        Swal.fire('Error', 'An error occurred while deleting the GRN Main', 'error');
      }
    }
  };

 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchGRNMain(query);
  };

  const sortedPackage = [...GRNMain].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedPackage.length / itemsPerPage);
  const paginatedPackage = sortedPackage.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleEdit = (  GRNMainId) => {
    navigate(`/GRNMain/EditGRNMain`, { state: { id:   GRNMainId } });
  };
  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>GRN Main List</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your GRN Main</h5>
        </div>
        <div className='col-sm-5' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <i className="fa fa-print text-primary fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Print button clicked!')} ></i>
          <i className="fa-solid fa-file-pdf text-danger fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer " onClick={() => alert('PDF button clicked!')} ></i>
          <i className="fa fa-file-excel-o fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Excel button clicked!')} style={{ color: 'green' }}></i>
          <Buton  onClick={() => navigate("/GRNMain/CreateGRNMain")}>Add GRN Main</Buton>
        </div>
      </div>

      <div className="p-4 mt-4" style={{ backgroundColor: 'white', borderRadius: 5, border: '1px solid #d9d9d9' }}>
        <div className="d-flex justify-content-between align-items-center">
          <input
            Package="text"
            placeholder="Search..."
            className="form-control"
            style={{ maxWidth: '300px' }}
            value={searchQuery}
            disabled
            onChange={handleSearch}
          />
          <div className="d-flex justify-content-between align-items-center ">
            <button onClick={handleRefresh} className="btn me-2" style={{ backgroundColor: '#ff9f43', color: 'white', padding: '8px 10px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center' }}>
              <FaSync size={16} />
            </button>
            <button className="btn" onClick={toggleFilterOptions} style={{ backgroundColor: '#ff9f43', color: 'white', padding: '8px 10px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center' }}>
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
                    grnInvoiceNo
                      <button onClick={() => handleSort('grnInvoiceNo')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'grnInvoiceNo' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>

                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Tax Amount
                      <button onClick={() => handleSort('taxAmount')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'taxAmount' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                     GRN Value
                      <button onClick={() => handleSort('totalGRNValue')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'totalGRNValue' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      fillerStatus
                      <button onClick={() => handleSort('fillerStatus')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'fillerStatus' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>

                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      Supplier Name
                      <button onClick={() => handleSort('suppliersSupplerName')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'suppliersSupplerName' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16, textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPackage.map((GRNMain) => (
                  <tr key={GRNMain.id}>
                    <td style={{ fontSize: 16 }}>{GRNMain.grnInvoiceNo}</td>
                    <td style={{ fontSize: 16 }}>{GRNMain.taxAmount}</td>
                    <td style={{ fontSize: 16 }}>{GRNMain.totalGRNValue}</td>
                    <td style={{ fontSize: 16 }}>{GRNMain.fillerStatus ? (<FaCheckCircle style={{ color: 'green' }} />
                    ) : (<FaTimesCircle style={{ color: 'red' }} />)}
                    </td>
                    <td style={{ fontSize: 16 }}>{GRNMain.suppliersSupplerName}</td>

                    <td style={{ fontSize: 16, textAlign: 'center' }}>
                      <div className="d-flex gap-2 justify-content-center">
                        <button className="btn" onClick={() => handleDelete(GRNMain.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <FaTrash size={16} title="Delete" color='red' />
                        </button>
                        <button className="btn" onClick={() => handleEdit(GRNMain.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <FaEdit size={16} title="Edit" color='#ff9f43' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) }

        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn "
            style={{ backgroundColor: "#ff9f43", color: "white" }}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-3 align-self-center">Page {currentPage} of {totalPages}</span>
          <button
            className="btn "
            style={{ backgroundColor: "#ff9f43", color: "white" }}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
   </div>
  );
}

export default GRNMain;

