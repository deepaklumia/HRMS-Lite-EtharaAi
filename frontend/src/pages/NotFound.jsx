import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center animate-fade-in">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            404
          </h1>
        </div>
        
        <Card className="shadow-xl max-w-2xl mx-auto">
          <CardContent className="p-12">
            <div className="text-6xl mb-6 animate-bounce">🔍</div>
            
            <CardTitle className="text-3xl mb-4">
              Page Not Found
            </CardTitle>
            
            <CardDescription className="text-lg mb-8 max-w-md mx-auto">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </CardDescription>
            
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="shadow-lg">
                <Link to="/">
                  <Home size={20} />
                  Go to Dashboard
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.history.back()}
              >
                <ArrowLeft size={20} />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-gray-500 text-sm">
          Error Code: 404 | Page Not Found
        </div>
      </div>
    </div>
  );
}
