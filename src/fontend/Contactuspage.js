import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import '../output.css'

// ✅ Hero images (you can replace with your tea factory images)
const heroImages = [
  "https://www.sunplast.lk/images/2023/01/25/heritance-tea-factory.jpg",
  "https://media.istockphoto.com/id/1264096949/photo/lush-tea-leaves-in-the-human-hands.jpg?s=612x612&w=0&k=20&c=zCZ-Gh7hM3rJ0vdhmPVB1xgMEP3HFPUGtX_EP2dwjE8=",
  "https://media.istockphoto.com/id/177040934/photo/green-tea-plantation.jpg?s=612x612&w=0&k=20&c=csHVCZb1cDh7XoKuZvu_cbIZRHBzCRFUYB4NJxtSARU=",
];

function ContactUs() {
  const [currentHero, setCurrentHero] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto slide hero background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans text-gray-800">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full bg-green-700 text-white px-6 py-4 flex flex-wrap items-center justify-between shadow-lg z-50">
        <div className="text-2xl font-bold">Tea Factory</div>
        <ul className="hidden md:flex space-x-6 text-lg">
          <li><a href="/home" className="hover:text-orange-300">Home</a></li>
          <li><a href="/ourStory" className="hover:text-orange-300">Our Story</a></li>
          <li><a href="/ourOfferings" className="hover:text-orange-300">Our Offerings</a></li>
          <li><a href="/NewsPage" className="hover:text-orange-300">News</a></li>
          <li><a href="/ContactUspage" className="hover:text-orange-300">Contact Us</a></li>
        </ul>
        <div className="mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded-md text-gray-800"
          />
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
          <li><a href="/ourOfferings" className="hover:text-orange-300" onClick={() => setSidebarOpen(false)}>Our Offerings</a></li>
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


      {/*HERO SECTION */}
      <section
        className="relative h-[80vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${heroImages[currentHero]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div className="absolute inset-0 "></div>
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="max-w-2xl mx-auto text-lg">
            We would love to hear from you! Reach out to Ranaya Tea Factory with any inquiries, 
            feedback, or business opportunities.
          </p>
        </div>
      </section>

      {/* ✅ CONTACT FORM & DETAILS */}
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
              <a href="/ContactUspage" className="text-green-700 hover:text-green-900">Facebook</a>
              <a href="/ContactUspage" className="text-green-700 hover:text-green-900">Instagram</a>
              <a href="/ContactUspage" className="text-green-700 hover:text-green-900">LinkedIn</a>
            </div>
          </div>
        </div>
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
            <img 
              src="https://bogawantalawa.com/wp-content/uploads/2020/07/cropped-bogawantalawa-favicon.png"
              alt="Factory Logo"
              className="w-12 h-12 mb-2"
            />
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
