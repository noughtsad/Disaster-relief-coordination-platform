import React, { useState, useContext } from "react";
import {
  Home,
  Package,
  Truck,
  List,
  User,
} from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

// Import all section components
import HomeSection from './HomeSection';
import ManageInventorySection from './ManageInventorySection';
import ViewOrdersSection from './ViewOrdersSection';
import ManageDeliveriesSection from './ManageDeliveriesSection';
import ProfileSection from './ProfileSection';

export default function SupplierDashboard() {
  const { theme } = useContext(ThemeContext);

  const [activeSection, setActiveSection] = useState('home');
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for supplier profile
  const [supplierProfile] = useState({
    name: "Global Supplies Inc.",
    email: "contact@globalsupplies.com",
    phone: "+1 (123) 456-7890",
    address: "789 Supply Chain Road, Logistics City, LC 10111",
    products: ["Water Bottles", "Tents", "First Aid Kits", "Blankets"],
    totalOrders: 120,
    pendingDeliveries: 15,
    rating: 4.5,
  });

  // Mock data for inventory
  const [inventory] = useState([
    { id: 1, item: "Water Bottles (500ml)", quantity: 15000, unit: "bottles", status: "In Stock", lastUpdated: "2025-09-28" },
    { id: 2, item: "Emergency Tents", quantity: 200, unit: "units", status: "Low Stock", lastUpdated: "2025-09-29" },
    { id: 3, item: "First Aid Kits (Standard)", quantity: 500, unit: "kits", status: "In Stock", lastUpdated: "2025-09-30" },
    { id: 4, item: "Wool Blankets", quantity: 1000, unit: "units", status: "In Stock", lastUpdated: "2025-09-28" },
  ]);

  // Mock data for orders
  const [orders] = useState([
    { id: 1, item: "Water Bottles", quantity: 5000, ngo: "Red Cross", date: "2025-10-01", status: "Pending", deliveryDate: "2025-10-05" },
    { id: 2, item: "Emergency Tents", quantity: 50, ngo: "Local Aid Group", date: "2025-09-29", status: "Delivered", deliveryDate: "2025-10-02" },
    { id: 3, item: "First Aid Kits", quantity: 100, ngo: "Health Care United", date: "2025-09-28", status: "Processing", deliveryDate: "2025-10-04" },
  ]);

  // Mock data for deliveries
  const [deliveries] = useState([
    { id: 1, orderId: 1, destination: "Downtown Relief Center", scheduled: "2025-10-05", status: "Scheduled", driver: "John Doe" },
    { id: 2, orderId: 2, destination: "Community Center", scheduled: "2025-10-02", status: "Completed", driver: "Jane Smith" },
  ]);

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection theme={theme} supplierProfile={supplierProfile} orders={orders} inventory={inventory} />;
      case 'inventory':
        return <ManageInventorySection theme={theme} inventory={inventory} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
      case 'orders':
        return <ViewOrdersSection theme={theme} orders={orders} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
      case 'deliveries':
        return <ManageDeliveriesSection theme={theme} deliveries={deliveries} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />;
      case 'profile':
        return <ProfileSection theme={theme} supplierProfile={supplierProfile} />;
      default:
        return <HomeSection theme={theme} supplierProfile={supplierProfile} orders={orders} inventory={inventory} />;
    }
  };

  return (
    <div className={`min-h-screen flex ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      {/* Sidebar */}
      <div className={`w-64 min-h-screen shadow-sm ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800'
      }`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                {supplierProfile.name}
              </p>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Supplier
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <button
              onClick={() => setActiveSection('home')}
              className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                activeSection === 'home'
                  ? theme === 'light'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'bg-blue-900 text-blue-100'
                  : theme === 'light'
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Home className="mr-3 h-5 w-5" />
                Home
              </div>
            </button>
            <button
              onClick={() => setActiveSection('inventory')}
              className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                activeSection === 'inventory'
                  ? theme === 'light'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'bg-blue-900 text-blue-100'
                  : theme === 'light'
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Package className="mr-3 h-5 w-5" />
                Manage Inventory
              </div>
            </button>
            <button
              onClick={() => setActiveSection('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                activeSection === 'orders'
                  ? theme === 'light'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'bg-blue-900 text-blue-100'
                  : theme === 'light'
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <List className="mr-3 h-5 w-5" />
                View Orders
              </div>
            </button>
            <button
              onClick={() => setActiveSection('deliveries')}
              className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                activeSection === 'deliveries'
                  ? theme === 'light'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'bg-blue-900 text-blue-100'
                  : theme === 'light'
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <Truck className="mr-3 h-5 w-5" />
                Manage Deliveries
              </div>
            </button>
            <button
              onClick={() => setActiveSection('profile')}
              className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
                activeSection === 'profile'
                  ? theme === 'light'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'bg-blue-900 text-blue-100'
                  : theme === 'light'
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center">
                <User className="mr-3 h-5 w-5" />
                Profile
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
}