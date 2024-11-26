
import React, { useRef, useState, useEffect } from 'react';
import { FaFilter, FaEdit, FaTrash, FaArrowUp, FaArrowDown,FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Buton from '../../../Compo/Buton';
import CreateProductPrice from './CreateProductPrice';
import ApiCall from '../../../Apicall/ApiCall';
import EditProductPrice from './EditProductPrice';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';
 

function ProductPrice() {
  const createRef = useRef(null);
  const refClose = useRef(null);
  const createEditRef = useRef(null);
  const refEditClose = useRef(null);

  const [Price, setPrice] = useState([]);
  const [sortColumn, setSortColumn] = useState('productVariantMainsProductName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);
  const [selectedProductPriceId, setSelectedProductPriceId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 6;

  const fetchProductPrice = async (query = '') => {
    try {
      const url =`http://localhost:5022/api/v1/ProductPrice/GetAllAppModal/list?organizationId=1&companyId=1`;
      const response = await ApiCall({
        url: url,
        method: 'GET',
      });

      if (response && response.data) {
        setPrice(response.data);
      } else {
        throw new Error('Failed to load Price.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data');
    }
  };

  useEffect(() => {
    fetchProductPrice();
  }, []);

  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleDelete = async (ProductPriceId) => {
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
          url: `http://localhost:5022/api/v1/ProductPrice/DeleteProductPrice/${ProductPriceId}?organizationId=1&companyId=1`,
          method: 'DELETE',
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire('Deleted', 'The ProductPrice has been deleted.', 'success');
          setPrice(Price.filter(ProductPrice => ProductPrice.id !== ProductPriceId));
        } else {
          Swal.fire('Error', 'Failed to delete ProductPrice', 'error');
        }
      } catch (error) {
        console.error('Error during delete:', error);
        Swal.fire('Error', 'An error occurred while deleting the ProductPrice', 'error');
      }
    }
  };

  const handleEdit = (ProductPriceId) => {
    setSelectedProductPriceId(ProductPriceId);
    createEditRef.current.click();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchProductPrice(query);
  };

  const sortedPrice = [...Price].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedPrice.length / itemsPerPage);
  const paginatedPrice = sortedPrice.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row'>
        <div className='d-flex flex-column col-sm-7'>
          <h3>ProductPrice List</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Price</h5>
        </div>
        <div className='col-sm-5' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <i className="fa fa-print text-primary fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Print button clicked!')} ></i>
          <i className="fa-solid fa-file-pdf text-danger fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer " onClick={() => alert('PDF button clicked!')} ></i>
          <i className="fa fa-file-excel-o fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer" onClick={() => alert('Excel button clicked!')} style={{ color: 'green' }}></i>
          <Buton onClick={() => createRef.current.click()}>Add Price</Buton>
        </div>
      </div>

      <div className="p-4 mt-4" style={{ backgroundColor: 'white', borderRadius: 5, border: '1px solid #d9d9d9' }}>
        <div className="d-flex justify-content-between align-items-center">
          <input
            Price="text"
            placeholder="Search..."
            className="form-control"
            style={{ maxWidth: '300px' }}
            value={searchQuery}
            disabled
            onChange={handleSearch}
          />
          <button className="btn" style={{ backgroundColor: '#ff9f43', color: 'white', padding: '8px 10px', borderRadius: '8px', border: 'none', display: 'flex', alignItems: 'center' }}>
            <FaFilter Price={16} />
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
                    Product Name
                      <button onClick={() => handleSort('productVariantMainsProductName')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'productVariantMainsProductName' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Price
                      <button onClick={() => handleSort('price')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'price' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
          

                  <th scope="col" style={{ fontSize: 16 }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
    Current Price
    <button onClick={() => handleSort('isCurrentPrice')} className="btn p-0">
      {sortOrder === 'asc' && sortColumn === 'isCurrentPrice' ? (
        <FaArrowUp color="green" />
      ) : (
        <FaArrowDown color="red" />
      )}
    </button>
  </div>
</th>
              
               
                  
                  
                  <th scope="col" style={{ fontSize: 16, textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPrice.map((ProductPrice) => (
                  <tr key={ProductPrice.id}>
                    <td style={{ fontSize: 16 }}>{ProductPrice.productVariantMainsProductName}</td>
                    <td style={{ fontSize: 16 }}>{ProductPrice.price}</td>
                    <td style={{ fontSize: 16 }}>
  {ProductPrice.isCurrentPrice ? (
    <FaCheckCircle style={{ color: 'green' }} />
  ) : (
    <FaTimesCircle style={{ color: 'red' }} />
  )}
</td>
                    <td style={{ fontSize: 16, textAlign: 'center' }}>
                      <div className="d-flex gap-2 justify-content-center">
                        <button className="btn" onClick={() => handleDelete(ProductPrice.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <FaTrash size={16} title="Delete" color='red' />
                        </button>
                        <button className="btn" onClick={() => handleEdit(ProductPrice.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
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
      <Footer/>
      <CreateProductPrice open={createRef} close={refClose} onclick={fetchProductPrice} />
      <EditProductPrice open={createEditRef} close={refEditClose} selectedProductPriceId={selectedProductPriceId} onclick={fetchProductPrice} />
    </div>
  );
}

export default ProductPrice;
