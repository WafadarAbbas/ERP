import React from 'react';
import Buton from '../../../Compo/Buton';
import { FaFilter } from 'react-icons/fa';
import './css/IconStyles.css';

function Product() {

  const handleClick = () => {
    alert('Button clicked!');
  };


  const products = [
    { name: 'RunMen', category: 'Shoes', brand: 'Nike', price: '$500', image: 'https://speedsports.pk/cdn/shop/products/aurora_fd2291-403_phslh000-2000.jpg?v=1710212570' },
    { name: 'Sofa', category: 'Furniture', brand: 'Ikea', price: '$300', image: 'https://poshish.pk/cdn/shop/files/w-POS00447-1_1800x1800.webp?v=1722932843' },
    { name: 'T-Shirt', category: 'Clothing', brand: 'Zara', price: '$50', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhoMkC2n3HiIU4zIxda5HE4aTCenO43y7myA&s' },
    { name: 'Apple', category: 'Groceries', brand: 'Whole Foods', price: '$20', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTqBOfkJOBqR4ISvqOQBR8zG1NBlJfSKIWuw&s' },
    { name: 'Dining Table', category: 'Furniture', brand: 'Ikea', price: '$300', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_XNEyjBf18m0w1SeKykp2MpkSAUB1swvk0Q&s' },
    { name: 'Jacket', category: 'Clothing', brand: 'Zara', price: '$50', image: 'https://cdni.llbean.net/is/image/wim/520163_699_82?hei=1095&wid=950&resMode=sharp2&defaultImage=llbprod/520163_699_41' },

  ];

  return (
    <div style={{ marginTop: 10 }}>
      <div className='d-flex justify-content-between row'>
        <div className='d-flex flex-column  col-sm-7' >
          <h3 style={{ color: '#092c4c' }}>Product List</h3>
          <h5 style={{ fontWeight: 400, color: '#092c4c' }}>Product List</h5>
        </div>
        <div className='col-sm-5' style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <i class="fa fa-print icons" onClick={handleClick} style={{ color: 'blue' }}></i>
          <i class="fa-solid fa-file-pdf icons " onClick={handleClick} style={{ color: 'red' }}></i>
          <i class="fa fa-file-excel-o icons" onClick={handleClick} style={{ color: 'green' }}></i>
          <Buton onClick={handleClick}>Add new Product</Buton>
          <Buton onClick={handleClick}>Import Product</Buton>
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
              <tr>
                <th scope="col" style={{ fontSize: 16 }}>Product</th>
                <th scope="col" style={{ fontSize: 16 }}>Category</th>
                <th scope="col" style={{ fontSize: 16 }}>Brand</th>
                <th scope="col" style={{ fontSize: 16 }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td style={{ fontSize: 16 }}>
                    <div className="d-flex align-items-center">
                      <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                      {product.name}
                    </div>
                  </td>
                  <td style={{ fontSize: 16 }}>{product.category}</td>
                  <td style={{ fontSize: 16 }}>{product.brand}</td>
                  <td style={{ fontSize: 16 }}>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Product;
