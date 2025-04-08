
import React, { useRef, useState, useEffect } from 'react';
import { FaFilter, FaEdit, FaTrash, FaArrowUp, FaArrowDown, FaSync, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Buton from '../../../Compo/Buton';
import CreatePurchaseReturnMain from './CreatePurchaseReturnMain';
import ApiCall from '../../../Apicall/ApiCall';
import EditPurchaseReturnMain from './EditPurchaseReturnMain';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
import { useNavigate } from 'react-router-dom';
 

function PurchaseReturnMain() {
   const navigate = useNavigate(); 
 

  const [PurchaseReturnMain, setPurchaseReturnMain] = useState([]);
  const [sortColumn, setSortColumn] = useState('purchaseReturnMainInvoiceNo');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);
  const [selectedPurchaseReturnMainId, setSelectedPurchaseReturnMainId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 6;
  const [fillerStatusFilter, setfillerStatusFilter] = useState(true);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  
const toggleFilterOptions = () => {
  setShowFilterOptions(!showFilterOptions);
}; 

const handleRadioChange = (event) => {
  const value = event.target.value === "all" ? null : event.target.value === "true";
  setfillerStatusFilter(value);
  fetchPurchaseReturnMain(searchQuery, value);
};
  const handleIdReset = () => {
    setSelectedPurchaseReturnMainId(0);
  };

   
  const fetchPurchaseReturnMain = async () => {
    try {
      let url = `http://localhost:5022/api/v1/PurchaseReturnMain/GetAllPurchaseReturnMain?organizationId=1&companyId=1`;
    
      const response = await ApiCall({
        url: url,
        method: 'GET',
      });

      if (response && response.data) {
        setPurchaseReturnMain(response.data);
      } else {
        throw new Error('Failed to load Purchase Main.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data');
    }
  };

  useEffect(() => {
    fetchPurchaseReturnMain();
  }, []);

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleDelete = async (PurchaseReturnMainId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You first need to delete the associated Purchase Detail before deleting the Purchase Main.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK'
    });
  
    if (result.isConfirmed) {
      try {
        const response = await ApiCall({
          url: `http://localhost:5022/api/v1/PurchaseReturnMain/DeletePurchaseReturnMain/${PurchaseReturnMainId}?organizationId=1&companyId=1`,
          method: 'DELETE',
        });
  
        if (response?.status === 200 || response?.status === 204) {
          Swal.fire('Deleted', 'The Purchase Main has been deleted.', 'success');
          setPurchaseReturnMain(PurchaseReturnMain.filter(PurchaseReturnMain => PurchaseReturnMain.id !== PurchaseReturnMainId));
        } else {
          Swal.fire('Error', 'Failed to delete Purchase Main', 'error');
        }
      } catch (error) {
        console.error('Error during delete:', error);
        Swal.fire('Error', 'An error occurred while deleting the Purchase Main', 'error');
      }
    }
  };
  

 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchPurchaseReturnMain(query);
  };

  const sortedPackage = [...PurchaseReturnMain].sort((a, b) => {
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

  const handleEdit = (  PurchaseReturnMainId) => {
    navigate(`/PurchaseReturnMain/EditPurchaseReturnMain`, { state: { id:   PurchaseReturnMainId } });
  };
  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>Purchase Main List</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Purchase Main</h5>
        </div>
        <div className='col-sm-5' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <i className="fa fa-print text-primary fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Print button clicked!')} ></i>
          <i className="fa-solid fa-file-pdf text-danger fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer " onClick={() => alert('PDF button clicked!')} ></i>
          <i className="fa fa-file-excel-o fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Excel button clicked!')} style={{ color: 'green' }}></i>
          <Buton  onClick={() => navigate("/PurchaseReturnMain/CreatePurchaseReturnMain")}>Add Purchase Main</Buton>
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
                  Main Invoice No
                      <button onClick={() => handleSort('purchaseReturnMainInvoiceNo')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'purchaseReturnMainInvoiceNo' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>

                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Main Doc No
                      <button onClick={() => handleSort('purchaseReturnMainDocNo')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'purchaseReturnMainDocNo' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
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

                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    grnInvoiceNo
                      <button onClick={() => handleSort('grnInvoiceNo')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'grnInvoiceNo' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  
                  <th scope="col" style={{ fontSize: 16, textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPackage.map((PurchaseReturnMain) => (
                  <tr key={PurchaseReturnMain.id}>
                    <td style={{ fontSize: 16 }}>{PurchaseReturnMain.purchaseReturnMainInvoiceNo}</td>
                    <td style={{ fontSize: 16 }}>{PurchaseReturnMain.purchaseReturnMainDocNo}</td>
                    <td style={{ fontSize: 16 }}>{PurchaseReturnMain.fillerStatus ? (<FaCheckCircle style={{ color: 'green' }} />
                    ) : (<FaTimesCircle style={{ color: 'red' }} />)}
                    </td>
                    <td style={{ fontSize: 16 }}>{PurchaseReturnMain.suppliersSupplerName}</td>
                    <td style={{ fontSize: 16 }}>{PurchaseReturnMain.grnInvoiceNo}</td>
                    <td style={{ fontSize: 16, textAlign: 'center' }}>
                      <div className="d-flex gap-2 justify-content-center">
                        <button className="btn" onClick={() => handleDelete(PurchaseReturnMain.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <FaTrash size={16} title="Delete" color='red' />
                        </button>
                        <button className="btn" onClick={() => handleEdit(PurchaseReturnMain.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
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

export default PurchaseReturnMain;

