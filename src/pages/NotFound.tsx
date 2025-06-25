
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white relative overflow-hidden">
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse animate-float"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-teal-400 rounded-full animate-pulse animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <Card className="glass-card p-12 text-center max-w-md w-full animate-fade-in-up">
          <div className="mb-8">
            <AlertTriangle className="mx-auto text-cyan-400 mb-4" size={64} />
            <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
            <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
            <p className="text-gray-400 font-mono">
              The page you're looking for doesn't exist in our system.
            </p>
          </div>
          
          <Link to="/">
            <Button className="glass-button bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-bold px-8 py-3">
              <Home className="mr-2" size={20} />
              Return Home
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
