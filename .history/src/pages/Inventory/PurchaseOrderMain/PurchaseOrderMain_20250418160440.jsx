
import React, { useRef, useState, useEffect } from 'react';
import { FaFilter, FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaSync, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Buton from '../../../Compo/Buton';
import CreatePurchaseOrderMain from './CreatePurchaseOrderMain';
import ApiCall from '../../../Apicall/ApiCall';
import EditPurchaseOrderMain from './EditPurchaseOrderMain';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';

function PurchaseOrderMain() {
   const navigate = useNavigate(); 
 
 
  const [PurchaseOrderMain, setPurchaseOrderMain] = useState([]);
  const [sortColumn, setSortColumn] = useState('poNumber');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);
  const [selectedPurchaseOrderMainId, setSelectedPurchaseOrderMainId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 8;
  const [isCancelFilter, setIsCancelFilter] = useState(null);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  
const toggleFilterOptions = () => {
  setShowFilterOptions(!showFilterOptions);
}; 

const handleRadioChange = (event) => {
  const value = event.target.value === "all" ? null : event.target.value === "true";
  setIsCancelFilter(value);
  fetchPurchaseOrderMain(searchQuery, value);
};
  const handleIdReset = () => {
    setSelectedPurchaseOrderMainId(0);
  };

   
  const fetchPurchaseOrderMain = async (query = '', isCancel = null) => {
    try {
      let url = `http://localhost:5022/api/v1/PurchaseOrderMain/GetAllPurchaseOrderMain?organizationId=1&companyId=1`;
  
      if (query) {
        url = `http://localhost:5022/api/v1/PurchaseOrderMain/GetByName?name=${query}&organizationId=1&companyId=1`;
      }
  
      if (isCancel !== null) {
        url = `http://localhost:5022/api/v1/PurchaseOrderMain/SearchByIsCancel?isCancel=${isCancel}&organizationId=1&companyId=1`;
      }
      const response = await ApiCall({
        url: url,
        method: 'GET',
      });

      if (response && response.data) {
        setPurchaseOrderMain(response.data);
      } else {
        throw new Error('Failed to load Purchase Order Main.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data');
    }
  };

  useEffect(() => {
    fetchPurchaseOrderMain();
  }, []);

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleDelete = async (PurchaseOrderMainId) => {
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
          url: `http://localhost:5022/api/v1/PurchaseOrderMain/DeletePurchaseOrderMain/${PurchaseOrderMainId}?organizationId=1&companyId=1`,
          method: 'DELETE',
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire('Deleted', 'The Purchase Order Main has been deleted.', 'success');
          setPurchaseOrderMain(PurchaseOrderMain.filter(PurchaseOrderMain => PurchaseOrderMain.id !== PurchaseOrderMainId));
        } else {
          Swal.fire('Error', 'Failed to delete Purchase Order Main', 'error');
        }
      } catch (error) {
        console.error('Error during delete:', error);
        Swal.fire('Error', 'An error occurred while deleting the Purchase Order Main', 'error');
      }
    }
  };

 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchPurchaseOrderMain(query);
  };

  const sortedPackage = [...PurchaseOrderMain].sort((a, b) => {
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

  const handleEdit = (POMain) => {
    navigate(`/PurchaseOrderMain/EditPurchaseOrderMain`, { state: { id: POMain } });
  };
  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Purchase Order Main List</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Purchase Order Main</h5>
        </div>
        <div className='col-sm-5' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <i className="fa fa-print text-primary fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Print button clicked!')} ></i>
          <i className="fa-solid fa-file-pdf text-danger fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer " onClick={() => alert('PDF button clicked!')} ></i>
          <i className="fa fa-file-excel-o fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Excel button clicked!')} style={{ color: 'green' }}></i>
          <Buton  onClick={() => navigate("/PurchaseOrderMain/CreatePurchaseOrderMain")}>Add PO Main</Buton>
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
        {showFilterOptions && (
        <div className="d-flex align-items-center gap-3 mt-3">

  <label className="form-check-label">
    <input
      type="radio"
      name="isCancelFilter"
      value="true"
      checked={isCancelFilter === true}
      onChange={handleRadioChange}
      className="form-check-input"
    />
    Canceled
  </label>
  <label className="form-check-label">
    <input
      type="radio"
      name="isCancelFilter"
      value="false"
      checked={isCancelFilter === false}
      onChange={handleRadioChange}
      className="form-check-input"
    />
    Not Canceled
  </label>
</div>
)}
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
                    cashierName
                      <button onClick={() => handleSort('cashierName')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'cashierName' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>

                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      Purchase Order Main
                      <button onClick={() => handleSort('poNumber')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'poNumber' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      Po Date
                      <button onClick={() => handleSort('poDate')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'poDate' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      isCancel
                      <button onClick={() => handleSort('isCancel')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'isCancel' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>

                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      Supplier Name
                      <button onClick={() => handleSort('supplierSupplerName')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'supplierSupplerName' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16, textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPackage.map((PurchaseOrderMain) => (
                  <tr key={PurchaseOrderMain.id}>
                    <td style={{ fontSize: 16 }}>{PurchaseOrderMain.cashierName}</td>
                    <td style={{ fontSize: 16 }}>{PurchaseOrderMain.poNumber}</td>
                    <td style={{ fontSize: 16 }}>{PurchaseOrderMain.poDate}</td>
                    <td style={{ fontSize: 16 }}>{PurchaseOrderMain.isCancel ? (<FaCheckCircle style={{ color: 'green' }} />
                    ) : (<FaTimesCircle style={{ color: 'red' }} />)}
                    </td>
                    <td style={{ fontSize: 16 }}>{PurchaseOrderMain.supplierSupplerName}</td>

                    <td style={{ fontSize: 16, textAlign: 'center' }}>
                      <div className="d-flex gap-2 justify-content-center">
                        <button className="btn" onClick={() => handleDelete(PurchaseOrderMain.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <FaTrash size={16} title="Delete" color='red' />
                        </button>
                        <button className="btn" onClick={() => handleEdit(PurchaseOrderMain.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
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

export default PurchaseOrderMain;

