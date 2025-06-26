import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Labs from "./pages/Labs";
import Settings from "./pages/Settings";
import AttackerBox from "./pages/AttackerBox";
import About from "./pages/About";
import Leaderboard from "./pages/Leaderboard";
import Guide from "./pages/Guide";
import Achievements from "./pages/Achievements";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";
import Admin from "./pages/admin/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />
            <div className="flex-1 pb-12">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/labs" element={<Labs />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/attackerbox" element={<AttackerBox />} />
                <Route path="/about" element={<About />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/events" element={<Events />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/eventedit" element={<div>Event Edit Page</div>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
