import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Heart, Shield, Users, Target, TrendingUp, Mail, Phone, MapPin } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

export default function AboutPage() {
  const { theme } = useContext(ThemeContext);

  const teamMembers = [
    {
      name: "Saad Nawaz",
      
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      description: "Leading disaster relief efforts with 10+ years experience in emergency management."
    },
    {
      name: "Sambhav Tripathi",
      
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      description: "Technology expert focused on building scalable platforms for crisis response."
    },
    {
      name: "Rudra Laheri",
      
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=crop&w=300&q=80",
      description: "Passionate about connecting communities and improving disaster response coordination."
    }
  ];

  const impactStats = [
    { number: "50,000+", label: "People Helped" },
    { number: "1,200+", label: "Active Volunteers" },
    { number: "150+", label: "Partner NGOs" },
    { number: "95%", label: "Success Rate" }
  ];

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-gray-50" : "bg-gray-900"}`}>
      {/* Navigation */}
      <nav className={`px-6 py-4 border-b flex items-center justify-between ${
        theme === "light" 
          ? "bg-white border-gray-200" 
          : "bg-gray-800 border-gray-700"
      }`}>
        <h1 className={`text-xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
          CrisisConnect
        </h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              theme === "light" 
                ? "text-gray-600 hover:text-gray-900" 
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Home
          </Link>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">
            About Us
          </button>
          <Link 
            to="/donations"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              theme === "light" 
                ? "text-gray-600 hover:text-gray-900" 
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Donate
          </Link>
          <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            theme === "light" 
              ? "text-gray-600 hover:text-gray-900" 
              : "text-gray-400 hover:text-gray-200"
          }`}>
            Resources
          </button>
          <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            theme === "light" 
              ? "text-gray-600 hover:text-gray-900" 
              : "text-gray-400 hover:text-gray-200"
          }`}>
            Contact
          </button>
        </div>
      </nav>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Donate
          </button>
          <button className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
            theme === "light" 
              ? "border-gray-300 text-gray-600 hover:bg-gray-50" 
              : "border-gray-600 text-gray-400 hover:bg-gray-700"
          }`}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        
        {/* Header */}
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-8 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            About CrisisConnect
          </h1>
        </div>

        {/* Our Mission */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-blue-600" />
            <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Our Mission
            </h2>
          </div>
          <p className={`text-lg leading-relaxed ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
            CrisisConnect is dedicated to providing immediate and effective disaster relief by connecting those affected with essential 
            resources and support. Our mission is to minimize suffering and facilitate recovery in communities impacted by natural 
            disasters.
          </p>
        </section>

        {/* Our Values */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Our Values
            </h2>
          </div>
          <p className={`text-lg leading-relaxed ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
            We operate with transparency, accountability, and a deep commitment to the communities we serve. Our core values include 
            empathy, integrity, and a focus on sustainable solutions that empower individuals and families to rebuild their lives.
          </p>
          
          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className={`p-6 rounded-lg border ${
              theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
            }`}>
              <Shield className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className={`font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Transparency
              </h3>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                Open communication and accountability in all our operations
              </p>
            </div>
            <div className={`p-6 rounded-lg border ${
              theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
            }`}>
              <Heart className="w-8 h-8 text-red-500 mb-4" />
              <h3 className={`font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Empathy
              </h3>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                Understanding and compassion for those facing crisis situations
              </p>
            </div>
            <div className={`p-6 rounded-lg border ${
              theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
            }`}>
              <Target className="w-8 h-8 text-green-500 mb-4" />
              <h3 className={`font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Efficiency
              </h3>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                Swift and effective response to emergency situations
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-green-500" />
            <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              How It Works
            </h2>
          </div>
          <p className={`text-lg leading-relaxed ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
            Our platform streamlines the process of disaster relief by offering a centralized hub for information, resources, and 
            assistance. People can easily access real-time updates, request aid, and connect with volunteers and organizations providing 
            support. We ensure that help reaches those who need it most, efficiently and effectively.
          </p>

          {/* Process Steps */}
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                theme === "light" ? "bg-blue-100" : "bg-blue-900/30"
              }`}>
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className={`font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Report Need
              </h3>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                Survivors report their immediate needs through our platform
              </p>
            </div>
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                theme === "light" ? "bg-green-100" : "bg-green-900/30"
              }`}>
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className={`font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Match Resources
              </h3>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                We connect needs with available volunteers and resources
              </p>
            </div>
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                theme === "light" ? "bg-orange-100" : "bg-orange-900/30"
              }`}>
                <span className="text-orange-600 font-bold">3</span>
              </div>
              <h3 className={`font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Coordinate Response
              </h3>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                Real-time coordination ensures efficient aid distribution
              </p>
            </div>
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
                theme === "light" ? "bg-purple-100" : "bg-purple-900/30"
              }`}>
                <span className="text-purple-600 font-bold">4</span>
              </div>
              <h3 className={`font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Track Impact
              </h3>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                Monitor progress and measure our collective impact
              </p>
            </div>
          </div>
        </section>

        {/* Our Impact */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Our Impact
            </h2>
          </div>
          <p className={`text-lg leading-relaxed ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
            Since our inception, CrisisConnect has played a crucial role in numerous disaster relief efforts, from hurricanes to wildfires. 
            We've helped thousands of families regain their hope and not just immediate relief but also long-term support to 
            foster resilience and recovery. Our impact is measured not just in numbers, but in the stories of hope and recovery we've 
            helped create.
          </p>

          {/* Impact Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            {impactStats.map((stat, index) => (
              <div key={index} className={`p-6 rounded-lg border text-center ${
                theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
              }`}>
                <h3 className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </h3>
                <p className={`font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Meet the Team */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Meet the Team
            </h2>
          </div>
          <p className={`text-lg leading-relaxed ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
            Our team is composed of dedicated professionals with diverse backgrounds in disaster management, technology, and 
            community outreach. We are united by a shared passion for making a difference and a commitment to leveraging innovation 
            to improve disaster relief outcomes.
          </p>

          {/* Team Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {teamMembers.map((member, index) => (
              <div key={index} className={`text-center p-6 rounded-lg border ${
                theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
              }`}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className={`text-xl font-semibold mb-1 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className={`p-8 rounded-lg border ${
          theme === "light" ? "bg-blue-50 border-blue-200" : "bg-blue-900/20 border-blue-700"
        }`}>
          <h2 className={`text-2xl font-bold mb-6 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  Email
                </p>
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  crisis@connect.org
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  Phone
                </p>
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  +91 8779667998
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  Address
                </p>
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
                  Mumbai, Maharashtra
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={`border-t py-8 ${
        theme === "light" 
          ? "border-gray-200 bg-white" 
          : "border-gray-700 bg-gray-800"
      }`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-8">
              <button className={`text-sm transition-colors ${
                theme === "light" 
                  ? "text-blue-600 hover:text-blue-700" 
                  : "text-blue-400 hover:text-blue-300"
              }`}>
                Privacy Policy
              </button>
              <button className={`text-sm transition-colors ${
                theme === "light" 
                  ? "text-blue-600 hover:text-blue-700" 
                  : "text-blue-400 hover:text-blue-300"
              }`}>
                Terms of Service
              </button>
              <button className={`text-sm transition-colors ${
                theme === "light" 
                  ? "text-blue-600 hover:text-blue-700" 
                  : "text-blue-400 hover:text-blue-300"
              }`}>
                Contact Us
              </button>
            </div>
            <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
              ©2025 CrisisConnect. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
