import {
  Bar, BarChart, Line, LineChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { DollarSign, Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import StatCard from "./StatCard";

// ─── Data ─────────────────────────────────────────────────────────────────────

const salesData = [
  { month: "Jul", sales: 4200 },
  { month: "Aug", sales: 5100 },
  { month: "Sep", sales: 4800 },
  { month: "Oct", sales: 6200 },
  { month: "Nov", sales: 7400 },
  { month: "Dec", sales: 8900 },
  { month: "Jan", sales: 9500 },
];

const revenueData = [
  { day: "Mon", revenue: 1200 },
  { day: "Tue", revenue: 1900 },
  { day: "Wed", revenue: 1600 },
  { day: "Thu", revenue: 2100 },
  { day: "Fri", revenue: 2400 },
  { day: "Sat", revenue: 3200 },
  { day: "Sun", revenue: 2800 },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS = {
  Delivered:  "bg-gray-100 text-gray-700",
  Processing: "bg-gray-200 text-gray-800",
  Shipped:    "bg-gray-700 text-white",
  Pending:    "bg-white text-gray-500 border border-gray-300",
};

const StatusBadge = ({ status }) => (
  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${STATUS[status] ?? "bg-gray-100 text-gray-600"}`}>
    {status}
  </span>
);

// ─── Chart card wrapper ───────────────────────────────────────────────────────

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-2xl border border-gray-200 p-5">
    <h3 className="text-sm font-semibold text-gray-800 mb-4 uppercase tracking-wide">
      {title}
    </h3>
    {children}
  </div>
);

// ─── Shared tooltip style ─────────────────────────────────────────────────────

const tooltipStyle = {
  contentStyle: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    fontSize: 12,
    color: "#374151",
  },
  cursor: { fill: "#f3f4f6" },
};

// ─── Main component ───────────────────────────────────────────────────────────

const Dashboard = () => {
  const [orders] = useState([
    { id: "#ORD-001", customer: "John Doe",      date: "2026-01-10", total: 289.97, status: "Delivered"  },
    { id: "#ORD-002", customer: "Jane Smith",    date: "2026-01-10", total: 199.99, status: "Processing" },
    { id: "#ORD-003", customer: "Mike Johnson",  date: "2026-01-09", total: 62.98,  status: "Shipped"    },
    { id: "#ORD-004", customer: "Sarah Williams",date: "2026-01-09", total: 449.95, status: "Pending"    },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 space-y-6">

      {/* ── Page title ── */}
      <div className="flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-gray-400" />
        <h1 className="text-lg font-bold text-gray-900 tracking-tight">Dashboard</h1>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={DollarSign} label="Revenue"   value="$45,231" change="+12.5%" color="bg-gray-800" />
        <StatCard icon={ShoppingCart} label="Orders"  value="1,245"   change="+8.2%"  color="bg-gray-600" />
        <StatCard icon={Package} label="Products"     value="856"     change="+3.1%"  color="bg-gray-500" />
        <StatCard icon={Users} label="Customers"      value="3,842"   change="+15.3%" color="bg-gray-400" />
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <ChartCard title="Sales Overview">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#1f2937"
                strokeWidth={2}
                dot={{ r: 3, fill: "#1f2937", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Weekly Revenue">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="revenue" fill="#e5e7eb" radius={[6, 6, 0, 0]}
                activeBar={{ fill: "#1f2937" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>

      {/* ── Recent orders ── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

        {/* table header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Recent Orders</h3>
          <span className="text-xs text-gray-400">{orders.length} orders</span>
        </div>

        {/* scrollable on mobile */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Order ID", "Customer", "Date", "Total", "Status"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-mono font-medium text-gray-700">{order.id}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-5 py-3.5 text-sm text-gray-400">{order.date}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-gray-800">${order.total.toFixed(2)}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
