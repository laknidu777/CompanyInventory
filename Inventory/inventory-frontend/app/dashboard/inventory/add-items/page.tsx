'use client';
import { useRouter } from "next/navigation";
import BusinessOwnerHeader from "../../../components/BusinessOwner/Header/page";
import Sidebar from "../../../components/sidebar/page";
import Footer from "../../../components/welcomePage/Footer/page";
import { Package, Box, Layers } from "lucide-react";

const AddInventoryItem = () => {
  const router = useRouter();

  const handleNavigation = (type: string) => {
    router.push(`/inventory/add/${type}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 ">
      {/* Header */}
      <BusinessOwnerHeader />

      <div className="flex flex-1 text-gray-600">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Add Inventory Item</h1>
              <p className="text-gray-600 mt-2">Select the type of inventory item you want to add</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Item Group Card */}
              <div
                onClick={() => handleNavigation("item-group")}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-200 cursor-pointer group"
              >
                <div className="p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                    <Box size={32} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Item Group</h2>
                  <p className="text-gray-600 text-center">Same items in large quantity (bulk inventory)</p>
                </div>
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-sm text-blue-600 font-medium group-hover:bg-blue-50 transition-colors duration-300">
                  Select this type
                </div>
              </div>

              {/* Single Item Card */}
              <div
                onClick={() => handleNavigation("single-item")}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-200 cursor-pointer group"
              >
                <div className="p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors duration-300">
                    <Package size={32} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Single Item</h2>
                  <p className="text-gray-600 text-center">A unique item with individual tracking (e.g., a vehicle)</p>
                </div>
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-sm text-green-600 font-medium group-hover:bg-green-50 transition-colors duration-300">
                  Select this type
                </div>
              </div>

              {/* Composite Item Card */}
              <div
                onClick={() => handleNavigation("composite-item")}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-200 cursor-pointer group"
              >
                <div className="p-6 flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors duration-300">
                    <Layers size={32} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Composite Item</h2>
                  <p className="text-gray-600 text-center">Bundle of multiple items sold together as one product</p>
                </div>
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-sm text-purple-600 font-medium group-hover:bg-purple-50 transition-colors duration-300">
                  Select this type
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AddInventoryItem;