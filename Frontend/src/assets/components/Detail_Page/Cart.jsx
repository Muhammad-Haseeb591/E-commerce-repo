import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} from "../redux_Toolkit/cartSlice";

import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getItemId = (item) => item?._id ?? item?.id;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, hydrated } = useSelector((state) => state.cart);

  const total = items.reduce(
    (acc, i) => acc + Number(i.price) * i.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    navigate("/checkout", { state: { items, total } });
  };

  if (!hydrated) {
    return <div className="min-h-screen bg-white" />;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center space-y-4 text-gray-400">
          <ShoppingBag className="w-16 h-16 mx-auto" />
          <p className="text-[#333333] font-medium">Cart khali hai</p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#333333] hover:bg-[#1f1f1f] active:scale-[0.98] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all"
          >
            Products dekho
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-[#333333]">
            Cart ({items.length})
          </h1>

          <button
            onClick={() => dispatch(clearCart())}
            className="text-xs font-semibold text-[#333333] border border-[#333333] rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item) => {
            const itemId = getItemId(item);

            return (
              <div
                key={itemId}
                className="flex gap-4 items-center bg-white border border-[#333333] rounded-xl p-3 sm:p-4"
              >
                <img
                  src={item.images?.[0] || ""}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover border border-[#333333] shrink-0 bg-gray-50"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#333333] truncate">{item.name}</p>
                  <p className="text-sm text-gray-500 mt-0.5">Rs. {item.price}</p>
                </div>

                <div className="flex items-center gap-2 border border-[#333333] rounded-lg px-1">
                  <button
                    onClick={() => dispatch(decreaseQty(itemId))}
                    className="w-7 h-7 flex items-center justify-center text-[#333333] hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <span className="w-5 text-center text-sm font-medium text-[#333333]">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => dispatch(increaseQty(itemId))}
                    className="w-7 h-7 flex items-center justify-center text-[#333333] hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(itemId))}
                  className="w-9 h-9 flex items-center justify-center text-[#333333] border border-[#333333] rounded-lg hover:bg-gray-50 transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-[#333333] rounded-xl p-4 sm:p-5 flex items-center justify-between gap-4">
          <div className="font-bold text-[#333333] text-lg">
            Total: Rs. {total.toLocaleString()}
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="bg-[#333333] hover:bg-[#1f1f1f] active:scale-[0.98] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all whitespace-nowrap"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
