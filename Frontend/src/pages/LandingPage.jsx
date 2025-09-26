import { Plus, Minus, Search, ZoomIn, ZoomOut } from "lucide-react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

// Main Landing Page Component
const LandingPage = () => {
  return (
      <div className="min-h-screen">
        <Navbar />
        
        <main className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card 
                    title="Survivor" 
                    img="https://www.shutterstock.com/image-photo/survivors-hatay-turkey-stories-miracles-600nw-2265953343.jpg"
                    className="md:col-span-2 h-80"
                  />
                  
                  <Card 
                    title="Volunteers" 
                    img="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80"
                    className="h-64"
                  />
                  <Card 
                    title="NGOs" 
                    img="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
                    className="h-64"
                  />
                </div>
              </div>
              
              <div className="lg:w-96 bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Need Help?</h2>
                
                <p className="text-lg font-semibold text-gray-700 mb-6">If you are:</p>
                
                <div className="space-y-4 mb-8">
                  <p className="text-gray-600 leading-relaxed">
                    In need of help click on{" "}
                    <button className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors">
                      survivor
                    </button>
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed">
                    An individual wishing to help out, click on{" "}
                    <button className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors">
                      volunteering
                    </button>
                  </p>
                  
                  <p className="text-gray-600 leading-relaxed">
                    Registering as an NGO, click{" "}
                    <button className="text-blue-600 font-bold underline hover:text-blue-800 transition-colors">
                      NGOs
                    </button>
                  </p>
                </div>
                
                {/* Contact Section */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    We are available 24/7 reach out at:
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📞</span>
                      <div className="text-gray-700">
                        <span className="font-medium">+91 1234567890</span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="font-medium">+91 0987654321</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✉️</span>
                      <span className="font-medium text-gray-700">crisis@connect.org</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
};

export default LandingPage;