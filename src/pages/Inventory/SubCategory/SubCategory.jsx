import React, { useRef, useState, useEffect } from 'react';
import { FaFilter, FaEdit, FaTrash, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Buton from '../../../Compo/Buton';
import CreateSubCategory from './CreateSubCategory';
import ApiCall from '../../../Apicall/ApiCall';
import EditSubCategory from './EditSubCategory';
import Swal from 'sweetalert2';
import Footer from '../../../Compo/Footer';

function SubCategory() {
  const createRef = useRef(null);
  const refClose = useRef(null);
  const createEditRef = useRef(null);
  const refEditClose = useRef(null);

  const [categories, setCategories] = useState([]);
  const [sortColumn, setSortColumn] = useState('productSubCategoryName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


  const [searchTerm, setSearchTerm] = useState('');


  const handleIdReset = () => {
    setSelectedSubCategoryId(0);
  };
  

  const fetchSubCategory = async (query = '') => {
    try {
      const url = query
        ? `http://localhost:5022/api/v1/ProductSubCategory/GetProductSubCategoryByName?name=${query}&organizationId=1&companyId=1`
        : 'http://localhost:5022/api/v1/ProductSubCategory/GetAllAppModal/list?organizationId=1&companyId=1';

      const response = await ApiCall({
        url,
        method: 'GET',
      });

      if (response && response.data) {
        setCategories(response.data);
      } else {
        throw new Error('Failed to load subcategories.');
      }
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data');
    }
  };

  // Use effect hook to load subcategories initially
  useEffect(() => {
    fetchSubCategory();
  }, []);

  // Handle sorting of columns
  const handleSort = (column) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  // Handle delete action
  const handleDelete = async (SubCategoryId) => {
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
          url: `http://localhost:5022/api/v1/ProductSubCategory/DeleteProductSubCategory/${SubCategoryId}?organizationId=1&companyId=1`,
          method: 'DELETE',
        });

        if (response?.status === 200 || response?.status === 204) {
          Swal.fire('Deleted', 'The SubCategory has been deleted.', 'success');
          setCategories(categories.filter((SubCategory) => SubCategory.id !== SubCategoryId));
        } else {
          Swal.fire('Error', 'Failed to delete SubCategory', 'error');
        }
      } catch (error) {
        console.error('Error during delete:', error);
        Swal.fire('Error', 'An error occurred while deleting the SubCategory', 'error');
      }
    }
  };

  // Handle edit action
  const handleEdit = (SubCategoryId) => {
    setSelectedSubCategoryId(SubCategoryId);
    createEditRef.current.click();
  };

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    fetchSubCategory(query); // Fetch subcategories based on the search query
  };

  // Pagination handling
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Sort the categories based on the selected column and order
  const sortedCategories = [...categories].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);
  const paginatedCategories = sortedCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ marginTop: 10 }}>
      <div className="d-flex justify-content-between row">
        <div className="d-flex flex-column col-sm-7">
          <h3>SubCategory List</h3>
          <h5 style={{ fontWeight: 400 }}>Manage your Categories</h5>
        </div>
        <div
          className="col-sm-5"
          style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}
        >
          <i
            className="fa fa-print text-primary fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer"
            onClick={() => alert('Print button clicked!')}
          ></i>
          <i
            className="fa-solid fa-file-pdf text-danger fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer"
            onClick={() => alert('PDF button clicked!')}
          ></i>
          <i
            className="fa fa-file-excel-o fs-2 me-2 p-2 bg-white border border-grey rounded-3 cursor-pointer"
            onClick={() => alert('Excel button clicked!')}
            style={{ color: 'green' }}
          ></i>
          <Buton onClick={() => createRef.current.click()}>Add SubCategory</Buton>
        </div>
      </div>

      <div
        className="p-4 mt-4"
        style={{ backgroundColor: 'white', borderRadius: 5, border: '1px solid #d9d9d9' }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="form-control"
            style={{ maxWidth: '300px' }}
          />
          <button
            className="btn"
            style={{
              backgroundColor: '#ff9f43',
              color: 'white',
              padding: '8px 10px',
              borderRadius: '8px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
          >
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
                      SubCategory Name
                      <button onClick={() => handleSort('productSubCategoryName')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'productSubCategoryName' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    Category
                      <button onClick={() => handleSort('productCategoryProductCategoryName')} className="btn p-0">
                        {sortOrder === 'asc' && sortColumn === 'productCategoryProductCategoryName' ? <FaArrowUp color="green" /> : <FaArrowDown color="red" />}
                      </button>
                    </div>
                  </th>
                  <th scope="col" style={{ fontSize: 16, textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCategories.map((SubCategory) => (
                  <tr key={SubCategory.id}>
                    <td style={{ fontSize: 16 }}>{SubCategory.productSubCategoryName}</td>
                    <td style={{ fontSize: 16 }}>{SubCategory.productCategoryProductCategoryName}</td>
                    <td style={{ fontSize: 16, textAlign: 'center' }}>
                      <div className="d-flex gap-2 justify-content-center">
                        <button className="btn" onClick={() => handleDelete(SubCategory.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                          <FaTrash size={16} title="Delete" color='red' />
                        </button>
                        <button className="btn" onClick={() => handleEdit(SubCategory.id)} style={{ border: '1px solid #ddd', padding: '6px 8px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
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
      <CreateSubCategory open={createRef} close={refClose} onclick={fetchSubCategory} />
      <EditSubCategory open={createEditRef} close={refEditClose} selectedSubCategoryId={selectedSubCategoryId} onclick={fetchSubCategory} onIdReset={handleIdReset} />
    </div>
  );
}

export default SubCategory;

