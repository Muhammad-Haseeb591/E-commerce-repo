import React, { useState } from 'react';

const FormData = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    images: [''], // Array of strings
    oldPrice: '',
    color: '',
    bg: '',
    discount: '',
    rating: 0,
    sizes: [{ size: '', stock: 0 }], // Array of objects
    category: ''
  });

  // Handle simple text/number inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle Dynamic Image Array
  const handleImageChange = (index, value) => {
    const newImages = [...product.images];
    newImages[index] = value;
    setProduct({ ...product, images: newImages });
  };

  const addImageField = () => setProduct({ ...product, images: [...product.images, ''] });

  // Handle Dynamic Size Schema Array
  const handleSizeChange = (index, field, value) => {
    const newSizes = [...product.sizes];
    newSizes[index][field] = value;
    setProduct({ ...product, sizes: newSizes });
  };

  const addSizeField = () => setProduct({ ...product, sizes: [...product.sizes, { size: '', stock: 0 }] });

  const handleSubmit = async () => {
      try {
      const response = await fetch('http://localhost:3000/admin/addproducts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          price: Number(product.price),
          oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
        }),
      });

      if (response.ok) {
        alert("Product added successfully!");
      response.redirect("/admin/products")
      }
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px' }}>
        
        <input name="name" placeholder="Product Name*" onChange={handleChange} required style={inputStyle} />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <input name="price" type="number" placeholder="Price*" onChange={handleChange} required style={inputStyle} />
          <input name="oldPrice" type="number" placeholder="Old Price" onChange={handleChange} style={inputStyle} />
        </div>

        <textarea name="description" placeholder="Description" onChange={handleChange} style={inputStyle} />

        {/* Images Section */}
        <div>
          <label>Image URLs (Array):</label>
          {product.images.map((img, i) => (
            <input key={i} value={img} onChange={(e) => handleImageChange(i, e.target.value)} placeholder="URL" style={{...inputStyle, marginBottom: '5px'}} />
          ))}
          <button type="button" onClick={addImageField}>+ Add Image</button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input name="color" placeholder="Color" onChange={handleChange} style={inputStyle} />
          <input name="bg" placeholder="Background Color" onChange={handleChange} style={inputStyle} />
          <input name="discount" placeholder="Discount (e.g. 20%)" onChange={handleChange} style={inputStyle} />
        </div>

        {/* Sizes Section */}
        <div>
          <label>Sizes & Stock (Size Schema):</label>
          {product.sizes.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
              <input placeholder="Size" onChange={(e) => handleSizeChange(i, 'size', e.target.value)} style={inputStyle} />
              <input type="number" placeholder="Stock" onChange={(e) => handleSizeChange(i, 'stock', e.target.value)} style={inputStyle} />
            </div>
          ))}
          <button type="button" onClick={addSizeField}>+ Add Size Variant</button>
        </div>

        <input name="category" placeholder="Category" onChange={handleChange} style={inputStyle} />
        
        <button type="submit" style={submitBtn}>Save Product to Database</button>
      </form>
    </div>
  );
};

// Simple Styles
const inputStyle = { width: '100%', padding: '10px', boxSizing: 'border-box' };
const submitBtn = { padding: '15px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' };

export default FormData;


;
