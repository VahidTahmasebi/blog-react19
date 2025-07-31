import Link from "next/link";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-extrabold">404</h1>
      <h2 className="mb-6 text-2xl font-semibold">Not Found</h2>
      <p className="max-w-md mb-8 text-muted-foreground">
        The page you are looking doesn't exist or has been moved
      </p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}

export default NotFound;
