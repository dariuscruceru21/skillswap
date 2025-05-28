import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import LandingPage from "./pages/LandingPage";
import ProfilePage from "./pages/ProfilePage";
import MySkillsPage from "./pages/MySkillsPage";
import AdminDashboard from "./pages/AdminDashboard";
import QuizPage from "./pages/QuizPage"; // We will create this next

function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#4aed88',
            },
          },
          error: {
            duration: 3000,
            theme: {
              primary: '#ff4b4b',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/skill" element={<MySkillsPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        {/* Add a route for the Quiz Page */}
        <Route path="/quiz/:quizId" element={<QuizPage />} />
      </Routes>
    </div>
  );
}

export default App;
