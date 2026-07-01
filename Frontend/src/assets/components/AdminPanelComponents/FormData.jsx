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
    status: "active",
  });

  const [submitError, setSubmitError] = useState("");

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
    sizes[index] = { ...sizes[index], [field]: value };
    setProduct({ ...product, sizes });
  };

  const addSizeField = () =>
    setProduct({
      ...product,
      sizes: [...product.sizes, { size: "", stock: 0 }],
    });

  const removeSizeField = (index) => {
    const sizes = product.sizes.filter((_, i) => i !== index);
    setProduct({ ...product, sizes: sizes.length ? sizes : [{ size: "", stock: 0 }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Basic required-field check — same "empty string sent as required
    // field" problem can happen to name/price/category too, not just sizes.
    if (!product.name.trim() || !product.price || !product.category.trim()) {
      setSubmitError("Name, Price aur Category zaroori hain.");
      return;
    }

    // 🔧 THE ACTUAL FIX: drop any size row where "size" was left blank,
    // instead of sending { size: "", stock: 0 } straight to the schema.
    const cleanedSizes = product.sizes
      .filter((s) => s.size && s.size.toString().trim() !== "")
      .map((s) => ({
        size: s.size.toString().trim(),
        stock: Number(s.stock) || 0,
      }));

    const payload = {
      ...product,
      price: Number(product.price),
      oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
      images: product.images.filter((img) => img.trim() !== ""),
      // Only include sizes if the admin actually filled at least one in.
      // If your schema requires sizes to always be non-empty, remove this
      // conditional and instead block submit when cleanedSizes.length === 0.
      ...(cleanedSizes.length > 0 ? { sizes: cleanedSizes } : { sizes: [] }),
    };

    try {
      const res = await fetch("http://localhost:3000/admin/addproducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        alert("Product added successfully!");
        onClose();
      } else {
        setSubmitError(data?.message || "Product add nahi hua. Server error.");
      }
    } catch (err) {
      console.error(err);
      setSubmitError("Network error — server tak pohanch nahi payi request.");
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
            value={product.name}
            onChange={handleChange}
            className={inputClass}
          />

          {/* Price + Old Price */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              className={inputClass}
            />
            <input
              name="oldPrice"
              type="number"
              placeholder="Old Price"
              value={product.oldPrice}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Status */}
          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            className={`${inputClass} h-24`}
          />

          {/* Category */}
          <input
            name="category"
            placeholder="Category (e.g. women, men)"
            value={product.category}
            onChange={handleChange}
            className={inputClass}
          />

          {/* Discount */}
          <input
            name="discount"
            placeholder="Discount (e.g. 20%)"
            value={product.discount}
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
            <p className="font-medium mb-2 text-gray-700">
              Sizes & Stock <span className="text-xs text-gray-400 font-normal">(optional — chorr do agar product ke sizes nahi)</span>
            </p>
            {product.sizes.map((s, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-3 mb-2 items-center">
                <input
                  placeholder="Size (e.g. 40, L, XL)"
                  value={s.size}
                  onChange={(e) => handleSizeChange(i, "size", e.target.value)}
                  className={inputClass}
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={s.stock}
                  onChange={(e) => handleSizeChange(i, "stock", e.target.value)}
                  className={inputClass}
                />
                {product.sizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSizeField(i)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
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

          {/* Error */}
          {submitError && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {submitError}
            </p>
          )}

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