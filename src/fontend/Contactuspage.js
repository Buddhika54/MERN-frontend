import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import assets from "../assets/RANAYA Logo.png";
import "../output.css";

// ✅ Hero images
const heroImages = [
  "https://us-east-1-shared-usea1-02.graphassets.com/A2lCPH6tTelhrsostvMQpz/auto_image/resize=fit:max,width:3840/quality=value:75/ZUMivtfRkCZgiJrnFuJN",
];

function ContactUs() {
  const [currentHero, setCurrentHero] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  // Auto slide hero background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Map configuration
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "10px",
  };

  // Example coordinates for Ragama, Sri Lanka (replace with exact factory location)
  const center = {
    lat: 7.0271,
    lng: 79.9229,
  };

  return (
    <div className="font-sans text-gray-800">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full px-6 py-4 flex bg-black/80 flex-wrap items-center justify-between shadow-md z-50 transition-all duration-500 ${
          navScrolled ? "bg-black text-white" : "bg-transparent text-white"
        }`}
      >
        <div className="flex flex-col items-center ms-5">
          <img
            src={assets}
            alt="Ranaya Logo"
            className="w-8 h-8 object-contain mb-2"
          />
          <span className="text-2xl font-bold text-green">RANAYA</span>
        </div>
        <ul className="hidden md:flex space-x-6 text-lg">
          <li><a href="/home" className="hover:text-green-300">Home</a></li>
          <li><a href="/ourStory" className="hover:text-green-300">Our Story</a></li>
          <li><a href="/ourOfferings" className="hover:text-green-300">Our Products</a></li>
          <li><a href="/NewsPage" className="hover:text-green-300">News</a></li>
          <li><a href="/ContactUspage" className="hover:text-green-300 underline underline-offset-4 decoration-green-500">Contact Us</a></li>
        </ul>
        <div className="flex items-center space-x-3 mt-2 md:mt-0">
          <div className="border rounded-lg">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 rounded-md text-green-500"
            />
          </div>
          <a
            href="/join"
            className="px-4 py-2 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 transition duration-300"
          >
            Join Us
          </a>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>
      </nav>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-green-800 text-white transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-green-600">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={() => setSidebarOpen(false)} className="text-2xl">
            <FaTimes />
          </button>
        </div>
        <ul className="flex flex-col space-y-4 mt-6 px-4 text-lg">
          <li><a href="/" className="hover:text-orange-300" onClick={() => setSidebarOpen(false)}>Home</a></li>
          <li><a href="/ourStory" className="hover:text-orange-300" onClick={() => setSidebarOpen(false)}>Our Story</a></li>
          <li><a href="/ourOfferings" className="hover:text-orange-300" onClick={() => setSidebarOpen(false)}>Our Products</a></li>
          <li><a href="/NewsPage" className="hover:text-orange-300" onClick={() => setSidebarOpen(false)}>News</a></li>
          <li><a href="/ContactUspage" className="hover:text-orange-300" onClick={() => setSidebarOpen(false)}>Contact Us</a></li>
        </ul>
      </div>

      {/* Overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* HERO SECTION */}
      <section
        className="relative h-[100vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${heroImages[currentHero]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="max-w-2xl mx-auto text-lg">
            We would love to hear from you! Reach out to Ranaya Tea Factory with any inquiries, 
            feedback, or business opportunities.
          </p>
        </div>
      </section>

      {/* CONTACT FORM & DETAILS */}
      <section className="py-16 container mx-auto px-6 grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-green-700 mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Name</label>
              <input type="text" className="w-full border rounded px-4 py-2" placeholder="Your Name" />
            </div>
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input type="email" className="w-full border rounded px-4 py-2" placeholder="Your Email" />
            </div>
            <div>
              <label className="block font-medium mb-2">Message</label>
              <textarea className="w-full border rounded px-4 py-2 h-32" placeholder="Your Message"></textarea>
            </div>
            <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-bold text-green-700">Get in Touch</h2>
          <p>We are always happy to connect with tea lovers, partners, and communities.</p>
          <div>
            <p className="font-medium">Address:</p>
            <p>Ranaya Tea Factory, Golden Valley, Sri Lanka</p>
          </div>
          <div>
            <p className="font-medium">Phone:</p>
            <p>+94 71 234 5678</p>
          </div>
          <div>
            <p className="font-medium">Email:</p>
            <p>info@ranayatea.com</p>
          </div>
          <div>
            <p className="font-medium">🌐 Follow Us:</p>
            <div className="flex space-x-4 mt-2">
              <a href="/" className="text-green-700 hover:text-green-900">Facebook</a>
              <a href="/" className="text-green-700 hover:text-green-900">Instagram</a>
              <a href="/" className="text-green-700 hover:text-green-900">LinkedIn</a>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ INTERACTIVE GOOGLE MAP */}
      <section className="px-6 pb-12">
        <h3 className="text-2xl font-bold text-center mb-4">Find Us Here</h3>
        <LoadScript googleMapsApiKey="AIzaSyAkBKS1F5HQ2P1yCTrA51jtANiGUIpZps4">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={15}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-300 text-black py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center md:text-left">
          {/* LEFT SIDE */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Ranaya Tea Factory</h4>
            <p>Export Processing Center,</p>
            <p>24 Parakrama Road, Mathumagala,</p>
            <p>Ragama, Sri Lanka.</p>
            <p className="mt-2">Phone: +94 114 789 999</p>
            <p>Email: inquiry@ranaya.com</p>
            <p>Email: sales.ceylon@ranaya.com</p>
          </div>
          {/* MIDDLE */}
          <div className="flex flex-col items-center justify-center">
            <img src={assets} alt="Factory Logo" className="w-12 h-12 mb-2" />
            <h4 className="text-xl font-bold">RANAYA</h4>
            <p className="text-sm tracking-widest">CLIMATE POSITIVE AND BEYOND</p>
          </div>
          {/* RIGHT SIDE */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Ranaya Tea Factory</h4>
            <p>Head Office,</p>
            <p>153 Nawala Road, Narahenpita,</p>
            <p>Colombo 05, Sri Lanka.</p>
            <p className="mt-2">Phone: +94 11 2510000</p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm border-t border-white/30 pt-4">
          © {new Date().getFullYear()} Ranaya Tea. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default ContactUs;
