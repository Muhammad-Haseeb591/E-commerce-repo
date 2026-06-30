import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty, clearCart } from "../redux_Toolkit/cartSlice";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const total = items.reduce((acc, i) => acc + Number(i.price) * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-4 text-gray-400">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-200" />
          <p className="text-lg font-medium text-gray-500">Cart khali hai</p>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-blue-500 hover:underline"
          >
            Products dekho
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Cart ({items.length})
          </h1>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-sm text-red-400 hover:text-red-600 transition"
          >
            Clear All
          </button>
        </div>

        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4"
            >
              {/* Image */}
              <img
                src={item.images?.[0] || ""}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-xl border border-gray-100 shrink-0"
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{item.name}</p>
                <p className="text-sm text-blue-600 font-semibold mt-0.5">
                  Rs. {Number(item.price).toLocaleString()}
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => dispatch(decreaseQty(item._id))}
                  className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <Minus className="w-3 h-3 text-gray-600" />
                </button>
                <span className="w-6 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => dispatch(increaseQty(item._id))}
                  disabled={item.quantity >= item.stock}
                  className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-40"
                >
                  <Plus className="w-3 h-3 text-gray-600" />
                </button>
              </div>

              {/* Item total */}
              <p className="text-sm font-semibold text-gray-700 w-24 text-right shrink-0">
                Rs. {(Number(item.price) * item.quantity).toLocaleString()}
              </p>

              {/* Remove */}
              <button
                onClick={() => dispatch(removeFromCart(item._id))}
                className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Items ({items.reduce((a, i) => a + i.quantity, 0)})</span>
            <span>Rs. {total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Delivery</span>
            <span className="text-green-600 font-medium">Free</span>
          </div>
          <hr className="border-gray-100" />
          <div className="flex justify-between font-bold text-gray-900 text-lg">
            <span>Total</span>
            <span>Rs. {total.toLocaleString()}</span>
          </div>
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;