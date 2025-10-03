import React, { useState, useContext } from "react";
import {
  Home,
  Package,
  Truck,
  List,
  User,
  Plus,
  Search,
  Filter,
  Edit,
  Save,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Calendar,
  MapPin,
  MessageSquare,
  Phone,
  Mail,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

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

  const HomeSection = () => (
    <div className="space-y-8">
      <h1 className={`text-3xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
        Welcome, {supplierProfile.name}
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Total Orders</p>
              <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{supplierProfile.totalOrders}</p>
            </div>
            <List className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Pending Deliveries</p>
              <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{supplierProfile.pendingDeliveries}</p>
            </div>
            <Truck className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Inventory Items</p>
              <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{inventory.length}</p>
            </div>
            <Package className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Supplier Rating</p>
              <p className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{supplierProfile.rating}/5</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Recent Orders</h3>
        <div className="space-y-4">
          {orders.slice(0, 3).map(order => (
            <div key={order.id} className={`flex items-center justify-between p-3 rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
              <div>
                <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{order.item} ({order.quantity})</p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>For: {order.ngo}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <h3 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Low Stock Alerts</h3>
        <div className="space-y-4">
          {inventory.filter(item => item.status === 'Low Stock').map(item => (
            <div key={item.id} className={`flex items-center justify-between p-3 rounded-lg border-l-4 border-red-500 ${theme === 'light' ? 'bg-red-50' : 'bg-red-900/20'}`}>
              <div>
                <p className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.item}</p>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Quantity: {item.quantity} {item.unit}</p>
              </div>
              <span className="text-red-600 font-semibold">Urgent!</span>
            </div>
          ))}
          {inventory.filter(item => item.status === 'Low Stock').length === 0 && (
            <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>No low stock items.</p>
          )}
        </div>
      </div>
    </div>
  );

  const ManageInventorySection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Manage Inventory</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} h-4 w-4`} />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
          />
        </div>
        <button className={`flex items-center px-4 py-2 border rounded-lg ${theme === 'light' ? 'border-gray-300 hover:bg-gray-50 text-gray-700' : 'border-gray-600 hover:bg-gray-700 text-gray-300'}`}>
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </button>
      </div>

      <div className={`rounded-lg shadow-sm border overflow-hidden ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Item</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Quantity</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Status</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Last Updated</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
            {inventory.map(item => (
              <tr key={item.id}>
                <td className={`px-6 py-4 whitespace-nowrap ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{item.item}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{item.quantity} {item.unit}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                    item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{item.lastUpdated}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ViewOrdersSection = () => (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>View Orders</h2>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} h-4 w-4`} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
          />
        </div>
        <button className={`flex items-center px-4 py-2 border rounded-lg ${theme === 'light' ? 'border-gray-300 hover:bg-gray-50 text-gray-700' : 'border-gray-600 hover:bg-gray-700 text-gray-300'}`}>
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orders.map(order => (
          <div key={order.id} className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{order.item} ({order.quantity})</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Ordered by: {order.ngo}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {order.status}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                <Calendar className="mr-2 h-4 w-4" />
                Order Date: {order.date}
              </div>
              <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                <Truck className="mr-2 h-4 w-4" />
                Delivery Date: {order.deliveryDate}
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ManageDeliveriesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Manage Deliveries</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Delivery
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'} h-4 w-4`} />
          <input
            type="text"
            placeholder="Search deliveries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
          />
        </div>
        <button className={`flex items-center px-4 py-2 border rounded-lg ${theme === 'light' ? 'border-gray-300 hover:bg-gray-50 text-gray-700' : 'border-gray-600 hover:bg-gray-700 text-gray-300'}`}>
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </button>
      </div>

      <div className={`rounded-lg shadow-sm border overflow-hidden ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Order ID</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Destination</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Scheduled Date</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Status</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Driver</th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'light' ? 'text-gray-500' : 'text-gray-300'} uppercase tracking-wider`}>Actions</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'light' ? 'divide-gray-200' : 'divide-gray-700'}`}>
            {deliveries.map(delivery => (
              <tr key={delivery.id}>
                <td className={`px-6 py-4 whitespace-nowrap ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{delivery.orderId}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{delivery.destination}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{delivery.scheduled}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    delivery.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                    delivery.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {delivery.status}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{delivery.driver}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-900">Update Status</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ProfileSection = () => (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Supplier Profile</h2>
      
      <div className={`p-6 rounded-lg shadow-sm border ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Company Information</h3>
          <button className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Company Name</label>
            <input
              type="text"
              value={supplierProfile.name}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
              readOnly
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Email</label>
            <input
              type="email"
              value={supplierProfile.email}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
              readOnly
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Phone</label>
            <input
              type="tel"
              value={supplierProfile.phone}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
              readOnly
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Rating</label>
            <input
              type="text"
              value={`${supplierProfile.rating}/5`}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
              readOnly
            />
          </div>
        </div>

        <div className="mt-6">
          <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Address</label>
          <textarea
            value={supplierProfile.address}
            rows="2"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'light' ? 'bg-white border-gray-300 text-gray-900' : 'bg-gray-700 border-gray-600 text-white'}`}
            readOnly
          />
        </div>

        <div className="mt-6">
          <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-200'} mb-2`}>Products Supplied</label>
          <div className="flex flex-wrap gap-2">
            {supplierProfile.products.map((product, index) => (
              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {product}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'inventory':
        return <ManageInventorySection />;
      case 'orders':
        return <ViewOrdersSection />;
      case 'deliveries':
        return <ManageDeliveriesSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return <HomeSection />;
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