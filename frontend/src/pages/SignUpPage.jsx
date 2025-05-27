import { useState } from "react";
import Navbar from "../components/NavbarSignUp";
import Footer from "../components/FooterSignUp";
import InputField from "../components/InputField";
import LeftPanel from "../components/LeftPanel";

export default function SignUpPage() {
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullName = e.target["full-name"].value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"].value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log({ fullName, email, password });
    alert("Account created! Redirecting...");
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-stretch h-full">
          {/* Left Panel - only shows on large screens */}
          <LeftPanel />

          {/* Right Panel - signup form */}
          <div className="bg-white rounded-xl auth-card p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600 mb-8">Start swapping skills in just a few minutes</p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6 space-y-4">
                <InputField id="full-name" label="Full Name" required />
                <InputField id="email" label="Email Address" type="email" required /> 
                <InputField id="password" label="Password" type="password" required />
                <InputField id="confirm-password" label="Confirm Password" type="password" required />
              </div>

            

              <div className="mb-6">
                <label className="inline-flex items-start">
                  <input type="checkbox" required className="mt-1 rounded border-gray-300 text-indigo-600" />
                  <span className="ml-2 text-sm text-gray-700">
                    I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full gradient-bg text-white py-3 rounded-lg hover:opacity-90 font-medium text-lg"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
