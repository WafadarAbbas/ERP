import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Testing2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5022/api/v1/ProductCategory/GetAllAppModal/list?organizationId=1&companyId=1');
        setData(response.data);
      } catch (error) {
         
        if (error.response) {
          
          setError(`Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
        
          setError('Error: No response received from the server.');
        } else {
        
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>; // Display the error message

  return (
    <div>
      <h1>Product Categories</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.productCategoryName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Testing2;