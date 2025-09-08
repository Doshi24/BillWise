import { Search, Bell, User } from "lucide-react";

export default function TopNavbar() {
  return (
    <div className="flex items-center justify-between px-20 py-6 border border-gray-300 rounded-2xl bg-white">
      {/* Left Section */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of your B2B distribution business performance
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Notification */}
        <div className="relative">
          <Bell className="w-5 h-5 text-gray-700 cursor-pointer" />
          <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full px-1.5 py-0.5">
            3
          </span>
        </div>

        {/* User */}
        <div className="cursor-pointer">
          <User className="w-5 h-5 text-gray-700" />
        </div>
      </div>
    </div>
  );
}
