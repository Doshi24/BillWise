import LeftSideNav from "./LeftSideNav"
import TopNavbar from "./TopNavbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function Homepage(){
    
  return (
    <Router>
      <div className="flex h-screen w-screen">
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64">
          <LeftSideNav />
        </div>

        {/* Main Section */}
        <div className="flex-1 ml-64 flex flex-col">
          {/* Top Navbar */}
          <div className="sticky top-0 z-10">
            <TopNavbar />
          </div>

          {/* Page Content */}
          <div className="p-6 flex-1 overflow-y-auto">
            {/* <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/suppliers" element={<SuppliersPage />} />
            </Routes> */}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Homepage;
    
