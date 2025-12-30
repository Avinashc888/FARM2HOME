// src/HomePage.js - FULLY FIXED CART FUNCTIONALITY
import "./output.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const categories = [
  "All", "Grocery", "Vegetables", "Fruits", "Dairy", "Grains", "Organic", "Offers",
];

const products = [
  {
    id: 1, name: "Tomatoes", price: "₹40 /kg", img: "/images/Tomato.jpeg", category: "Vegetables",
  },
  {
    id: 2, name: "Potatoes", price: "₹30 /kg", img: "/images/Potato.jpg", category: "Vegetables",
  },
  {
    id: 3, name: "Mangoes", price: "₹99 /kg", img: "/images/Mango.jpeg", category: "Fruits",
  },
  {
    id: 4, name: "Milk", price: "₹55 /L", img: "/images/Milk.jpeg", category: "Dairy",
  },
  {
    id: 5, name: "Organic Rice", price: "₹120 /kg", img: "https://via.placeholder.com/300x200?text=Organic+Rice", category: "Grains",
  },
  {
    id: 6, name: "Paneer", price: "₹320 /kg", img: "https://via.placeholder.com/300x200?text=Paneer", category: "Dairy",
  },
  {
    id: 7, name: "Leafy Greens", price: "₹25 /bunch", img: "https://via.placeholder.com/300x200?text=Leafy+Greens", category: "Organic",
  },
];

const deals = [
  { name: "Onions", offer: "Up to 30% off", price: "From ₹29", img: "https://via.placeholder.com/260x160?text=Onions" },
  { name: "Potatoes", offer: "Up to 40% off", price: "From ₹25", img: "/images/Potato.jpg" },
  { name: "Mangoes", offer: "Season Special", price: "From ₹99", img: "/images/Mango.jpeg" },
  { name: "Milk", offer: "Daily essentials", price: "From ₹55", img: "/images/Milk.jpeg" },
  { name: "Wheat", offer: "Bulk offers", price: "From ₹39", img: "https://via.placeholder.com/260x160?text=Wheat" },
  { name: "Sugar", offer: "Combo packs", price: "From ₹45", img: "https://via.placeholder.com/260x160?text=Sugar" },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("farm2home_cart");
      if (saved) setCart(JSON.parse(saved));
    } catch (e) {
      console.log("Cart load failed:", e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("farm2home_cart", JSON.stringify(cart));
    } catch (e) {
      console.log("Cart save failed:", e);
    }
  }, [cart]);

  function handleCategoryClick(cat) {
    setSelectedCategory(cat);
  }

  function handleAddToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function handleViewProduct(product) {
    alert(`Product details: ${product.name} - ₹${product.price}`);
  }

  function handleViewCart() {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const cartSummary = cart.map(item => 
      `${item.name} x${item.quantity} - ${item.price}`
    ).join('\n');
    alert(`Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)} items):\n${cartSummary}`);
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-[#2874f0] text-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-[#2874f0] font-bold">F2H</span>
            <div className="leading-tight">
              <div className="font-semibold text-lg">Farm2Home</div>
              <div className="text-xs text-yellow-300">Explore • Plus</div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center bg-white rounded-sm overflow-hidden">
              <input type="text" placeholder="Search for products, brands and more" className="flex-1 px-3 py-2 text-sm text-gray-800 outline-none" />
              <button className="px-3 text-[#2874f0] font-semibold text-sm">Search</button>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm font-semibold">
            <Link to="/farmers" className="bg-white text-[#2874f0] px-4 py-1 rounded-sm hover:bg-gray-100">Farmer Portal</Link>
            <button 
              className="relative flex items-center gap-1 bg-white text-[#2874f0] px-4 py-1 rounded-sm hover:bg-gray-100"
              onClick={handleViewCart}
            >
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="bg-[#2463c5]">
          <div className="max-w-6xl mx-auto px-4 py-2 flex gap-6 text-xs md:text-sm overflow-x-auto">
            {categories.map((item) => (
              <button
                key={item}
                className={`hover:font-semibold whitespace-nowrap ${
                  selectedCategory === item ? "font-semibold underline" : ""
                }`}
                onClick={() => handleCategoryClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-100 border-b">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fresh produce from local farmers</h1>
                <p className="text-gray-600 mb-6 text-lg">Connect directly with verified farmers. No middlemen. Fair prices.</p>
                <Link to="/farmers" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
                  Become a Farmer →
                </Link>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Start</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Browse fresh produce</li>
                  <li>• Filter by category</li>
                  <li>• Add to cart & checkout</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Products - FIXED */}
        <section className="bg-white border-t">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Fresh produce from nearby farms</h2>
            <p className="text-sm text-gray-600 mb-6">
              Showing: {selectedCategory === "All" ? "All categories" : selectedCategory}
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                .filter(p => selectedCategory === "All" || p.category === selectedCategory)
                .map((p) => (
                  <div key={p.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all bg-white">
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="h-full w-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">{p.name}</h3>
                      <p className="text-xs text-gray-500 mb-3">Category: {p.category}</p>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleAddToCart(p)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                        >
                          🛒 Add to Cart
                        </button>
                        <button
                          onClick={() => handleViewProduct(p)}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Deals */}
        <section className="bg-gray-50 border-t">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Top Deals</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {deals.map((d, idx) => (
                <div key={idx} className="min-w-[220px] flex-shrink-0 border rounded-xl bg-white shadow-sm hover:shadow-lg transition-all">
                  <div className="h-28 w-full overflow-hidden rounded-t-xl">
                    <img src={d.img} alt={d.name} className="h-full w-full object-cover hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-800 line-clamp-1">{d.name}</h3>
                    <p className="text-xs text-orange-600 font-medium mb-1">{d.offer}</p>
                    <span className="text-green-700 font-bold text-sm block">{d.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold mb-3 text-white">Farm2Home</h4>
              <p className="text-gray-400 leading-relaxed">Fresh produce from local farmers. Direct delivery to your door.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Customer Care</h4>
              <ul className="space-y-1">
                <li><Link to="/help" className="hover:underline">Help</Link></li>
                <li><Link to="/track" className="hover:underline">Track Order</Link></li>
                <li><a href="#" className="hover:underline">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Farmers</h4>
              <ul className="space-y-1">
                <li><Link to="/farmers" className="hover:underline">Farmer Portal</Link></li>
                <li><a href="#" className="hover:underline">Register</a></li>
                <li><a href="#" className="hover:underline">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Contact</h4>
              <p>support@farm2home.in</p>
              <p>+91-9380458702</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-xs text-center text-gray-400">
            © {new Date().getFullYear()} Farm2Home. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}