import { useState } from "react";
import { Package, ShoppingCart, Users, Menu, X } from "lucide-react";

import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Products from "./Products";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
         <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 overflow-hidden shadow-2xl`}
      >
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-xs text-slate-400">Manage your store</p>
            </div>
          </div>
        </div>
        <nav className="px-3 py-6 space-y-1">
          {[
            { id: "dashboard", label: "Dashboard", icon: Package },
            { id: "products", label: "Products", icon: Package },
            { id: "orders", label: "Orders", icon: ShoppingCart },
            { id: "customers", label: "Customers", icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30 scale-105"
                  : "hover:bg-slate-700/50 hover:translate-x-1"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-4 flex justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "products" && <Products />}
          {activeTab === "orders" && <Orders />}
          {activeTab === "customers" && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold">Customers</h3>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
