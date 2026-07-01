import { Search, Eye, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux_Toolkit/OrderSlice";

const Orders = () => {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector(
    (state) => state.orders
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter((order) => {
    const customer = order.email || "";
    return customer.toLowerCase().includes(search.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <h2 className="text-lg font-semibold">Loading Orders...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <h2 className="text-red-500 font-semibold">{error}</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Orders
      </h2>

      <div className="bg-white rounded-lg shadow-sm border">

        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <input
              type="text"
              placeholder="Search by Email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer Email
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">

              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {order.email}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    Rs. {order.totalAmount}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>

                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500"
                  >
                    No orders found
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;