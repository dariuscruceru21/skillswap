import React from "react";
import NavbarLogin from "../components/LoginComponents/NavbarLogin";
import LoginLeftPanel from "../components/LoginComponents/LoginLeftPannel";
import LoginForm from "../components/LoginComponents/LoginForm";
import Footer from "../components/LoginComponents/FooterLogin";


const SignInPage = () => {
  return (
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
      <NavbarLogin />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <LoginLeftPanel />
            <div>
              <div className="bg-white rounded-xl auth-card p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600 mb-8">
                  Sign in to your SkillSwap account
                </p>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignInPage;
