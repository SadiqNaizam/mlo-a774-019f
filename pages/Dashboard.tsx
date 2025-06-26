import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function Dashboard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Welcome to Your Application</CardTitle>
          <CardDescription>
            This is a sample page to demonstrate that the application is running correctly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            The application structure has been successfully initialized. You can now start building your features.
          </p>
          <Button onClick={() => toast("Hello world!", { description: "This is a toast from Sonner." })}>
            Show Toast Notification
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}