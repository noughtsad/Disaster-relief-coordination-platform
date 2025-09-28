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
          <Link 
            to="/feedback"
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              theme === "light" 
                ? "text-gray-600 hover:text-gray-900" 
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-4 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            About CrisisConnect
          </h1>
        </div>

        {/* Mission Section */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-blue-600" />
            <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Our Mission
            </h2>
          </div>
          <p className={`text-lg ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
            CrisisConnect bridges the gap between those in need and those who can help during disasters and emergencies. We create seamless connections that save lives and rebuild communities.
          </p>
        </section>

        {/* Values Section */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Our Values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg border ${
              theme === "light" 
                ? "bg-white border-gray-200" 
                : "bg-gray-800 border-gray-700"
            }`}>
              <Shield className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className={`font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Reliability
              </h3>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                We ensure our platform is always available when disasters strike, providing dependable support when it matters most.
              </p>
            </div>
            <div className={`p-6 rounded-lg border ${
              theme === "light" 
                ? "bg-white border-gray-200" 
                : "bg-gray-800 border-gray-700"
            }`}>
              <Heart className="w-8 h-8 text-red-500 mb-3" />
              <h3 className={`font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Compassion
              </h3>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                Every interaction is guided by empathy and understanding of the difficult situations people face during crises.
              </p>
            </div>
            <div className={`p-6 rounded-lg border ${
              theme === "light" 
                ? "bg-white border-gray-200" 
                : "bg-gray-800 border-gray-700"
            }`}>
              <Users className="w-8 h-8 text-green-500 mb-3" />
              <h3 className={`font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                Community
              </h3>
              <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                We believe in the power of community and collective action to overcome challenges and build resilience.
              </p>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-green-500" />
            <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Our Impact
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div key={index} className={`p-6 rounded-lg border text-center ${
                theme === "light" 
                  ? "bg-white border-gray-200" 
                  : "bg-gray-800 border-gray-700"
              }`}>
                <div className={`text-2xl font-bold mb-2 ${theme === "light" ? "text-blue-600" : "text-blue-400"}`}>
                  {stat.number}
                </div>
                <div className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Our Technology
            </h2>
          </div>
          <p className={`text-lg ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
            Built with modern web technologies including React, Node.js, and real-time communication systems, our platform ensures fast, reliable, and secure connections between survivors, volunteers, and NGOs.
          </p>
        </section>

        {/* Team Section */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className={`text-2xl font-bold ${theme === "light" ? "text-gray-900" : "text-white"}`}>
              Meet Our Team
            </h2>
          </div>
          <p className={`text-lg ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
            Our team is composed of dedicated professionals with diverse backgrounds in disaster management, technology, and community outreach.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className={`p-6 rounded-lg border text-center ${
                theme === "light" 
                  ? "bg-white border-gray-200" 
                  : "bg-gray-800 border-gray-700"
              }`}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className={`font-semibold mb-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
                  {member.name}
                </h3>
                <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className={`p-8 rounded-lg border ${
          theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
        }`}>
          <h2 className={`text-2xl font-bold mb-6 ${theme === "light" ? "text-gray-900" : "text-white"}`}>
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>Email</p>
                <Link 
                  to="/feedback"
                  className={`text-sm transition-colors ${
                    theme === "light" ? "text-blue-600 hover:text-blue-800" : "text-blue-400 hover:text-blue-300"
                  }`}
                >
                  contact@crisisconnect.com
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <p className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>Emergency</p>
                <Link 
                  to="/feedback"
                  className={`text-sm transition-colors ${
                    theme === "light" ? "text-green-600 hover:text-green-800" : "text-green-400 hover:text-green-300"
                  }`}
                >
                  1-800-CRISIS
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-red-600" />
              <div>
                <p className={`font-medium ${theme === "light" ? "text-gray-900" : "text-white"}`}>Location</p>
                <p className={`text-sm transition-colors ${
                  theme === "light" ? "text-gray-600" : "text-gray-300"
                }`}>
                  Mumbai, India
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={`border-t py-8 ${
        theme === "light" 
          ? "bg-white border-gray-200" 
          : "bg-gray-800 border-gray-700"
      }`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className={`text-sm ${theme === "light" ? "text-gray-600" : "text-gray-400"}`}>
            © 2024 CrisisConnect. All rights reserved. Built with ❤️ to help communities in crisis.
          </p>
        </div>
      </footer>
    </div>
  );
}