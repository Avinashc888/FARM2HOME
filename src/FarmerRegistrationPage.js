// src/FarmerRegistrationPage.js
import { useEffect, useState } from "react";
import "./output.css";

const STORAGE_KEY = "farm2home_farmers";

export default function FarmerRegistrationPage() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    location: "",
    crops: "",
  });

  const [errors, setErrors] = useState({});
  const [farmers, setFarmers] = useState([]);

  // Load saved farmers from localStorage once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setFarmers(parsed);
      }
    } catch (e) {
      console.error("Failed to read farmers from localStorage", e);
    }
  }, []);

  // Save farmers to localStorage whenever list changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(farmers));
    } catch (e) {
      console.error("Failed to save farmers to localStorage", e);
    }
  }, [farmers]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      newErrors.mobile = "Enter a valid 10‑digit Indian mobile";
    }

    if (!form.location.trim()) newErrors.location = "Location is required";

    if (!form.crops.trim()) newErrors.crops = "Main crops are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const newFarmer = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toISOString(),
    };

    setFarmers((prev) => [newFarmer, ...prev]);
    setForm({ name: "", mobile: "", location: "", crops: "" });
    alert("Farmer registered successfully!");
  }

  function handleDelete(id) {
    if (!window.confirm("Remove this farmer from the list?")) return;
    setFarmers((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-green-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Farm2Home Farmer Portal</h1>
          <span className="text-xs md:text-sm opacity-90">
            Farmer Registration · Fully Working
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
          {/* Form card */}
          <section className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Register a new farmer
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                  placeholder="Farmer full name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile
                </label>
                <input
                  name="mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.mobile
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                  placeholder="10‑digit mobile number"
                />
                {errors.mobile && (
                  <p className="mt-1 text-xs text-red-600">{errors.mobile}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Village / Town / City
                </label>
                <input
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.location
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                  placeholder="e.g. Hosur, Tamil Nadu"
                />
                {errors.location && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Crops */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Main crops
                </label>
                <input
                  name="crops"
                  type="text"
                  value={form.crops}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                    errors.crops
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-green-500"
                  }`}
                  placeholder="e.g. Tomatoes, Brinjal, Paddy"
                />
                {errors.crops && (
                  <p className="mt-1 text-xs text-red-600">{errors.crops}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2.5 rounded-lg shadow-sm"
              >
                Save farmer
              </button>
            </form>
          </section>

          {/* List card */}
          <section className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Registered farmers ({farmers.length})
            </h2>

            {farmers.length === 0 ? (
              <p className="text-sm text-gray-500">
                No farmers registered yet. Submit the form to add the first
                record.
              </p>
            ) : (
              <ul className="space-y-3 max-h-[420px] overflow-y-auto">
                {farmers.map((f) => (
                  <li
                    key={f.id}
                    className="border rounded-lg px-3 py-2 text-sm flex justify-between items-start gap-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{f.name}</p>
                      <p className="text-gray-600 text-xs">
                        {f.location} · {f.mobile}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        Crops: {f.crops}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-xs">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between">
          <span>Farm2Home · Farmer Registration Demo</span>
          <span>Data stored locally in this browser (localStorage).</span>
        </div>
      </footer>
    </div>
  );
}
