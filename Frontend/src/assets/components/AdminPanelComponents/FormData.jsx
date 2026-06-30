import React, { useState } from "react";
import { X } from "lucide-react";

const FormData = ({ onClose }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    images: [""],
    oldPrice: "",
    color: "",
    bg: "",
    discount: "",
    rating: 0,
    sizes: [{ size: "", stock: 0 }],
    category: "",
    stock: "",
    status: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const images = [...product.images];
    images[index] = value;
    setProduct({ ...product, images });
  };

  const addImageField = () =>
    setProduct({ ...product, images: [...product.images, ""] });

  const handleSizeChange = (index, field, value) => {
    const sizes = [...product.sizes];
    sizes[index][field] = value;
    setProduct({ ...product, sizes });
  };

  const addSizeField = () =>
    setProduct({
      ...product,
      sizes: [...product.sizes, { size: "", stock: 0 }],
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/admin/addproducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          price: Number(product.price),
          stock: Number(product.stock),
          oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
        }),
      });

      if (res.ok) {
        alert("Product added successfully!");
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white transition";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 relative border border-gray-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            className={inputClass}
          />

          {/* Price + Old Price */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="price"
              type="number"
              placeholder="Price"
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="oldPrice"
              type="number"
              placeholder="Old Price"
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Stock + Status */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="stock"
              type="number"
              placeholder="Stock (e.g. 50)"
              onChange={handleChange}
              className={inputClass}
            />
            <select
              name="status"
              onChange={handleChange}
              defaultValue="active"
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className={`${inputClass} h-24`}
          />

          {/* Category */}
          <input
            name="category"
            placeholder="Category (e.g. women, men)"
            onChange={handleChange}
            className={inputClass}
          />

          {/* Discount */}
          <input
            name="discount"
            placeholder="Discount (e.g. 20%)"
            onChange={handleChange}
            className={inputClass}
          />

          {/* Images */}
          <div>
            <p className="font-medium mb-2 text-gray-700">Images</p>
            {product.images.map((img, i) => (
              <div key={i} className="mb-4 space-y-2">

                {/* Preview */}
                {img && (
                  <img
                    src={img}
                    alt={`preview-${i}`}
                    className="w-20 h-20 object-cover rounded-xl border border-gray-200"
                  />
                )}

                {/* URL input */}
                <input
                  type="text"
                  placeholder="Image URL (https://...)"
                  value={img}
                  onChange={(e) => handleImageChange(i, e.target.value)}
                  className={inputClass}
                />

                {/* File input */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Ya file choose karo:</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const url = URL.createObjectURL(file);
                      handleImageChange(i, url);
                    }}
                    className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-600 hover:file:bg-gray-200 file:cursor-pointer"
                  />
                </div>

                <hr className="border-gray-100" />
              </div>
            ))}

            <button
              type="button"
              onClick={addImageField}
              className="text-sm text-gray-500 hover:text-gray-800 hover:underline"
            >
              + Add Image
            </button>
          </div>

          {/* Sizes & Stock */}
          <div>
            <p className="font-medium mb-2 text-gray-700">Sizes & Stock</p>
            {product.sizes.map((s, i) => (
              <div key={i} className="grid grid-cols-2 gap-3 mb-2">
                <input
                  placeholder="Size (e.g. 40, L, XL)"
                  onChange={(e) => handleSizeChange(i, "size", e.target.value)}
                  className={inputClass}
                />
                <input
                  type="number"
                  placeholder="Stock"
                  onChange={(e) => handleSizeChange(i, "stock", e.target.value)}
                  className={inputClass}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addSizeField}
              className="text-sm text-gray-500 hover:text-gray-800 hover:underline"
            >
              + Add Size Variant
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Save Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default FormData;