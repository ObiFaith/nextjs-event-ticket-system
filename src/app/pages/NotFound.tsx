import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { AlertCircle } from 'lucide-react';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="shadow-lg max-w-md w-full">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="bg-muted rounded-full p-6 mb-4">
            <AlertCircle className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-semibold mb-2">404</h1>
          <h3 className="text-xl font-semibold mb-2">Page not found</h3>
          <p className="text-muted-foreground mb-6 text-center">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
        </CardContent>
      </Card>
    </div>
  );
};
