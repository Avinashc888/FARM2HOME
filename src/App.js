// src/App.js - COMPLETE SINGLE FILE SOLUTION
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./output.css";

const STORAGE_KEY = "farm2home_farmers";

function HomePage() {
  const [selectedCategory] = useState("All");
  const products = [
    { name: "Tomatoes", price: "₹40/kg", category: "Vegetables", img: "/images/Tomato.jpeg" },
    { name: "Potatoes", price: "₹30/kg", category: "Vegetables", img: "/images/Potato.jpg" },
    { name: "Mangoes", price: "₹99/kg", category: "Fruits", img: "/images/Mango.jpeg" },
    { name: "Milk", price: "₹55/L", category: "Dairy", img: "/images/Milk.jpeg" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">F2H</div>
            <div>
              <div className="font-bold text-xl">Farm2Home</div>
              <div className="text-xs text-yellow-300">Fresh Direct</div>
            </div>
          </div>
          <Link to="/farmers" className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100">
            👨‍🌾 Farmer Portal
          </Link>
        </div>
      </header>

      <section className="bg-gradient-to-r from-green-400 to-emerald-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Fresh from Farm</h1>
          <p className="text-xl mb-8">Organic vegetables delivered daily</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Fresh Produce</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <div key={i} className="bg-gray-50 border rounded-xl p-6 hover:shadow-xl transition-all text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center bg-green-200">
                  <img 
                    src={p.img} 
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                <p className="text-green-600 text-2xl font-bold mb-4">{p.price}</p>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold">Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-8 text-center">
        <p>© 2025 Farm2Home - Fresh from farm to home</p>
      </footer>
    </div>
  );
}

function FarmerRegistrationPage() {
  const [form, setForm] = useState({ name: "", mobile: "", location: "", crops: "" });
  const [errors, setErrors] = useState({});
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setFarmers(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(farmers));
  }, [farmers]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name required";
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile)) newErrors.mobile = "Valid 10-digit mobile";
    if (!form.location.trim()) newErrors.location = "Location required";
    if (!form.crops.trim()) newErrors.crops = "Crops required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const newFarmer = { id: Date.now(), ...form };
    setFarmers([newFarmer, ...farmers]);
    setForm({ name: "", mobile: "", location: "", crops: "" });
    alert("Farmer registered!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-bold text-xl">Farm2Home</Link>
          <Link to="/" className="text-sm hover:underline">← Home</Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Register Farmer</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" className={`w-full p-3 border rounded-lg ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
            </div>
            <div>
              <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className={`w-full p-3 border rounded-lg ${errors.location ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
            <div>
              <input name="crops" value={form.crops} onChange={handleChange} placeholder="Main Crops" className={`w-full p-3 border rounded-lg ${errors.crops ? 'border-red-500' : 'border-gray-300'}`} />
              {errors.crops && <p className="text-red-500 text-sm mt-1">{errors.crops}</p>}
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg">Save Farmer</button>
          </form>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Farmers ({farmers.length})</h2>
          {farmers.length === 0 ? (
            <p className="text-gray-500">No farmers registered yet</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {farmers.map(f => (
                <div key={f.id} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-bold">{f.name}</h4>
                  <p className="text-sm text-gray-600">{f.location} • {f.mobile}</p>
                  <p className="text-sm">{f.crops}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/farmers" element={<FarmerRegistrationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
