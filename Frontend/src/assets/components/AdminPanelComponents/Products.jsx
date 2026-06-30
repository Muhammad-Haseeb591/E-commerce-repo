import { useState, useEffect } from "react";
import { Plus, Search, Trash2, AlertCircle, PackageX, X, Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteProductAsync, editProductAsync } from "../redux_Toolkit/fetcherSlice";
import FormData from "./FormData";

// ── colSpan = 5 — headers ke barabar ────────────────────
const TableMessage = ({ children }) => (
  <tr>
    <td colSpan={5} className="py-16 text-center">{children}</td>
  </tr>
);

const LoadingRows = () => (
  <TableMessage>
    <div className="flex flex-col items-center gap-3 text-gray-400">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
      <span className="text-sm">Loading products...</span>
    </div>
  </TableMessage>
);

const ErrorRow = ({ message }) => (
  <TableMessage>
    <div className="flex flex-col items-center gap-2 text-red-400">
      <AlertCircle className="w-8 h-8" />
      <span className="text-sm font-medium">Error: {message}</span>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); window.location.reload(); }}
        className="text-sm text-red-400 border border-gray-400 px-3 py-1 rounded bg-gray-400 hover:bg-gray-200 transition-colors"
      >
        Refresh
      </button>
    </div>
  </TableMessage>
);

const EmptyRow = () => (
  <TableMessage>
    <div className="flex flex-col items-center gap-2 text-gray-400">
      <PackageX className="w-8 h-8" />
      <span className="text-sm">No products found</span>
    </div>
  </TableMessage>
);

// ── Stock Badge ──────────────────────────────────────────
const StockBadge = ({ stock }) => {
  const qty = Number(stock);
  let style, label;

  if (!stock && stock !== 0) {
    style = "bg-gray-100 text-gray-500";
    label = "—";
  } else if (qty === 0) {
    style = "bg-red-100 text-red-700";
    label = "0 — Out of Stock";
  } else if (qty <= 10) {
    style = "bg-yellow-100 text-yellow-700";
    label = `${qty} — Low Stock`;
  } else {
    style = "bg-green-100 text-green-700";
    label = `${qty} — In Stock`;
  }

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>
      {label}
    </span>
  );
};

// ── Image Modal ──────────────────────────────────────────
const ImageModal = ({ selectedImage, productName, onClose }) => {
  if (!selectedImage) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={onClose}>
      <div className="relative bg-white rounded-2xl p-4 max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100">
          <X className="w-5 h-5 text-gray-600" />
        </button>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 pr-8">{productName}</h3>
        <img src={selectedImage} alt={productName} className="w-full h-[400px] object-contain rounded-xl" />
      </div>
    </div>
  );
};

// ── Edit Modal ───────────────────────────────────────────
const EditModal = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState({
    name:     product.name     || "",
    price:    product.price    || "",
    stock:    product.stock    || "",
    category: product.category || "",
    discount: product.discount || "",
    oldPrice: product.oldPrice || "",
    images:   product.images?.length ? product.images : [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const images = [...form.images];
    images[index] = value;
    setForm({ ...form, images });
  };

  const addImageField = () => setForm({ ...form, images: [...form.images, ""] });

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:bg-white transition";

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={onClose}>
      <div
        className="relative bg-white rounded-2xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-bold text-gray-800">Edit Product</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className={inputClass} />

          <div className="grid grid-cols-2 gap-4">
            <input name="price"    type="number" value={form.price}    onChange={handleChange} placeholder="Price"     className={inputClass} />
            <input name="oldPrice" type="number" value={form.oldPrice} onChange={handleChange} placeholder="Old Price" className={inputClass} />
          </div>

          <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Stock (e.g. 50)" className={inputClass} />

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Preview:</span>
            <StockBadge stock={form.stock} />
          </div>

          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className={inputClass} />
          <input name="discount" value={form.discount} onChange={handleChange} placeholder="Discount (e.g. 20%)" className={inputClass} />

          <div>
            <p className="font-medium mb-2 text-gray-700">Images</p>
            {form.images.map((img, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                {img && <img src={img} alt={`preview-${i}`} className="w-10 h-10 object-cover rounded-lg border border-gray-200 shrink-0" />}
                <input value={img} placeholder="Image URL..." onChange={(e) => handleImageChange(i, e.target.value)} className={inputClass} />
                <input type="file" accept="image/*" id={`edit-img-${i}`} className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    handleImageChange(i, URL.createObjectURL(file));
                  }}
                />
                <label htmlFor={`edit-img-${i}`} className="shrink-0 px-3 py-2 rounded-xl border border-gray-200 text-gray-500 text-xs cursor-pointer hover:bg-gray-50 transition">
                  Browse
                </label>
              </div>
            ))}
            <button type="button" onClick={addImageField} className="text-sm text-gray-500 hover:text-gray-800 hover:underline">
              + Add Image
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition text-sm font-medium">
            Cancel
          </button>
          <button onClick={() => onSave(form)} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ── ProductRow ───────────────────────────────────────────
// Headers:  Product (image+name) | Category | Price | Stock | Actions
// Columns:          1                  2        3       4        5
const ProductRow = ({ product, onDelete, onImageClick, onEdit }) => (
  <tr className="border-t border-gray-100 hover:bg-blue-50 transition-colors">

    {/* 1 — Product: image + name */}
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            onClick={() => onImageClick(product.images[0], product.name)}
            className="w-10 h-10 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-xs shrink-0">
            No img
          </div>
        )}
        <span className="font-medium text-gray-900">{product.name || "—"}</span>
      </div>
    </td>

    {/* 2 — Category */}
    <td className="px-6 py-4 text-gray-500">{product.category || "—"}</td>

    {/* 3 — Price */}
    <td className="px-6 py-4 text-gray-700">
      {product.price ? `Rs. ${Number(product.price).toFixed(2)}` : "—"}
    </td>

    {/* 4 — Stock */}
    <td className="px-6 py-4">
      <StockBadge stock={product.stock} />
    </td>

    {/* 5 — Actions */}
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(product)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </td>
  </tr>
);

// ── Main Products Component ──────────────────────────────
const Products = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery,    setSearchQuery]    = useState("");
  const [selectedImage,  setSelectedImage]  = useState(null);
  const [selectedName,   setSelectedName]   = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector((state) => state.FetchPrducts);

  useEffect(() => { dispatch(fetchData()); }, [dispatch]);

  if (showAddProduct) return <FormData onClose={() => setShowAddProduct(false)} />;

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    return p.name?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q);
  });

  const renderTableBody = () => {
    if (loading) return <LoadingRows />;
    if (error)   return <ErrorRow message={error} />;
    if (filteredProducts.length === 0) return <EmptyRow />;
    return filteredProducts.map((product) => (
      <ProductRow
        key={product._id}
        product={product}
        onDelete={(id) => {
          if (window.confirm("Delete this product?")) dispatch(deleteProductAsync(id));
        }}
        onImageClick={(img, name) => { setSelectedImage(img); setSelectedName(name); }}
        onEdit={(product) => setEditingProduct(product)}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">

      <ImageModal
        selectedImage={selectedImage}
        productName={selectedName}
        onClose={() => { setSelectedImage(null); setSelectedName(""); }}
      />

      {editingProduct && (
        <EditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(updatedData) => {
            dispatch(editProductAsync({ id: editingProduct._id, updatedData }));
            setEditingProduct(null);
          }}
        />
      )}

      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
          <button
            onClick={() => setShowAddProduct(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-white rounded-xl border border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {/* 5 headers — ProductRow ke 5 columns se match */}
                {["Product", "Category", "Price", "Stock", "Actions"].map((col) => (
                  <th key={col} className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {renderTableBody()}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Products;