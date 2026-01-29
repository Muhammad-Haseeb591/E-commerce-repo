import { Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useState } from 'react';
import { BarChart} from 'recharts';
import { DollarSign, Package, ShoppingCart, Users} from 'lucide-react';
import StatCard from "./StatCard"
const Dashboard = () =>{
    const [orders, setOrders] = useState([
        { id: '#ORD-001', customer: 'John Doe', date: '2026-01-10', total: 289.97, status: 'Delivered' },
        { id: '#ORD-002', customer: 'Jane Smith', date: '2026-01-10', total: 199.99, status: 'Processing' },
        { id: '#ORD-003', customer: 'Mike Johnson', date: '2026-01-09', total: 62.98, status: 'Shipped' },
        { id: '#ORD-004', customer: 'Sarah Williams', date: '2026-01-09', total: 449.95, status: 'Pending' },
      ]);
      
  const salesData = [
    { month: 'Jul', sales: 4200 },
    { month: 'Aug', sales: 5100 },
    { month: 'Sep', sales: 4800 },
    { month: 'Oct', sales: 6200 },
    { month: 'Nov', sales: 7400 },
    { month: 'Dec', sales: 8900 },
    { month: 'Jan', sales: 9500 },
  ];

  const revenueData = [
    { day: 'Mon', revenue: 1200 },
    { day: 'Tue', revenue: 1900 },
    { day: 'Wed', revenue: 1600 },
    { day: 'Thu', revenue: 2100 },
    { day: 'Fri', revenue: 2400 },
    { day: 'Sat', revenue: 3200 },
    { day: 'Sun', revenue: 2800 },
  ];
   return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={DollarSign} label="Total Revenue" value="$45,231" change="+12.5%" color="bg-blue-500" />
        <StatCard icon={ShoppingCart} label="Total Orders" value="1,245" change="+8.2%" color="bg-green-500" />
        <StatCard icon={Package} label="Total Products" value="856" change="+3.1%" color="bg-purple-500" />
        <StatCard icon={Users} label="Total Customers" value="3,842" change="+15.3%" color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )}
   export default Dashboard