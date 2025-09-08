import React from "react";
import {Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  Truck,
  ShoppingCart,
  FileText,
  Users,
  Calculator,
  BarChart2,
  Settings,
} from "lucide-react";

export default function LeftSideNav() {
  return (
    <div className="h-screen w-64 bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Bill-Wise</h1>
          <p className="text-sm text-gray-500">Tracking & Distribution</p>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-1">
          
          <Link 
            to="/inventory" 
            className="flex items-center px-6 py-3 text-white bg-black rounded-lg font-medium"
          >
          Inventory
          </Link>

          {/* <a
            href="#"
            className="flex items-center px-6 py-3 text-white bg-black rounded-lg font-medium"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </a> */}
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-black hover:text-white hover:rounded-lg font-medium"
          >
            <Package className="w-5 h-5 mr-3" />
            Inventory
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-black hover:text-white hover:rounded-lg font-medium"
          >
            <Truck className="w-5 h-5 mr-3" />
            Suppliers
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-black hover:text-white hover:rounded-lg font-medium"
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            Purchase Orders
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-black hover:text-white hover:rounded-lg font-medium"
          >
            <FileText className="w-5 h-5 mr-3" />
            Sales Orders
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-black hover:text-white hover:rounded-lg font-medium"
          >
            <Users className="w-5 h-5 mr-3" />
            Business Clients
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-black hover:text-white hover:rounded-lg font-medium"
          >
            <Calculator className="w-5 h-5 mr-3" />
            Tax & GST
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-black hover:text-white hover:rounded-lg font-medium"
          >
            <BarChart2 className="w-5 h-5 mr-3" />
            Analytics
          </a>
          <a
            href="#"
            className="flex items-center px-6 py-3 text-gray-700 hover:bg-black hover:text-white hover:rounded-lg font-medium"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </a>
        </nav>
      </div>

      {/* Bottom User Section */}
      <div className="px-6 py-4 border-t flex items-center">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-bold">
          MD
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-800">M D</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>
      </div>
    </div>
  );
}
